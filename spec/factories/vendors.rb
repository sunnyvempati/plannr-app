FactoryGirl.define do
  factory :vendor do
    name Faker::Company.name
    location Faker::Address.city
    phone "343-323-2322"
    primary_contact
  end
end
