class Api::FrontPageItemsController < ApplicationController
	def index
    limit = params[:limit] || 5
    limit = 5 if limit > 5
		@front_page_items = FrontPageItem.includes(:project).all.order(created_at: :desc).limit(limit)
	end
end
