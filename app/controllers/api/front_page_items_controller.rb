class Api::FrontPageItemsController < ApplicationController
	def index
		@front_page_items = FrontPageItem.all.order(created_at: :desc).limit(2)
	end
end
