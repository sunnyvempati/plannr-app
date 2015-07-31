FactoryGirl.define do
  factory :task do
    name Faker::Hacker.verb + " " + Faker::Hacker.noun
    description Faker::Lorem.sentence
    event
    status 1
    deadline Date.today
  end
end
