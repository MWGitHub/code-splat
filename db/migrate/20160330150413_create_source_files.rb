class CreateSourceFiles < ActiveRecord::Migration
  def change
    create_table :source_files, id: :uuid do |t|
      t.string :name, null: false
      t.text :body
      t.uuid :author_id, null: false
      t.uuid :project_id, null: false

      t.timestamps null: false
    end
    add_index :source_files, [:name, :project_id], unique: true
    add_index :source_files, :author_id
    add_index :source_files, :project_id
  end
end
