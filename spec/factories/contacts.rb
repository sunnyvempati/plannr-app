FactoryGirl.define do
  factory 'contact' do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    phone "815-968-2311"
    organization { Faker::Company.name }
    category ContactTypes::VENDOR
  end
end
