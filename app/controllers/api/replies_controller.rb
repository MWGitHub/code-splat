class Api::RepliesController < ApplicationController
	before_filter :require_signed_in!, only: [
    :create, :update, :destroy
  ]
	before_filter only: [:create] do
		require_permissions!(Reply::THRESHOLDS[:create])
	end
	before_filter only: [:update] do
		require_permissions!(Reply::THRESHOLDS[:update]) unless is_owner
	end
	before_filter only: [:destroy] do
		require_permissions!(Reply::THRESHOLDS[:destroy]) unless is_owner
	end

	def index
		obj = get_object
		@replies = obj.replies
	end

	def create
		obj = get_object
		@reply = obj.replies.create!({
			author_id: current_user.id,
			body: replies_param[:body]
		})
		render :show
	end

	def update
		@reply = Reply.find(params[:id])
		@reply.update!(replies_param)
    render :show
  end

  def destroy
		@reply = Reply.find(params[:id])
		@reply.destroy
		render :show
  end

	private
	def replies_param
		params.require(:reply).permit(:body)
	end

	def is_owner
		!!Reply.find_by(id: params[:id], author_id: current_user.id)
	end

	def get_object
		obj = nil
		if params[:project_id]
			obj = Project.find(params[:project_id])
		elsif params[:source_file_id]
			obj = SourceFile.find(params[:source_file_id])
		elsif params[:explanation_id]
			obj = Explanation.find(params[:explanation_id])
		end
		obj
	end
end
