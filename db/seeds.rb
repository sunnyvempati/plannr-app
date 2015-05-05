require 'faker'

# instance vars
@global_password = 'plannr12'

# yml seed file path: db/seeds/*
def load_ymls
  @companies = YAML::load(File.open(File.join(Rails.root, 'db', 'seeds', 'companies.yml')))
  @users = YAML::load(File.open(File.join(Rails.root, 'db', 'seeds', 'users.yml')))
  @events = YAML::load(File.open(File.join(Rails.root, 'db', 'seeds', 'events.yml')))
  @vendors = YAML::load(File.open(File.join(Rails.root, 'db', 'seeds', 'vendors.yml')))
  @contacts = YAML::load(File.open(File.join(Rails.root, 'db', 'seeds', 'contacts.yml')))
  @tasks = YAML::load(File.open(File.join(Rails.root, 'db', 'seeds', 'tasks.yml')))
end
#----

def create_companies
  @companies.values.each do |c|
    if Company.find_or_create_by!(c)
      puts "Created company: #{c["name"]}"
    end
  end
end

def create_users
  @users.values.each do |u|
    u.symbolize_keys!
    created_user = User.find_or_create_by!(email: u[:email]) do |user|
      user.password = 'plannr12'
      user.password_confirmation = 'plannr12'
      user.company = Company.find_by_name(u[:company])
      user.company_admin = u[:company_admin]
    end
    Profile.create(first_name: u[:first_name], last_name: u[:last_name], user: created_user) unless created_user.profile

    if created_user && created_user.profile
      puts "Created User: #{u[:email]}"
    end
  end
end

def create_events
  @events.values.each do |e|
    e.symbolize_keys!
    created_event = Event.find_or_create_by!(name: e[:name]) do |event|
      event.owner = User.find_by_email(e[:owner])
      event.client = Contact.create!(name: Faker::Name.name,
                                     email: Faker::Internet.email,
                                     phone: "309-999-9999",
                                     organization: Faker::Company.name,
                                     description: Faker::Lorem.sentence,
                                     category: 1,
                                     owner: User.find_by_email(e[:owner]),
                                     company: Company.find_by_name(e[:company]))
      event.company = Company.find_by_name(e[:company])
      event.location = Faker::Address.city
      event.start_date = e[:start_date]
      event.end_date = e[:end_date]
      event.budget = e[:budget]
      event.description = Faker::Lorem.paragraph
    end
    puts "Created Event: #{created_event.name}" if created_event
  end
end

def create_vendors
  return if Vendor.all.count == 20
  # make 20 vendors
  # create 5 of each kind from yaml file
  5.times do
    @vendors.values.each do |v|
      v.symbolize_keys!
      created_vendor = Vendor.create!(name: Faker::Company.name,
                   location: "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
                   phone: "309-999-9999",
                   primary_contact: Faker::Name.name,
                   owner: User.find_by_email(v[:owner]),
                   company: Company.find_by_name(v[:company]))
      puts "Created Vendor: #{created_vendor.name}" if created_vendor
    end
  end
end

def create_contacts
  return if Contact.all.count == 20

  10.times do
    @contacts.values.each do |c|
      c.symbolize_keys!
      created_contact = Contact.create!(name: Faker::Name.name,
                                        email: Faker::Internet.email,
                                        phone: "309-999-9999",
                                        organization: Faker::Company.name,
                                        description: Faker::Lorem.sentence,
                                        category: 2,
                                        owner: User.find_by_email(c[:owner]),
                                        company: Company.find_by_name(c[:company]))
      puts "Created Contact: #{created_contact.name}" if created_contact
    end
  end
end

def create_tasks
  return if Task.all.count > 20

  5.times do
    @tasks.values.each do |t|
      t.symbolize_keys!
      created_task = Task.create!(
                      name: "#{Faker::Hacker.verb} #{Faker::Hacker.noun}",
                      description: "#{Faker::Hacker.say_something_smart}",
                      event: Event.find_by_name(t[:event]),
                      owner: User.find_by_email(t[:owner]),
                      company: Company.find_by_name(t[:company]))
      puts "Created Task: #{created_task.name}" if created_task
    end
  end
end

# commands
# ----
load_ymls
%w(companies users events vendors contacts tasks).each do |entity|
  send("create_#{entity}")
end
# ----
