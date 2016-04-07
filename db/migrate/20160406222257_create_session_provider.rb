class CreateSessionProvider < ActiveRecord::Migration
  def change
    create_table :session_providers, id: :uuid do |t|
			t.uuid :user, null: false, index: true
			t.string :type, null: false
			t.string :identifier, null: false
    end
		add_index :session_providers, [:type, :identifier]
  end
end
