FactoryGirl.define do
  factory :task do
    name Faker::Hacker.verb + " " + Faker::Hacker.noun
    description Faker::Lorem.sentence
    event
  end
end
