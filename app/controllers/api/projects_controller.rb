class Api::ProjectsController < ApplicationController
  before_filter :require_signed_in!, only: [:create, :update, :destroy]

  def index
    @projects = @current_user.projects
  end

  def show
    @project = Project.find(params[:id])
  end

  def create
    @project = @current_user.projects.create!(project_params)
    if @project && project_params[:description]
      @project.text_changes.create!(project_params[:description])
    end
    render :show
  end

  def update
    @project = Project.find(params[:id])
    @project.update!(project_params)
    if @project && project_params[:description]
      @project.text_changes.create!(project_params[:description])
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
