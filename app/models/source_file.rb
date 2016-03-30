class SourceFile < ActiveRecord::Base
  validates :name, :author_id, :project_id, presence: true
  validates :name, uniqueness: { scope: :project_id }

  belongs_to :project
  belongs_to :author, class_name: "User", foreign_key: :author_id

  has_many :text_changes, as: :changeable

  def body
    self.text_changes.last[:body]
  end
end
