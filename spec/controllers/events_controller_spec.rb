require 'rails_helper'

RSpec.describe EventsController, type: :controller do
  include_context 'controller_init'

  describe "create" do
    let(:event_params) do
      {
        format: 'json',
        event: {
          name: Faker::Lorem.word
        }
      }
    end
    describe "with client" do
      let(:contact) { FactoryGirl.create(:contact) }
      before do
        event_params[:event][:client_id] = contact.id
        post :create, event_params
      end

      it "is successful and creates event" do
        expect(response).to be_success
        expect(json_response['event']['id']).to eq Event.first.id
        expect(Event.all.count).to eq 1
      end

      it "creates new event contact with client" do
        created_event_contact = EventContact.first
        created_event = Event.first
        expect(created_event_contact.event_id).to eq created_event.id
        expect(created_event_contact.contact_id).to eq created_event.client_id
      end
    end

    describe "without client" do
      before { post :create, event_params }

      it "is successful and creates event" do
        expect(response).to be_success
        expect(json_response['event']['id']).to eq Event.first.id
        expect(Event.all.count).to eq 1
      end

      it "does not create event contact" do
        expect(EventContact.all.count).to eq 0
      end
    end

    describe 'with template' do
      let(:template_event) { FactoryGirl.create(:event) }
      let(:template_params) do
        {
          # booleans need to strings to mimic serialized json
          parent_event_id: template_event.id,
          contacts: 'true',
          vendors: 'false',
          comments: 'true',
          tasks: 'true'
        }
      end
      context 'all entities' do
        before do
          event_params.merge!(template: template_params)
          post :create, event_params
        end

        let(:created_event) { json_response['event'] }

        it 'successfully creates event using template' do
          expect(response).to be_success
          expect(created_event['parent_id']).to eq template_event.id
          expect(created_event['name']).to eq event_params[:event][:name]
        end
      end
    end
  end
end
