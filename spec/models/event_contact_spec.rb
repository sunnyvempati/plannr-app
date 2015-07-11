require 'rails_helper'

RSpec.describe EventContact, type: :model do
  it { should validate_presence_of(:event) }
  it { should validate_presence_of(:contact) }
end
