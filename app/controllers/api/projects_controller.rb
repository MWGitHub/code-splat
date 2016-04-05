class Api::ProjectsController < ApplicationController
  before_filter :require_signed_in!, only: [
    :create, :update, :destroy
  ]
	before_filter :require_permissions!, only: [:create, :update, :destroy]

  def index
		if params[:type] == 'hot'
			@projects = Project.includes(:text_changes)
				.order(created_at: :desc)
				.limit(20)
		else
	    @projects = Project.includes(
	      :text_changes, source_files: :text_changes
	    ).all
		end
  end

  def show
    @project = Project.includes(
      :text_changes, source_files: :text_changes
    ).friendly.find(params[:slug])
  end

  def create
    @project = current_user.projects.create!(title: project_params[:title])
    if @project && project_params[:description]
      @project.text_changes.create!(
        body: project_params[:description],
        author_id: current_user[:id]
      )
    end
    render :show
  end

  def update
    @project = Project.find(params[:id])
    @project.slug = nil
    @project.update!(title: project_params[:title])
    if @project && project_params[:description]
      @project.text_changes.create!(
        body: project_params[:description],
        author_id: current_user[:id]
      )
    end
    render :show
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    render :show
  end

  private
  def project_params
    params.require(:project).permit(:title, :description)
  end
end
