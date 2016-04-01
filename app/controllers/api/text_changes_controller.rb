class Api::TextChangesController < ApplicationController
  def index_project
    project = Project.friendly.find(params[:project_slug])
    @text_changes = project.text_changes
    render :index
  end

  def index_source_file
    source_file = SourceFile.find_by_path(
      params[:project_slug],
      params[:source_file_slug]
    )
    @text_changes = source_file.text_changes
    render :index
  end

  def show
    @text_change = TextChange.find(params[:id])
  end
end
