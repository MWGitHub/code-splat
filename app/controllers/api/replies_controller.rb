class Api::RepliesController < ApplicationController
	def index
		if params[:project_id]
			project = Project.find(params[:project_id])
			@replies = project.replies
		elsif params[:source_file_id]
			source_file = SourceFile.find(params[:source_file_id])
			@replies = source_file.replies
		elsif params[:explanation_id]
			explanation = Explanation.find(params[:explanation_id])
			@replies = explanation.replies
		end
	end

	def create
		if params[:project_id]
			project = Project.find(params[:project_id])
			@reply = project.replies.create!({
				author_id: current_user.id,
				body: replies_param[:body]
			})
		elsif params[:source_file_id]
			source_file = SourceFile.find(params[:source_file_id])
			@reply = source_file.replies.create!({
				author_id: current_user.id,
				body: replies_param[:body]
			})
		elsif params[:explanation_id]
			explanation = Explanation.find(params[:explanation_id])
			@reply = explanation.replies.create!({
				author_id: current_user.id,
				body: replies_param[:body]
			})
		end
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
		param.require(:reply).permit(:body)
	end
end
