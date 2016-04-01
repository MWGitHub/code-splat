class Explanation < ActiveRecord::Base
	include Changeable

	validates :source_file_id, :fragment, :fragment_start, presence: true

	belongs_to :source_file

	has_many :text_changes, as: :changeable, dependent: :destroy
	has_many :replies, as: :repliable, dependent: :destroy
end
