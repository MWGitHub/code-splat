class CreateReplies < ActiveRecord::Migration
  def change
    create_table :replies, id: :uuid do |t|
			t.text :body, null: false
			t.uuid :author_id, null: false
			t.references :repliable, type: :uuid, null: false, polymorphic: true, index: true

      t.timestamps null: false
    end
		add_index :replies, :author_id
  end
end
