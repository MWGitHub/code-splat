class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects, id: :uuid do |t|
      t.string :title, null: false
      t.uuid :author_id, null: false
      t.text :description

      t.timestamps null: false
    end
    add_index :projects, :title, unique: true
    add_index :projects, :author_id
  end
end
