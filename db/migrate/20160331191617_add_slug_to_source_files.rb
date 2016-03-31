class AddSlugToSourceFiles < ActiveRecord::Migration
  def change
    add_column :source_files, :slug, :string, null: false
    add_index :source_files, [:project_id, :slug], unique: true
  end
end
