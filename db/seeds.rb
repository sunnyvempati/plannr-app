sunny_user = User.create(email: 'sunny@yourplannr.com', password: 'plannr12', password_confirmation: 'plannr12')
puts "Successfully created account for Sunny" if sunny_user

sunny_profile = Profile.create(user: sunny_user, first_name: "Sunny", last_name: "Vempati", planner: true)

puts "Successfully created profile for Sunny" if sunny_profile

Event.create(user: sunny_user,
						 name: "26th Birthday Bash",
						 client_name: Faker::Name.name,
						 start_date: Faker::Date.forward(45),
						 budget: 2500,
						 location: "Chicago, IL")

puts "Created 26th Birthday Bash"

Event.create(user: sunny_user,
						 name: "Dinner for Schmucks",
						 client_name: Faker::Name.name,
						 start_date: Faker::Date.forward(63),
						 budget: 1150,
						 location: "Chicago, IL")

puts "Created Dinner for Schmucks"
