class Project < ActiveRecord::Base
  include Changeable

  validates :title, :author_id, presence: true
  validates :title, uniqueness: true

  belongs_to :author, class_name: "User", foreign_key: "author_id"
  has_many :source_files, dependent: :destroy

  has_many :text_changes, as: :changeable, dependent: :destroy
end
