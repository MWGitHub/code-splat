class Explanation < ActiveRecord::Base
	include Changeable

	validates(
		:source_file_id,
		:fragment,
		:fragment_start,
		:fragment_end,
		presence: true
	)

	belongs_to :source_file

	has_many :text_changes, as: :changeable, dependent: :destroy
	has_many :replies, as: :repliable, dependent: :destroy

	before_save :set_fragment_end

	private
	def set_fragment_end
		self.fragment_end = fragment_start + fragment.length
	end
end
