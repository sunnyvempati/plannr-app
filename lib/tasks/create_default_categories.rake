desc "Default Categories for every company"
task :create_default_categories => [:environment] do |t, args|
  Company.all.each do |c|
    ExpenseCategory.default_expense_categories.each do |ec|
      ExpenseCategory.find_or_create_by!(name: ec, company: c)
      puts "created #{ec} category for #{c.name}"
    end
  end
end
