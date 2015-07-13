require 'rails_helper'

RSpec.describe VendorsController, type: :controller do
  include_context 'controller_init'

  describe 'search_vendors_not_in_event with no search text' do
    let!(:event1) { FactoryGirl.create(:event) }
    let!(:event2) { FactoryGirl.create(:event) }

    let!(:vendor1) { FactoryGirl.create(:vendor, events: [event1]) }
    let!(:vendor2) { FactoryGirl.create(:vendor, events: [event2]) }
    let!(:vendor3) { FactoryGirl.create(:vendor, events: [event2]) }
    let!(:vendor4) { FactoryGirl.create(:vendor, events: [event1, event2]) }
    let!(:vendor5) { FactoryGirl.create(:vendor) }

    it "returns the count of vendors not in event1 " do
      get :index, { format: :json, filter_sort: { not_in_event_id: event1.id, search_query: '' } }
      expect(response).to be_success
      expect(json_response["vendors"].count).to eq 3
    end

    it "returns the count of vendors not in event2" do
      get :index, { format: :json, filter_sort: { not_in_event_id: event2.id, search_query: '' } }
      expect(response).to be_success
      expect(json_response["vendors"].count).to eq 2
    end
  end
end
