class SourceFile < ActiveRecord::Base
  include FriendlyId
  friendly_id :name, use: :scoped, scope: :project

  include Changeable

  validates :name, :author_id, :project_id, presence: true
  validates :name, uniqueness: { scope: :project_id }

  belongs_to :project
  belongs_to :author, class_name: "User", foreign_key: :author_id

  has_many :text_changes, as: :changeable, dependent: :destroy
end
