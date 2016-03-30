FactoryGirl.define do
  factory :source_file do
    name { Faker::Hacker.noun + SecureRandom::urlsafe_base64 }
  end
end
