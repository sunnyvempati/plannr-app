require 'rails_helper'

RSpec.describe EventVendor, type: :model do
  it { should validate_presence_of(:event) }
  it { should validate_presence_of(:vendor) }
end
