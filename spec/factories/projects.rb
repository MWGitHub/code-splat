require_relative '../../app/models/project'

FactoryGirl.define do
  factory :project do
    title do
      "#{Faker::App.name} #{Faker::App.name}"
    end
		language { Project::CODE_LANGUAGES.sample }
  end
end
