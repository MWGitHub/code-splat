# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.destroy_all
Project.destroy_all
SourceFile.destroy_all
TextChange.destroy_all
Reply.destroy_all
Explanation.destroy_all

tester = User.create!(
  username: 'test',
  password: 'password',
  email: 'test@test.com'
)
tester.projects.create(title: 'test project')

5.times do |_|
  FactoryGirl.create(:user)
end

5.times do |_|
  FactoryGirl.create(:user_with_projects)
end

5.times do |_|
  FactoryGirl.create(:user_with_projects_with_files)
end

5.times do |_|
  FactoryGirl.create(:user_with_changes)
end

5.times do |_|
	FactoryGirl.create(:user_with_all)
end
