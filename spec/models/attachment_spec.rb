require 'rails_helper'

RSpec.describe Attachment, type: :model do
  include CarrierWave::Test::Matchers

  before do
    AttachmentFileUploader.enable_processing = true
    @uploader = AttachmentFileUploader.new(@attachment, :attachment_file)

    File.open('/Users/justinkobylarz/Documents/test upload file copy.txt') do |f|
      @yy = @uploader.store!(f)
    end
  end

  it "has some permisions" do
    #x = @uploader have_permission(0777)

    #expect @uploader have_permission(0777)
  end

  after do
    AttachmentFileUploader.enable_processing = false
    @uploader.remove!
  end

end
