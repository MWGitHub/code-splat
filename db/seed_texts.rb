class SeedTexts
	USER_RB = <<-CODE
class User < ActiveRecord::Base

	include PgSearch
	multisearchable against: :username

  attr_reader :password

  validates :username, :password_digest, :score, presence: true
  validates :username, length: { minimum: 1 }
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, :email, uniqueness: true, allow_blank: true, allow_nil: true

  has_many :projects, foreign_key: :author_id
  has_many :source_files, foreign_key: :author_id
  has_many(
    :contributions,
    class_name: 'TextChange',
    foreign_key: :author_id
  )

	has_many :session_providers

  def is_password?(unencrypted)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted)
  end

  def password=(unencrypted)
    if unencrypted.present?
      @password = unencrypted
      self.password_digest = BCrypt::Password.create(unencrypted)
    end
  end

	def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    user = SessionProvider.find_user_by_provider(provider, uid)
    return user if user

    user = User.create!(
			password_digest: BCrypt::Password.create(SecureRandom::urlsafe_base64(16)),
      username: generate_unique_username(auth_hash[:extra][:raw_info][:name].underscore.gsub(' ', '_'))
    )
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user.try(:is_password?, password) ? user : nil
  end

  def self.find_by_email(email, password)
    user = User.find_by(email: email)
    user.try(:is_password?, password) ? user : nil
	end


	private
	def self.generate_unique_username(front)
		username = ''
		loop do
			username = "\#{front}_\#{rand(999999)}"
			user = User.find_by(username: username)
			break unless user
		end
		username
	end
