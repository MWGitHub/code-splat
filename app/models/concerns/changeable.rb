module Changeable
  extend ActiveSupport::Concern

  included do
    def body
      result = ''
      recent = self.text_changes.order(created_at: :desc).first
      if recent && recent[:body]
        result = recent[:body]
      end
      result
    end

		def contributor_count
			self.text_changes.all.distinct.count(:author_id)
		end
  end
end
