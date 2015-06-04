require 'rails_helper'

RSpec.describe CommentsController, type: :controller do

  describe "GET #only:" do
    it "returns http success" do
      get :only:
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #create" do
    it "returns http success" do
      get :create
      expect(response).to have_http_status(:success)
    end
  end

end
