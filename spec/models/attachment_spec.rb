require 'rails_helper'
require 'fakefs/spec_helpers'

RSpec.describe Attachment, type: :model do

  describe AttachmentFileUploader do
    include FakeFS::SpecHelpers

    context 'for non-production environment' do
      it 'uploads a tiny test file to dev-bucket on s3' do
        FakeFS.activate!
        File.open('test_file', 'w') do |f|
          f.puts('foo') # this is required or uploader_test.file.url will be nil
        end
        uploader_test = Attachment.new
        uploader_test.file_link = File.open('test_file')
        uploader_test.save!
        expect(uploader_test.file_link.url).to match /.*\/plannr-first-test.*/
        FakeFS.deactivate!
      end

      it 'uploads a 270KB test file to dev-bucket on s3' do
        FakeFS.activate!
        File.open('test_file', 'w') do |f|
          90000.times do
            f.puts('foo') # this is required or uploader_test.file.url will be nil
          end
        end
        uploader_test = Attachment.new
        uploader_test.file_link = File.open('test_file')
        uploader_test.save!
        expect(uploader_test.file_link.url).to match /.*\/plannr-first-test.*/
        FakeFS.deactivate!
      end

      it 'uploads a 1MB test file to dev-bucket on s3' do
        FakeFS.activate!
        File.open('test_file', 'w') do |f|
          360000.times do
            f.puts('foo') # this is required or uploader_test.file.url will be nil
          end
        end
        uploader_test = Attachment.new
        uploader_test.file_link = File.open('test_file')
        uploader_test.save!
        expect(uploader_test.file_link.url).to match /.*\/plannr-first-test.*/
        FakeFS.deactivate!
      end
    end
  end
end
