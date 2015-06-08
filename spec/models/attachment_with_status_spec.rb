require 'rails_helper'

RSpec.describe AttachmentWithStatus do
  let(:attachment) {FactoryGirl.build(:attachment)}

  it "has a valid initialize method that takes attachment as parameter" do
    attachment_with_status = AttachmentWithStatus.new(attachment)

    expect(attachment_with_status).to_not eq nil

  end
end
