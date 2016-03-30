class Api::TextChangesController < ApplicationController
  def index_project
    @text_changes = TextChange.where(
      changeable_type: 'Project',
      changeable_id: params[:project_id]
    )
    render :index
  end

  def index_source_file
    @text_changes = TextChange.where(
      changeable_type: 'SourceFile',
      changeable_id: params[:source_file_id]
    )
    render :index
  end

  def show
    @text_change = TextChange.find(params[:id])
  end
end
