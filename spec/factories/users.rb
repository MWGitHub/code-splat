FactoryGirl.define do
  factory :user do
    username { Faker::Internet.user_name }
    password 'password'

    factory :user_with_projects do
      after(:create) do |user, evaluator|
        3.times do |i|
          user.projects.create(attributes_for(:project))
        end
      end
    end
  end
end
