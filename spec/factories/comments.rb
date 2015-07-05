FactoryGirl.define do
  factory :comment do
    body Faker::Lorem.sentence
    locked false
    commenter
  end
end
