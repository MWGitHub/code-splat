class CreateTextChanges < ActiveRecord::Migration
  def change
    create_table :text_changes do |t|
      t.text :body
      t.integer :author_id, null: false
      t.references :changeable, null: false, polymorphic: true, index: true

      t.timestamps null: false
    end
    add_index :text_changes, :author_id
  end
end
