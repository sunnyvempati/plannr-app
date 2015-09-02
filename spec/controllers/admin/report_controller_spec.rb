require 'rails_helper'

RSpec.describe Admin::ReportController, type: :controller do
  include_context 'controller_init'

  let(:user) { FactoryGirl.create(:user, :admin) }

  describe 'GET #users' do
    it 'returns http success' do
      get :users, format: :json
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #companies' do
    it 'returns http success' do
      get :companies, format: :json
      expect(response).to have_http_status(:success)
    end
  end

end
