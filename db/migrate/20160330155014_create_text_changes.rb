class CreateTextChanges < ActiveRecord::Migration
  def change
    create_table :text_changes, id: :uuid do |t|
      t.text :body
      t.uuid :author_id, null: false
      t.references :changeable, type: :uuid, null: false, polymorphic: true, index: true

      t.timestamps null: false
    end
    add_index :text_changes, :author_id
  end
end
