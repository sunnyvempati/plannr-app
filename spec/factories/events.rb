FactoryGirl.define do
  factory 'event' do
    name Faker::Company.catch_phrase
    client_name Faker::Name.name
    start_date Date.today + 10.days
    end_date { start_date + 1.days }
    budget Faker::Number.number(5)
    location Faker::Address.city
  end
end
