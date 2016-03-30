class TextChange < ActiveRecord::Base
  validates :author_id, presence: true

  belongs_to :changeable, polymorphic: true
  belongs_to :author, class_name: 'User', foreign_key: :author_id
end
