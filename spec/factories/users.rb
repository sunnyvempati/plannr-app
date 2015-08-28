FactoryGirl.define do
  factory :user, aliases: [:commenter] do
    email { Faker::Internet.email }
    password 'plannr12'
    password_confirmation 'plannr12'
    company
    verified true

    trait :admin do
      admin true
    end

    after(:create) do |user|
      create(:profile, user: user)
    end
  end
end
