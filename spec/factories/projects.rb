FactoryGirl.define do
  factory :project do
    title { Faker::App.name + Faker::App.name }
    description do
      Faker::Hacker.say_something_smart + Faker::Hacker.say_something_smart
    end
  end
end
