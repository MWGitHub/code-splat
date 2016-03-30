class Project < ActiveRecord::Base
  validates :title, :author_id, presence: true
  validates :title, uniqueness: true

  belongs_to :author, class_name: "User", foreign_key: "author_id"
  has_many :source_files

  has_many :text_changes, as: :changeable

  def description
    self.text_changes.last[:body]
  end
end
