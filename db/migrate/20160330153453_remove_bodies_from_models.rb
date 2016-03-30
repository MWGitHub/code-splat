class RemoveBodiesFromModels < ActiveRecord::Migration
  def change
    remove_column :projects, :description
    remove_column :source_files, :body
  end
end
