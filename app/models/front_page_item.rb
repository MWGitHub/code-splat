class FrontPageItem < ActiveRecord::Base
	validates :project_id, :description, presence: true

	belongs_to :project
end
