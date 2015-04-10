require 'faker'

c = Company.create(name: Faker::Company.name)

20.times do
	u = User.create(email: Faker::Internet.email, password: "plannr12", password_confirmation: "plannr12", company: c)
	Profile.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, user: u)
end



sam_contact = Contact.create(name: "Sam Doe", email: "sam@doe.com", company: plannr_company)
puts "Successfully created contact for Sam" if sam_contact

jill_contact = Contact.create(name: "Jill Doe", email: "jill@doe.com", company: plannr_company)
puts "Successfully created contact for Jill" if jill_contact

mike_contact = Contact.create(name: "Mike Doe", email: "mike@doe.com", company: plannr_company)
puts "Successfully created contact for Mike" if mike_contact

john_contact = Contact.create(name: "John Other", email: "john@other.com", company: other_company)
puts "Successfully created contact for John" if john_contact 



