class Reply < ActiveRecord::Base
	THRESHOLDS = {
		create: 0,
		update: 10000,
		destroy: 10000
	}

	validates :body, :author_id, presence: true

	belongs_to :repliable, polymorphic: true
	belongs_to :author, class_name: 'User', foreign_key: :author_id
end
