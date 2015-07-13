require 'rails_helper'

RSpec.describe ContactsController, type: :controller do
  include_context 'controller_init'

  describe "GET #index" do
    let(:number_of_contacts) { 2 }

    before do
      number_of_contacts.times do
        FactoryGirl.create(:contact)
      end
      get :index, format: :json
    end

    it 'the correct number of contacts were created' do
      expect(response).to be_success
      expect(json_response['contacts'].count).to eq number_of_contacts
    end
  end


  describe "json create" do
    let(:this_guy_name) { "Mr. Testing Guy"}
    let(:create_params) do
      {
        format: "json",
        contact: {
          name: this_guy_name
        }
      }
    end

    before do
      post :create, create_params
    end

    let(:created_contact) { Contact.first }

    it "creates specified contact" do
      expect(created_contact).to be
      expect(created_contact.name).to eq this_guy_name
    end
  end

  describe 'search_contacts_not_in_event with no search text' do
    let!(:event1) { FactoryGirl.create(:event) }
    let!(:event2) { FactoryGirl.create(:event) }

    let!(:contact1) { FactoryGirl.create(:contact, events: [event1]) }
    let!(:contact2) { FactoryGirl.create(:contact, events: [event2]) }
    let!(:contact3) { FactoryGirl.create(:contact, events: [event2]) }
    let!(:contact4) { FactoryGirl.create(:contact, events: [event1, event2]) }
    let!(:contact5) { FactoryGirl.create(:contact) }

    it "returns the count of contacts not in event1 " do
      get :index, { format: :json, filter_sort: { not_in_event_id: event1.id, search_query: '' } }
      expect(response).to be_success
      expect(json_response["contacts"].count).to eq 3
    end

     it "returns the count of contacts not in event2" do
      get :index, { format: :json, filter_sort: { not_in_event_id: event2.id, search_query: '' } }
      expect(response).to be_success
      expect(json_response["contacts"].count).to eq 2
    end

  end

end
