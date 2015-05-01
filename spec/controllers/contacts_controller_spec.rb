require 'rails_helper'

RSpec.describe ContactsController, type: :controller do

  setup :activate_authlogic

  let(:user) { FactoryGirl.create(:user) }

  before do
    ActsAsTenant.current_tenant = user.company
    login user
  end


  describe "GET #index" do
    let(:number_of_contacts) { 2 }


    before do
      get :index
      number_of_contacts.times do
        FactoryGirl.create(:contact)
      end
    end

    it "redirects to login page if not logged in" do
      #response object has all the returned values from action
      expect(response.status).to eq(200)
      expect(assigns(:contacts).count).to eq number_of_contacts
    end
  end


  describe "CREATE" do
    let(:this_guy_name) { "Mr. Testing Guy"}
    let(:create_params) do
      {
        contact: {
          name: this_guy_name
        }
      }
    end

    before do
      post :create, create_params
    end

    let(:created_contact) { Contact.first }

    it "redirects after create" do
      expect(created_contact).to be
      # TODO: test that it goes to the right page?  Are we always going to go the same page?  Prob not.
      expect(response.status).to eq (302)
    end

    it "creates specified contact" do
      expect(created_contact).to be
      expect(created_contact.name).to eq this_guy_name
    end
  end

  # TODO: check out the 'by state' section for organization
  # http://stackoverflow.com/questions/9228282/rspec-large-spec-files-organisation


  describe 'quick_create' do

    let(:event) { FactoryGirl.create(:event) }
    let(:this_guy_name)  { "Mr. Testing Guy" }
    let(:this_guy_email)  { "guy@testing.com" }
    let(:quick_create_params) do
      {  quick_contact: { event_id: event.id , text: "" }  }
    end


    it "doesn't create a contact with the provided text (blank) and returns a 403 error" do
      post :quick_create, quick_create_params

      expect(Contact.all.count).to eq 0
      expect(response.status).to eq (403)
    end

    it "creates a contact with the provided text (not a valid email address) as name and is associated to the specified event" do
      quick_create_params[:quick_contact][:text] = this_guy_name
      post :quick_create, quick_create_params

      expect(Contact.first.name).to eq this_guy_name
      expect(Contact.first.email).to_not eq this_guy_name
      expect(Contact.first.events.first.id).to eq event.id
    end

    it "creates a contact with the provided text (valid email address) as name and email and is assocuated to the specified event" do
      quick_create_params[:quick_contact][:text] = this_guy_email
      post :quick_create, quick_create_params

      expect(Contact.first.name).to eq this_guy_email
      expect(Contact.first.email).to eq this_guy_email
      expect(Contact.first.events.first.id).to eq event.id
    end

  end

  describe 'other_contacts' do
    let(:event1) { FactoryGirl.create(:event) }
    let(:event2) { FactoryGirl.create(:event) }

    let(:contact1) { FactoryGirl.create(:contact) }
    let(:contact2) { FactoryGirl.create(:contact) }
    let(:contact3) { FactoryGirl.create(:contact) }
    let(:contact4) { FactoryGirl.create(:contact) }



  end


end
