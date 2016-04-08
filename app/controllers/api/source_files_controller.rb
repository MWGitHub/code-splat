class Api::SourceFilesController < ApplicationController
  before_filter :require_signed_in!, only: [:create, :update, :destroy]

  def show
    @source_file = SourceFile.find_by_path(
      params[:project_id],
      params[:id]
    )
  end

  def create
    project = Project.find_by(slug: params[:project_id])
    input = {
      author_id: current_user.id,
      name: source_file_params[:name],
			language: source_file_params[:language]
    }
    @source_file = project.source_files.create!(input)
    if @source_file && source_file_params[:body]
      input = {
        author_id: current_user.id,
        body: source_file_params[:body]
      }
      @source_file.text_changes.create!(input)
    end
    render :show
  end

  def update
    project = Project.find_by(slug: params[:project_id])
    @source_file = project.source_files.find_by(slug: params[:id])
    @source_file.slug = nil
    @source_file.update!(
			name: source_file_params[:name],
			language: source_file_params[:language]
		)
    if @source_file && source_file_params[:body]
      @source_file.text_changes.create!(
        body: source_file_params[:body],
        author_id: current_user.id
      )
    end
    render :show
  end

  def destroy
    project = Project.find_by(slug: params[:project_id])
    @source_file = project.source_files.find_by(slug: params[:id])
    @source_file.destroy
    render :show
  end

  private
  def source_file_params
    params.require(:source_file).permit(:name, :body, :language)
  end
end
