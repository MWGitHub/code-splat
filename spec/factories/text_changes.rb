FactoryGirl.define do
  factory :text_change do
    factory :description do
      body do
        output = ''
        2.times do |_|
          output += Faker::Hacker.say_something_smart + ' '
        end
        output
      end
    end

    factory :code do
      body do
        output = ''
        10.times do |_|
          output += Faker::Hacker.say_something_smart + "\n"
        end
        output
      end
    end
  end
end
