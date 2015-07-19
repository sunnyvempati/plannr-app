require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'create' do
    let(:email) { Faker::Internet.email }
    let(:pwd) { 'test123' }
    let(:company) { FactoryGirl.create(:company) }
    let (:user_create_params) do
      {
        user: {
          email: email,
          password: pwd,
          password_confirmation: pwd
        },
        format: 'json'
      }
    end

    context 'user invited with company' do
      before do
        allow_any_instance_of(UsersController).to receive(:check_invitation!).and_return(true)
        controller.instance_variable_set(:@invitation, Invitation.create!(email: email, company: company))
        post :create, user_create_params
      end

      describe 'valid user' do
        it 'suceeds and sets correct company' do
          expect(response).to be_success
          created_user = User.first
          expect(created_user).to be
          expect(created_user.company).to eq company
          expect(created_user).to_not be_company_admin
        end
      end
    end

    context 'new user no invitation' do
      let(:company_name) { 'TestCompany' }
      let(:company_params) do
        { company: { name: company_name } }
      end

      describe 'valid user with non existing company' do
        before do
          params = user_create_params.merge!(company_params)
          post :create, params
        end
        it 'suceeds' do
          expect(response).to be_success
        end

        it 'creates user' do
          expect(User.all.count).to eq 1
        end

        it 'creates company' do
          created_company = Company.first
          expect(created_company).to be
          expect(created_company.name).to eq company_name
        end

        it 'makes user admin' do
          expect(User.first).to be_company_admin
        end
      end

      describe 'valid user with existing company' do
        before do
          FactoryGirl.create(:company, name: company_name)
          params = user_create_params.merge!(company_params)
          post :create, params
        end

        it 'errors' do
          expect(response.status).to eq 403
        end
      end

      describe 'invalid user with non existing company' do
        let!(:user) { FactoryGirl.create(:user, email: email) }

        before do
          params = user_create_params.merge!(company_params)
          post :create, params
        end

        it 'errors' do
          expect(response.status).to eq 403
        end
      end
    end
  end
end
