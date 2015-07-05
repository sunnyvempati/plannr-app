require 'rails_helper'

RSpec.describe VendorsController, type: :controller do
  setup :activate_authlogic

  let(:user) { FactoryGirl.create(:user) }

  before do
    ActsAsTenant.current_tenant = user.company
    login user
  end

  describe 'search_vendors_not_in_event with no search text' do
    let!(:event1) { FactoryGirl.create(:event) }
    let!(:event2) { FactoryGirl.create(:event) }

    let!(:vendor1) { FactoryGirl.create(:vendor, events: [event1]) }
    let!(:vendor2) { FactoryGirl.create(:vendor, events: [event2]) }
    let!(:vendor3) { FactoryGirl.create(:vendor, events: [event2]) }
    let!(:vendor4) { FactoryGirl.create(:vendor, events: [event1, event2]) }
    let!(:vendor5) { FactoryGirl.create(:vendor) }

    it "returns the count of vendors not in event1 " do
      get :search_vendors_not_in_event, { event_id: event1.id, search: {text: ''} }
      expect(response.status).to eq 200
      parsed_body = JSON.parse(response.body)
      expect(parsed_body["vendors"].count).to eq 3
    end

    it "returns the count of vendors not in event2" do
      get :search_vendors_not_in_event, { event_id: event2.id, search: {text: ''} }
      expect(response.status).to eq 200
      parsed_body = JSON.parse(response.body)
      expect(parsed_body["vendors"].count).to eq 2
    end
  end
end
