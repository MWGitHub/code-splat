class ChangeTypeToProvider < ActiveRecord::Migration
  def change
		rename_column :session_providers, :user, :user_id
		rename_column :session_providers, :type, :provider
  end
end
