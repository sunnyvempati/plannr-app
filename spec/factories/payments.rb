FactoryGirl.define do
  factory :payment do
    due_date "2015-09-03"
amount "9.99"
type 1
paid false
notes "MyText"
  end

end
