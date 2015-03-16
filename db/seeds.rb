# Users

sunny_user = User.create(email: 'sunny@yourplannr.com', password: 'plannr12', password_confirmation: 'plannr12')
puts "Successfully created account for Sunny" if sunny_user

justin_user = User.create(email: 'justin@yourplannr.com', password: 'plannr12', password_confirmation: 'plannr12')
puts "Successfully created account for Justin" if justin_user

josh_user = User.create(email: 'josh@yourplannr.com', password: 'plannr12', password_confirmation: 'plannr12')
puts "Successfully created account for Josh" if josh_user

# Profiles

sunny_profile = Profile.create(user: sunny_user, first_name: "Sunny", last_name: "Vempati", planner: true)
puts "Successfully created profile for Sunny" if sunny_profile

justin_profile = Profile.create(user: justin_user, first_name: "Justin", last_name: "Kobylarz", planner: true)
puts "Successfully created profile for Justin" if justin_profile

josh_profile = Profile.create(user: josh_user, first_name: "Josh", last_name: "Haas", planner: true)
puts "Successfully created profile for Josh" if josh_profile

# Events
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

# Tasks
Task.create(name: "Task 1", description: "description of Task #1. It is a good description", deadline: "1/1/2015")
Task.create(name: "Task 2", description: "description of Task #2. It is a good description", deadline: "1/2/2015")
Task.create(name: "Task 3", description: "description of Task #3. It is a good description", deadline: "1/3/2015")
Task.create(name: "Task 4", description: "description of Task #4. It is a good description", deadline: "1/4/2015")
Task.create(name: "Task 5", description: "description of Task #5. It is a good description", deadline: "1/5/2015")
Task.create(name: "Task 6", description: "description of Task #6. It is a good description", deadline: "1/6/2015")
Task.create(name: "Task 7", description: "description of Task #7. It is a good description", deadline: "1/7/2015")
Task.create(name: "Task 8", description: "description of Task #8. It is a good description", deadline: "1/8/2015")
Task.create(name: "Task 9", description: "description of Task #9. It is a good description", deadline: "1/9/2015")
Task.create(name: "Task 10", description: "description of Task #10. It is a good description", deadline: "1/10/2015")
Task.create(name: "Task 11", description: "description of Task #11. It is a good description", deadline: "1/11/2015")
puts "11 Tasks created."