end
	CODE


	APPLICATION_CONTROLLER_RB = <<-CODE
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

	protected
	def require_permissions!(threshold)
		allowed = current_user.score >= threshold
		unless allowed
			respond_to do |format|
	      format.html do
	        flash[:error] = 'Access denied'
	        redirect_to root_url
	      end
	      format.json do
	        render json: { error: "\#{threshold} required to perform the action" }, status: :unauthorized
	      end
	    end
		end
	end

  private
  def current_user
    @current_user ||= SessionProvider.find_user_by_token(session[:token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in!(user, provider, identifier)
    @current_user = user
		provider = SessionProvider.create_session_token(
			user,
			provider,
			identifier
		)
    session[:token] = provider[:token]
  end

  def sign_out!
		SessionProvider.remove_token(session[:token])
    session[:token] = nil
  end

  def require_signed_in!
    return if signed_in?

    respond_to do |format|
      format.html do
        flash[:error] = 'Access denied'
        redirect_to root_url
      end
      format.json do
        render json: { error: 'Access denied' }, status: :unauthorized
      end
    end
  end
end
	CODE

  DS_BINARY_TREE = <<-CODE
;;; Binary Search Tree (BST)
;
; This code implements a simple BST of integers.
;
; Our binary tree will be represented as follows:
; either an empty list or a list with three elements:
; the value, the left subtree, and the right subtree.
; So, the tree
;                      5
;                    /   \
;                  4       6
; would be (5 (4 () ()) (6 () ())).
;
; Note that only the six routines below (two constructors,
; one predicate, and three field-selectors) depend on the
; tree being implemented as described above.  All the rest
; of the routines are written in terms of these six, so if
; we chose to change the representation, we could do it by
; changing only these six routines.
;
; Remember as you read that these routines are written in
; the functional style---they RETURN something (in many
; cases a binary search tree) rather than changing any
; existing values in place.

(define bst-create-empty   ; constructor---create an empty BST
  (lambda ()
    '()))

(define bst-create         ; constructor
  (lambda (value left-subtree right-subtree)
    (list value left-subtree right-subtree)))

(define bst-isempty? (lambda (BST) (null? BST)))

; Field selector routines.  These make the rest of the code
; a lot clearer since we can say bst-left-subtree instead of
; (first (rest BST)) )
(define bst-value (lambda (BST) (first BST)))
(define bst-left-subtree (lambda (BST) (first (rest BST))))
(define bst-right-subtree (lambda (BST) (first (rest (rest BST)))))

(define bst-add    ; return tree with value added
  (lambda (BST value)
    (cond
      ((bst-isempty? BST)           ; if empty, create a new node
       (bst-create value (bst-create-empty) (bst-create-empty)))
      ((< value (bst-value BST))    ; add node to left subtree
       (bst-create (bst-value BST)  ; (functionally, by building new tree)
                   (bst-add (bst-left-subtree BST) value)
                   (bst-right-subtree BST)))
      ((> value (bst-value BST))    ; add node to right subtree
       (bst-create (bst-value BST)
                   (bst-left-subtree BST)
                   (bst-add (bst-right-subtree BST) value)))
      (else BST))))                 ; it's already there; don't do anything

(define bst-delete   ; return tree with value deleted
  (lambda (BST value)
    (cond
      ((bst-isempty? BST) (bst-create-empty))
      ((= value (bst-value BST)) (bst-delete-root BST))
      ((< value (bst-value BST))
       (bst-create (bst-value BST)
                   (bst-delete (bst-left-subtree BST) value)
                   (bst-right-subtree BST)))
      (else ; (> value (bst-value BST)) -- commented out for efficiency
        (bst-create (bst-value BST)
                    (bst-left-subtree BST)
                    (bst-delete (bst-right-subtree BST) value))))))

(define bst-delete-root   ; return tree with root deleted
  (lambda (BST)
    (cond
      ; If the root has no children, result is empty tree
      ((bst-isleaf? BST) (bst-create-empty))
      ; If the root has one child (right or left),
      ; result is that child (and descendants)
      ((bst-isempty? (bst-left-subtree BST)) (bst-right-subtree BST))
      ((bst-isempty? (bst-right-subtree BST)) (bst-left-subtree BST))
      ; If the root has two children,
      ; replace value with leftmost child of right subtree
      (else (let* ((replacement-value
                     (bst-value (bst-leftmost-child (bst-right-subtree BST))))
                   (new-right-subtree
                     (bst-delete (bst-right-subtree BST) replacement-value)))
              (bst-create replacement-value
                          (bst-left-subtree BST)
                          new-right-subtree))))))

(define bst-isleaf?
  (lambda (BST)
    (and (bst-isempty? (bst-left-subtree BST))
         (bst-isempty? (bst-right-subtree BST)))))

(define bst-leftmost-child
  (lambda (BST)
    (cond
      ((bst-isempty? BST) (bst-create-empty))
      ((bst-isempty? (bst-left-subtree BST)) BST)
      (else (bst-leftmost-child (bst-left-subtree BST))))))

(define bst-member?   ; find a value in the tree
  (lambda (BST value)
    (cond
      ((bst-isempty? BST) #f)
      ((= value (bst-value BST)) #t)
      ((< value (bst-value BST)) (bst-member? (bst-left-subtree BST) value))
      (else (bst-member? (bst-right-subtree BST) value))))))

(define bst-traverse-inorder   ; return an inorder list of values
  (lambda (BST)                ; We return a standard list so we can cross
    (cond                      ; the abstraction barrier safely.  The calling
      ((bst-isempty? BST) '()) ; program can then process the list as it likes.
      (else (append
              (bst-traverse-inorder (bst-left-subtree BST))
              (list (bst-value BST)) ; each argument to append must be a list
              (bst-traverse-inorder (bst-right-subtree BST)))))))

(define bst-size  ; number of items in the tree
  (lambda (BST)
    (cond
      ((bst-isempty? BST) 0)
      (else (+ 1
               (bst-size (bst-left-subtree BST))
               (bst-size (bst-right-subtree BST)))))))

(define bst-height
  (lambda (BST)
    (cond
      ((bst-isempty? BST) -1) ; by definition empty tree's height is -1
      (else (+ 1 (max (bst-height (bst-left-subtree BST))
                      (bst-height (bst-right-subtree BST))))))))

(define bst-balanced?         ; check for perfect balance
  (lambda (BST)
    (cond
      ((bst-isempty? BST) #t)
      (else (and (= (bst-height (bst-left-subtree BST))
                           (bst-balanced? (bst-left-subtree BST))
                 (bst-balanced? (bst-right-subtree BST)))))))

(define bst-shortest-path-to-leaf
  (lambda (BST)
    (cond
      ((bst-isempty? BST) -1)
      (else (+ 1 (min (bst-shortest-path-to-leaf (bst-left-subtree BST))
                      (bst-shortest-path-to-leaf (bst-right-subtree BST))))))))

(define bst-relatively-balanced?
  (lambda (BST)
    (>= 1 (abs (- (bst-height BST) (bst-shortest-path-to-leaf BST))))))

; Notes
;
; The names of all the binary-search-tree functions above
; start with "bst-".  This is just a matter of convention;
; it's not required.  In fact, it's possible to build
; object-oriented code in Scheme, where the operations
; would be associated with each object so we wouldn't need
; either the "bst-" prefix or the BST parameter.
  CODE

  DS_LINKED_LIST = <<-CODE
use List::*;

enum List {
    // Cons: Tuple struct that wraps an element and a pointer to the next node
    Cons(u32, Box<List>),
    // Nil: A node that signifies the end of the linked list
    Nil,
}

// Methods can be attached to an enum
impl List {
    // Create an empty list
    fn new() -> List {
        // `Nil` has type `List`
        Nil
    }

    // Consume a list, and return the same list with a new element at its front
    fn prepend(self, elem: u32) -> List {
        // `Cons` also has type List
        Cons(elem, Box::new(self))
    }

    // Return the length of the list
    fn len(&self) -> u32 {
        // `self` has to be matched, because the behavior of this method
        // depends on the variant of `self`
        // `self` has type `&List`, and `*self` has type `List`, matching on a
        // concrete type `T` is preferred over a match on a reference `&T`
        match *self {
            // Can't take ownership of the tail, because `self` is borrowed;
            // instead take a reference to the tail
            Cons(_, ref tail) => 1 + tail.len(),
            // Base Case: An empty list has zero length
            Nil => 0
        }
    }

    // Return representation of the list as a (heap allocated) string
    fn stringify(&self) -> String {
        match *self {
            Cons(head, ref tail) => {
                // `format!` is similar to `print!`, but returns a heap
                // allocated string instead of printing to the console
                format!("{}, {}", head, tail.stringify())
            },
            Nil => {
                format!("Nil")
            },
        }
    }
}
  CODE

  CS_HOME = <<-CODE
import React from 'react';
import { ProjectListFront, ProjectListHot } from './project-list';
import ProjectStore from '../stores/project';
import WebUtil from '../util/web-util';
import { Link } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: ProjectStore.all(),
			frontProjects: null
    };
  }

  componentDidMount() {
    this.projectToken = ProjectStore.addListener(() => {
      this.setState({
				projects: ProjectStore.all(),
				frontProjects: ProjectStore.allFront()
			});
    });
    WebUtil.fetchProjects({
			type: 'hot'
		}, () => {
			WebUtil.fetchFrontPageItems();
		});
  }

  componentWillUnmount() {
    this.projectToken.remove();
  }

  render() {
    return (
      <div className="home group">
        <div className="left">
          <p>Latest on Code Splat</p>
					<ProjectListFront projects={this.state.frontProjects} />
        </div>
        <div className="right">
          <p>About Code Splat</p>
          <div className="home-about group">
            <div className="home-about-icon">
              <img src={window.codeSplat.homeIconPath} />
            </div>
            <div className="home-about-description">
              <p>Code Splat is dedicated to crowd-sourced annotation of source code, from <Link to="/projects/simple-sorting/files/merge_sort-rb">Merge Sort</Link> to <a href="/projects/simple-sorting/files/bubble_sort-rb">Bubble Sort</a>.</p>
              <p>Find out all the latest on <a href="#">Twitter</a> and <a href="#">Facebook</a></p>
            </div>
          </div>
          <p>Hot on Code Splat</p>
          <ProjectListHot projects={this.state.projects} />
					<p className="home-aside">
						<Link to='/projects'>
							See more on Code Splat &raquo;
						</Link>
					</p>
        </div>
      </div>
    );
  }
}

export default Home;

  CODE

  CS_PROJECT = <<-CODE
class Api::ProjectsController < ApplicationController
  before_filter :require_signed_in!, only: [
    :create, :update, :destroy
  ]
	before_filter only: [:create] do
		require_permissions!(Project::THRESHOLDS[:create])
	end
	before_filter only: [:update] do
		require_permissions!(Project::THRESHOLDS[:update]) unless is_owner
	end
	before_filter only: [:destroy] do
		require_permissions!(Project::THRESHOLDS[:destroy]) unless is_owner
	end

  def index
		if params[:type] == 'hot'
			@projects = Project.includes(:text_changes)
				.order(created_at: :desc)
				.limit(20)
		else
	    @projects = Project.includes(
	      :text_changes, source_files: :text_changes
	    ).all.order(created_at: :desc)
		end
  end

  def show
    @project = Project.includes(
      :text_changes, source_files: :text_changes
    ).friendly.find(params[:slug])
  end

  def create
    @project = current_user.projects.create!(
			title: project_params[:title],
			language: project_params[:language]
		)
    if @project && project_params[:description]
      @project.text_changes.create!(
        body: project_params[:description],
        author_id: current_user[:id]
      )
    end
    render :show
  end

  def update
    @project = Project.find(params[:id])
    @project.slug = nil
    @project.update!(
			title: project_params[:title],
			language: project_params[:language]
		)
    if @project && project_params[:description]
      @project.text_changes.create!(
        body: project_params[:description],
        author_id: current_user[:id]
      )
    end
    render :show
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    render :show
  end

  private
  def project_params
    params.require(:project).permit(:title, :description, :language)
  end

	def is_owner
		!!Project.find_by(id: params[:id], author_id: current_user.id)
	end
end

  CODE

  CSS_MODAL = <<-CODE
.modal {
  display: none;
}

.modal.is-active {
  display: block;
}

.modal-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.7);
}

.modal-content {
  position: absolute;
  z-index: 1000;

  top: 50%;
  left: 50%;

  width: 400px;
  padding: 50px;

  margin-left: -250px;
  transform: translateY(-50%);

  background: white;
  border-radius: 5px;
}

.modal-close {
  position: absolute;
  top: 0;
  right: 15px;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  color: gray;
}

.modal-close:hover {
  color: black;
}
  CODE

  CSS_TOOLTIP = <<-CODE
.thumb {
  display: block;
  position: relative;
  margin: auto;
  width: 50px;
  background: red;
  border: 5px solid black;
}

.thumb:before {
  content: attr(title);
  display: none;
  position: absolute;
  bottom: 75px;
  left: 50%;

  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);

  padding: 10px 20px;
  background: #000;
  color: white;
  white-space: nowrap;
}

.thumb:after {
  content: "";
  display: none;
  position: absolute;
  bottom: 65px;

  left: 50%;
  margin-left: -10px;

  width: 0;
  height: 0;
  border-top: 10px solid #000;
  border-bottom: 0 solid #000;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  background: transparent;
}

.thumb:hover:before,
.thumb:hover:after {
  display: block;
}
  CODE
end
