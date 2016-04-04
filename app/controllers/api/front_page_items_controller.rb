class Api::FrontPageItemsController < ApplicationController
	def index
		@front_page_items = FrontPageItem.all.limit(2)
	end
end
