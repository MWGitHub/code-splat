FactoryGirl.define do
  factory :project do
    title { Faker::App.name + Faker::App.name }
  end
end
