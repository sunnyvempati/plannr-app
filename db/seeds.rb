plannr_company = Company.create(name: "Plannr")   
puts "Successfully created company for Plannr" if plannr_company   
    
other_company = Company.create(name: "Genesis")   
puts "Successfully created company for Genesis" if other_company    
    
sunny_user = User.create(email: 'sunny@yourplannr.com', password: 'plannr12', password_confirmation: 'plannr12', company: plannr_company)    
puts "Successfully created account for Sunny" if sunny_user    
  
justin_user = User.create(email: 'justin@yourplannr.com', password: 'plannr12', password_confirmation: 'plannr12', company: plannr_company)    
puts "Successfully created account for Justin" if justin_user    
   
josh_user = User.create(email: 'josh@yourplannr.com', password: 'plannr12', password_confirmation: 'plannr12', company: plannr_company)    
puts "Successfully created account for Josh" if josh_user    
   
phil_user = User.create(email: 'phil@genesis.com', password: 'plannr12', password_confirmation: 'plannr12', company: other_company)   
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


sam_contact = Contact.create(name: "Sam Doe", email: "sam@doe.com", company: plannr_company)
puts "Successfully created contact for Sam" if sam_contact

jill_contact = Contact.create(name: "Jill Doe", email: "jill@doe.com", company: plannr_company)
puts "Successfully created contact for Jill" if jill_contact

mike_contact = Contact.create(name: "Mike Doe", email: "mike@doe.com", company: plannr_company)
puts "Successfully created contact for Mike" if mike_contact

john_contact = Contact.create(name: "John Other", email: "john@other.com", company: other_company)
puts "Successfully created contact for John" if john_contact 

william_contact = Contact.create(name: "William Doe", email: "william@doe.com", company: plannr_company)
puts "Successfully created contact for William" if william_contact

shaun_contact = Contact.create(name: "Shaun Doe", email: "shaun@doe.com", company: plannr_company)
puts "Successfully created contact for Shaun" if shaun_contact

alex_contact = Contact.create(name: "Alex Doe", email: "alex@doe.com", company: plannr_company)
puts "Successfully created contact for Alex" if alex_contact

sally_contact = Contact.create(name: "Sally Other", email: "sally@other.com", company: other_company)
puts "Successfully created contact for Sally" if sally_contact 


balloons_vendor = Vendor.create(name: "Balloons, Inc", company: plannr_company)
puts "Successfully create vendor for Ballons Inc"

inflatable_castles_vendor = Vendor.create(name: "Inflatable Castles, Inc", company: plannr_company)
puts "SuccessfInflatable Castlesully create vendor for Inflatable Castles Inc"

jimmys_vendor = Vendor.create(name: "Jimmy's Mobile Petting Zoo", company: plannr_company)
puts "Successfully create vendor for Jimmy's Mobile Petting Zoo"

party_down_catering_vendor = Vendor.create(name: "Party down Catering, Inc", company: plannr_company)
puts "Successfully create vendor for Party Down Catering"


tables_vendor = Vendor.create(name: "Tables, Inc", company: plannr_company)
puts "Successfully create vendor for Tables Inc"

chairs_vendor = Vendor.create(name: "Chairs, Inc", company: plannr_company)
puts "Successfully create vendor for Chairs Inc"

lamps_vendor = Vendor.create(name: "Lamps, Inc", company: plannr_company)
puts "Successfully create vendor for Lamps Inc"
