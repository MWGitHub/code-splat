FactoryGirl.define do
  factory :source_file do
    name { "#{Faker::Hacker.noun}_#{Faker::Hacker.noun}" }
  end
end
