# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require_relative 'program_seeds'
require_relative 'seed_texts'

User.destroy_all
Project.destroy_all
SourceFile.destroy_all
TextChange.destroy_all
Reply.destroy_all
Explanation.destroy_all
FrontPageItem.destroy_all

tester = User.create!(
  username: 'test',
  password: 'password',
  email: 'test@test.com',
	score: 1000000
)
tester.projects.create(title: 'test project')

demo = User.create!(
	username: 'demo',
	password: 'password',
	email: 'demo@example.com'
)

ProgramSeeds.generate

10.times do |_|
  FactoryGirl.create(:user)
end

10.times do |_|
  FactoryGirl.create(:user_with_projects)
end

10.times do |_|
  FactoryGirl.create(:user_with_projects_with_files)
end

10.times do |_|
  FactoryGirl.create(:user_with_changes)
end

10.times do |_|
	FactoryGirl.create(:user_with_all)
end


patrick = User.create!(
	username: '30 Minutes Patrick',
	password: 'password'
)
project = patrick.projects.create!(
	title: 'Ruby Authentication'
)
project.text_changes.create!(
	author_id: patrick.id,
	body: 'Quick and easy authentication'
)
file = project.source_files.create!(
	author_id: patrick.id,
	name: 'User.rb'
)
file.text_changes.create!(
	author_id: patrick.id,
	body: SeedTexts::USER_RB
)
file = project.source_files.create!(
	author_id: patrick.id,
	name: 'ApplicationController.rb'
)
file.text_changes.create!(
	author_id: patrick.id,
	body: SeedTexts::APPLICATION_CONTROLLER_RB
)
