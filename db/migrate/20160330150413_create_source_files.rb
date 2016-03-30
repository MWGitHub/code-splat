class CreateSourceFiles < ActiveRecord::Migration
  def change
    create_table :source_files do |t|
      t.string :name, null: false
      t.text :body
      t.integer :author_id, null: false
      t.integer :project_id, null: false

      t.timestamps null: false
    end
    add_index :source_files, [:name, :project_id], unique: true
    add_index :source_files, :author_id
    add_index :source_files, :project_id
  end
end
