require_relative '../../app/models/project'

FactoryGirl.define do
  factory :source_file do
    name { "#{Faker::Hacker.noun}_#{Faker::Hacker.noun}" }
		language { Project::CODE_LANGUAGES.sample }
  end
end
