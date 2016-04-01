FactoryGirl.define do
  factory :reply do
    body { Faker::Hipster.sentence }
  end
end
