plannr_company = Company.create(name: "Plannr")
puts "Successfully created company for Plannr" if plannr_company

other_company = Company.create(name: "OtherCompany")
puts "Successfully created company for OtherCompany" if other_company

sunny_user = User.create(email: 'sunny@yourplannr.com', password: 'plannr12', password_confirmation: 'plannr12', company: plannr_company)
puts "Successfully created account for Sunny" if sunny_user

justin_user = User.create(email: 'justin@yourplannr.com', password: 'plannr12', password_confirmation: 'plannr12', company: plannr_company)
puts "Successfully created account for Justin" if justin_user

josh_user = User.create(email: 'josh@yourplannr.com', password: 'plannr12', password_confirmation: 'plannr12', company: plannr_company)
puts "Successfully created account for Josh" if josh_user

phil_user = User.create(email: 'phil@othercompany.com', password: 'plannr12', password_confirmation: 'plannr12', company: other_company)
puts "Successfully created account for Phil" if phil_user

sunny_profile = Profile.create(user: sunny_user, first_name: "Sunny", last_name: "Vempati")
puts "Successfully created profile for Sunny" if sunny_profile

justin_profile = Profile.create(user: justin_user, first_name: "Justin", last_name: "Kobylarz")
puts "Successfully created profile for Justin" if justin_profile

josh_profile = Profile.create(user: josh_user, first_name: "Josh", last_name: "Haas")
puts "Successfully created profile for Josh" if josh_profile

phil_profile = Profile.create(user: josh_user, first_name: "Phil", last_name: "Collins")
puts "Successfully created profile for Phil" if phil_profile

Event.create(company: plannr_company,
						 name: "26th Birthday Bash",
						 client_name: Faker::Name.name,
						 start_date: Faker::Date.forward(45),
						 budget: 2500,
						 location: "Chicago, IL")

puts "Created 26th Birthday Bash"

Event.create(company: plannr_company,
						 name: "Dinner for Schmucks",
						 client_name: Faker::Name.name,
						 start_date: Faker::Date.forward(63),
						 budget: 1150,
						 location: "Chicago, IL")

puts "Created Dinner for Schmucks"

