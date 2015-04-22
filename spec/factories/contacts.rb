FactoryGirl.define do
  factory 'contact' do
    name Faker::Name.name
    email { Faker::Internet.email }
    phone "343-323-2322"
    organization Faker::Company.name
    category ContactTypes::VENDOR
  end
end
