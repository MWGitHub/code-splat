FactoryGirl.define do
  factory :project do
    title do
      "#{Faker::App.name} #{Faker::App.name}"
    end
  end
end
