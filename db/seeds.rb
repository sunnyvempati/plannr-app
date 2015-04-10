require 'faker'

c = Company.create(name: Faker::Company.name)

20.times do
	u = User.create(email: Faker::Internet.email, password: "plannr12", password_confirmation: "plannr12", company: c)
	Profile.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, user: u)
end

