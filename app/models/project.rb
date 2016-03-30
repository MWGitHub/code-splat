class Project < ActiveRecord::Base
  validates :title, :author_id, presence: true
  validates :title, uniqueness: true

  belongs_to :author, class_name: "User", foreign_key: "author_id"
  has_many :source_files, dependent: :destroy

  has_many :text_changes, as: :changeable, dependent: :destroy

  def description
    result = ''
    recent = self.text_changes.last
    if recent && recent[:body]
      result = recent[:body]
    end
    result
  end
end
