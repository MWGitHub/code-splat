class AddLanguageToProjectAndFile < ActiveRecord::Migration
  def change
		add_column :projects, :language, :string, null: false, default: 'ruby'
		add_column :source_files, :language, :string, null: false, default: 'ruby'

		change_column :projects, :language, :string, null: false
		change_column :source_files, :language, :string, null: false
  end
end
