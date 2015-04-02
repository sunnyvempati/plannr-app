require 'rails_helper'

RSpec.describe ErrorsController, type: :controller do

  describe "GET #precondition_failed" do
    it "returns http success" do
      get :precondition_failed
      expect(response).to have_http_status(:success)
    end
  end

end
