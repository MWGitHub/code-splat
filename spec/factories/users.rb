FactoryGirl.define do
  factory :user do
    username { Faker::Internet.user_name }
    password 'password'

    factory :user_with_projects do
      after(:create) do |user, evaluator|
        2.times do |_|
          user.projects.create(attributes_for(:project))
        end
        2.times do |_|
          project = user.projects.create(attributes_for(:project))
          project.source_files.create(attributes_for(:source_file))
        end
      end
    end

    factory :user_with_projects_with_files do
      after(:create) do |user, evaluator|
        2.times do |_|
          project = user.projects.create(attributes_for(:project))
          factory_attr = attributes_for(:source_file)
          factory_attr[:author_id] = user.id
          project.source_files.create(factory_attr)
        end
      end
    end
  end
end
