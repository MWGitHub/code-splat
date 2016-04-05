class AddUserScore < ActiveRecord::Migration
  def change
		add_column :users, :score, :integer, null: false, default: 0
  end
end
