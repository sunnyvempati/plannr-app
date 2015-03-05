FactoryGirl.define do
  factory :user do
    email Faker::Internet.email
    password "plannr12"
    password_confirmation "plannr12"
  end

  factory :profile do
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
    planner false
    user
  end
end
