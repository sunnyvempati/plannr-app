require 'faker'

# instance vars
@global_password = 'plannr12'

# yml seed file path: db/seeds/*
def load_ymls
  ['companies', 'users', 'events', 'vendors', 'contacts', 'tasks', 'attachment_limits', 'expense_categories', 'event_expense_categories', 'expenses', 'payments'].each do |file|
    filename = ENV["staging"] ? "staging_#{file}.yml" : "#{file}.yml"
    print "filename=@#{filename}..."
    instance_variable_set("@#{file}", YAML::load(File.open(File.join(Rails.root, 'db', 'seeds', filename))))
    puts "success"
  end
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
      user.verified = true
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
      event.start_date = Date.strptime(e[:start_date], '%m/%d/%Y')
      event.end_date = Date.strptime(e[:end_date], '%m/%d/%Y') if e[:end_date]
      event.budget = e[:budget]
      event.description = Faker::Lorem.paragraph
    end
    EventContact.find_or_create_by!(event: created_event, contact: created_event.client)
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
      primary_contact = Contact.create!(name: Faker::Name.name,
                                        email: Faker::Internet.email,
                                        phone: "309-999-9999",
                                        organization: Faker::Company.name,
                                        description: Faker::Lorem.paragraph,
                                        category: 1,
                                        owner: User.find_by_email(v[:owner]),
                                        company: Company.find_by_name(v[:company]))
      created_vendor = Vendor.create!(name: Faker::Company.name,
                   location: "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
                   phone: "309-999-9999",
                   primary_contact: primary_contact,
                   owner: User.find_by_email(v[:owner]),
                   company: Company.find_by_name(v[:company]),
                   description: Faker::Lorem.paragraph)
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
                                        description: Faker::Lorem.paragraph,
                                        category: 1,
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
                      company: Company.find_by_name(t[:company]),
                      assigned_to: User.find_by_email(t[:assigned_to]),
                      deadline: Date.today + 1.days,
                      status: Random.rand(1..2))
      puts "Created Task: #{created_task.name}" if created_task
    end
  end
end

def create_attachment_limits
  return if AttachmentLimit.all.count > 4

  @attachment_limits.values.each do |al|
    if AttachmentLimit.find_or_create_by!(al)
      puts "Created attachment_limit (get_count): #{al["get_count"]}"
    end
  end

  company_limit = AttachmentLimit.find_by(@attachment_limits['company_limit'])
  Company.all.each do |c|
    c.attachment_limit = company_limit
    c.save
  end
end

def create_expense_categories
  return if ExpenseCategory.all.count > 5

  @expense_categories.values.each do |c|
    c.symbolize_keys!
    created_expense_category = ExpenseCategory.create!(name: c[:name],
                                        company: Company.find_by_name(c[:company]))
    puts "Created Expense Category: #{created_expense_category.name}" if created_expense_category
  end
end

def create_event_expense_categories
  return if EventExpenseCategory.all.count > 4

  @event_expense_categories.values.each do |ec|
    ec.symbolize_keys!
    event = Event.find_by_name(ec[:event])
    category = ExpenseCategory.find_by_name(ec[:expense_category])
    created_event_category = EventExpenseCategory.create!(event: event, expense_category: category, budget: ec[:budget])
  end
end

def create_expenses
  return if Expense.all.count > 5

  @expenses.values.each do |e|
    e.symbolize_keys!
    event = Event.find_by_name(e[:event])
    category = ExpenseCategory.find_by_name(e[:expense_category])
    event_expense_category = EventExpenseCategory.where(event: event, expense_category: category).first
    vendor = Vendor.where(company: event.company).first
    created_expense = Expense.create!(name: e[:name],
                                      event_expense_category: event_expense_category,
                                      vendor: vendor,
                                      price: e[:price],
                                      notes: Faker::Lorem.paragraph(2),
                                      quantity: e[:quantity])
    puts "Created expense: #{created_expense.name}" if created_expense
  end
end

def create_payments
  return if Payment.all.count > 3

  @payments.values.each do |p|
    p.symbolize_keys!
    expense = Expense.find_by_name(p[:expense])
    created_payment = Payment.create!(expense: expense,
                                      method: p[:method],
                                      amount: p[:amount],
                                      paid: p[:paid])

    puts "Created payment successfully" if created_payment
  end
end


# commands
# ----
load_ymls
%w(companies users events vendors contacts tasks attachment_limits expense_categories event_expense_categories expenses payments).each do |entity|
  send("create_#{entity}")
end
# ----
