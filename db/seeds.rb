require 'faker'

c = Company.create(name: Faker::Company.name)

20.times do
	User.create(email: Faker::Internet.email, password: "plannr12", password_confirmation: "plannr12", company: c)
end

