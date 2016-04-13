class Api::ExplanationsController < ApplicationController
	before_filter :require_signed_in!, only: [
		:create, :update, :destroy
	]
  before_filter only: [:create] do
		require_permissions!(Explanation::THRESHOLDS[:create])
	end
	before_filter only: [:update] do
		require_permissions!(Explanation::THRESHOLDS[:update])
	end
	before_filter only: [:destroy] do
		require_permissions!(Explanation::THRESHOLDS[:destroy])
	end

	def index
		source_file = SourceFile.find(params[:source_file_id])
		@explanations = source_file.explanations
	end

	def show
		@explanation = Explanation.find([:source_file_id])
	end

	def create
		source_file = SourceFile.find(params[:source_file_id])
		options = {
			fragment: explanation_params[:fragment],
			fragment_start: explanation_params[:fragment_start]
		}
		@explanation = source_file.explanations.create!(options)
		if @explanation && explanation_params[:body]
      @explanation.text_changes.create!(
        body: explanation_params[:body],
        author_id: current_user.id
      )
    end
		render :show
	end

	def update
		@explanation = Explanation.find(params[:id])
    if @explanation && update_params[:body]
      @explanation.text_changes.create!(
        body: explanation_params[:body],
        author_id: current_user.id
      )
    end
    render :show
  end

  def destroy
		@explanation = Explanation.find(params[:id])
		@explanation.destroy
		render :show
  end

	private
	def explanation_params
		params.require(:explanation).permit(:fragment, :fragment_start, :body)
	end

	def update_params
		params.require(:explanation).permit(:body)
	end
end
