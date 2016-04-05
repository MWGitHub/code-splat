class Project < ActiveRecord::Base
	CODE_LANGUAGES = %w(ruby javascript)
	THRESHOLDS = {
		create: 0,
		update: 100,
		destroy: 600
	}

  include FriendlyId
  friendly_id :title, use: :slugged

  include Changeable

  validates :title, :author_id, :slug, :language, presence: true
  validates :title, :slug, uniqueness: true
	validates :language, inclusion: {
		in: Project::CODE_LANGUAGES
	}

  belongs_to :author, class_name: "User", foreign_key: "author_id"
  has_many :source_files, dependent: :destroy

  has_many :text_changes, as: :changeable, dependent: :destroy
	has_many :replies, as: :repliable, dependent: :destroy

	has_many :front_page_items, dependent: :destroy
end
