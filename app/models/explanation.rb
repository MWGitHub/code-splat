class Explanation < ActiveRecord::Base
  THRESHOLDS = {
		create: 0,
		update: 100,
		destroy: 600
	}

	include Changeable

	before_validation :set_fragment_end

	validates(
		:source_file_id,
		:fragment,
		:fragment_start,
		:fragment_end,
		presence: true
	)

	validate :start_before_end
	validate :does_not_overlap_fragment


	belongs_to :source_file

	has_many :text_changes, as: :changeable, dependent: :destroy
	has_many :replies, as: :repliable, dependent: :destroy



	private
	def overlapping_fragments
		set_fragment_end
		Explanation
			.where.not(id: self.id)
			.where('source_file_id = ?', self.source_file_id)
			.where(<<-SQL, start_index: fragment_start, end_index: fragment_end)
				NOT((fragment_start > :end_index) OR (fragment_end < :start_index))
			SQL
	end

	def set_fragment_end
		self.fragment_end = fragment_start + fragment.length
	end

	def does_not_overlap_fragment
		set_fragment_end

		return true if overlapping_fragments.empty?

		errors.add(:fragment, 'Fragment should not overlap with other fragments')
		return false
	end

	def start_before_end
		set_fragment_end

		return true if fragment_start < fragment_end

		errors.add(:fragment, 'Fragment start must be before end')
		return false
	end
end
