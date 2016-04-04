class CreateFrontPageItems < ActiveRecord::Migration
  def change
    create_table :front_page_items, id: :uuid do |t|
			t.uuid :project_id, null: false
			t.text :description, null: false

      t.timestamps null: false
    end
		add_index :front_page_items, :project_id
  end
end
