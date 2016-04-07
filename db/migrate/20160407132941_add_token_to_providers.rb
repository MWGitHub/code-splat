class AddTokenToProviders < ActiveRecord::Migration
  def change
		add_column :session_providers, :token, :string, null: false
		remove_index :session_providers, [:provider, :identifier]
		add_index :session_providers, :token, unique: true
  end
end
