class CreateExplanations < ActiveRecord::Migration
  def change
    create_table :explanations, id: :uuid do |t|
			t.uuid :source_file_id, null: false
			t.text :fragment, null: false
			t.integer :fragment_start, null: false

      t.timestamps null: false
    end
  end
end
