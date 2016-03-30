class TextChange < ActiveRecord::Base
  validates :author_id, presence: true

  belongs_to :changeable, polymorphic: true
end
