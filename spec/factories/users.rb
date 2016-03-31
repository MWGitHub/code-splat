FactoryGirl.define do
  factory :user do
    username { Faker::Internet.user_name }
    password 'password'
    email { Faker::Internet.safe_email }

    factory :user_with_projects do
      after(:create) do |user, evaluator|
        3.times do |_|
          user.projects.create(attributes_for(:project))
        end
      end
    end

    factory :user_with_projects_with_files do
      after(:create) do |user, evaluator|
        3.times do |_|
          project = user.projects.create(attributes_for(:project))
          3.times do |_|
            factory_attr = attributes_for(:source_file)
            factory_attr[:author_id] = user.id
            project.source_files.create(factory_attr)
          end
        end
      end
    end

    factory :user_with_changes do
      after(:create) do |user, evaluator|
        3.times do |_|
          project = user.projects.create(attributes_for(:project))
          3.times do |_|
            change_attr = attributes_for(:description)
            change_attr[:author_id] = user.id
            project.text_changes.create(change_attr)
          end

          3.times do |_|
            factory_attr = attributes_for(:source_file)
            factory_attr[:author_id] = user.id
            source_file = project.source_files.create(factory_attr)

            3.times do |_|
              change_attr = attributes_for(:code)
              change_attr[:author_id] = user.id
              source_file.text_changes.create(change_attr)
            end
          end
        end
      end
    end
  end
end
