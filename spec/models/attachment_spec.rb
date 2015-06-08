require 'rails_helper'
require 'fakefs/spec_helpers'
require 'support/helpers/fog_helper' #used to prevent actual upload of files

RSpec.describe Attachment, type: :model do

  describe AttachmentFileUploader do
    include FakeFS::SpecHelpers

    context 'for non-production environment' do
      it 'uploads a 4b test file to dev-bucket on s3' do
        test_file_name = 'test_file_4b'
        FakeFS.activate!
        File.open(test_file_name, 'w') do |f|
          f.puts('foo')
        end
        uploader_test = Attachment.new
        uploader_test.file_link = File.open(test_file_name)
        uploader_test.save!
        expect(uploader_test.file_link.url).to match /.*\/plannr-development.*/
        FakeFS.deactivate!
      end

      it 'uploads a 350KB test file to dev-bucket on s3' do
        test_file_name = 'test_file_350KB'
        FakeFS.activate!
        File.open(test_file_name, 'w') do |f|
          90000.times do
            f.puts('foo')
          end
        end
        uploader_test = Attachment.new
        uploader_test.file_link = File.open(test_file_name)
        uploader_test.save!
        expect(uploader_test.file_link.url).to match /.*\/plannr-development.*/
        FakeFS.deactivate!
      end

      it 'uploads a 1.3MB test file to dev-bucket on s3' do
        test_file_name = 'test_file_1MB'
        FakeFS.activate!
        File.open(test_file_name, 'w') do |f|
          360000.times do
            f.puts('foo')
          end
        end
        uploader_test = Attachment.new
        uploader_test.file_link = File.open(test_file_name)
        uploader_test.save!
        expect(uploader_test.file_link.url).to match /.*\/plannr-development.*/
        FakeFS.deactivate!
      end

      # it 'uploads a 11MB test file to dev-bucket on s3' do
      #   test_file_name = 'test_file_11MB'
      #   FakeFS.activate!
      #   File.open(test_file_name, 'w') do |f|
      #     3000000.times do
      #       f.puts('foo')
      #     end
      #   end
      #   uploader_test = Attachment.new
      #   uploader_test.file_link = File.open(test_file_name)
      #   uploader_test.save!
      #   expect(uploader_test.file_link.url).to match /.*\/plannr-development.*/
      #   FakeFS.deactivate!
      # end
    end
  end
end
