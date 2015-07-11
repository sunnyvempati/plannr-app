Fog.credentials_path = Rails.root.join('config/fog_credentials.yml')

# causes CarrierWave to fail noisily
# this is to make error obvious while developing
CarrierWave.configure do |config|
  config.ignore_integrity_errors = false
  config.ignore_processing_errors = false
  config.ignore_download_errors = false

  config.fog_credentials = {provider: 'AWS', region: 'us-west-2'}
  # TODO: get to work with dev/test/prod
  config.fog_directory =  'plannr-development'
  #config.fog_directory  = "plannr-#{Rails.env}"

  config.fog_public     = false                                   # optional, defaults to true
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
end

# fix to allow deleting of Attachment records when the underlying file_link doesn't exist on AWS
# from here - https://github.com/carrierwaveuploader/carrierwave/pull/1561
class CarrierWave::Storage::Fog::File
  def size
    file.nil? ? 0 : file.content_length
  end
end
