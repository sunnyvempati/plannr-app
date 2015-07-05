require 'rails_helper'

RSpec.describe Event, type: :model do
  let(:event) { FactoryGirl.build(:event) }

  describe "validations" do
    it { should validate_presence_of(:name) }

    it 'creates a valid event' do
      expect(event).to be_valid
    end

    it 'has a future start date' do
      event.start_date = Date.today - 2.days
      expect(event).to_not be_valid
    end

    it 'ends after it starts' do
      event.end_date = event.start_date - 2.days
      expect(event).to_not be_valid
    end
  end
end
