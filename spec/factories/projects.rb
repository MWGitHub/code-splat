FactoryGirl.define do
  factory :project do
    title do
      "#{Faker::App.name} #{Faker::App.name} #{SecureRandom::urlsafe_base64(4)}"
    end
  end
end
