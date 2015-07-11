FactoryGirl.define do
  factory :user, aliases: [:commenter] do
    email { Faker::Internet.email }
    password "plannr12"
    password_confirmation "plannr12"
    company

    after(:create) do |user|
      create(:profile, user: user)
    end

  end

end
