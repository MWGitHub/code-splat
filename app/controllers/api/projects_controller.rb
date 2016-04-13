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
			@projects = Project.includes(:author, :text_changes)
				.order(created_at: :desc)
				.limit(20)
		elsif params[:type] == 'index'
      @projects = Project.includes(:author).all.order(created_at: :desc)
      render :index_list
    else
	    @projects = Project.includes(
	      :author, :text_changes
	    ).all.order(created_at: :desc)
		end
  end

  def show
    @project = Project.includes(:text_changes).friendly.find(params[:slug])
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
