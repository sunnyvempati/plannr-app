require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  include_context 'controller_init'

  describe "index" do
    let(:user_2) { FactoryGirl.create(:user) }
    let(:event) { FactoryGirl.create(:event) }

    let(:comment_1) { FactoryGirl.create(:comment, commenter: user) }
    let(:comment_2) { FactoryGirl.create(:comment, commenter: user, locked: true) }
    let(:comment_3) { FactoryGirl.create(:comment, commenter: user_2) }
    let(:comment_4) { FactoryGirl.create(:comment, commenter: user_2, locked: true) }

    let(:comment_params) do
      {
        commentable_type: "Event",
        commentable_id: event.id
      }
    end

    before do
      event.comments = [comment_1, comment_2, comment_3, comment_4]
      event.save!
      get :index, comment_params, format: :json
    end

    it "returns success" do
      expect(response.status).to eq 200
    end

    it "returns only comments from user and unlocked comments" do
      returned_comment_ids = json_response['comments'].map {|c| c['id']}
      expected_comment_ids = [comment_1.id, comment_2.id, comment_3.id]
      expect(returned_comment_ids).to match_array expected_comment_ids
    end
  end
end
