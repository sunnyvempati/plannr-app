Fog.credentials_path = Rails.root.join('config/fog_credentials.yml')

# causes CarrierWave to fail noisily
# this is to make error obvious while developing
CarrierWave.configure do |config|
  config.ignore_integrity_errors = false
  config.ignore_processing_errors = false
  config.ignore_download_errors = false

  config.fog_credentials = {:provider => 'AWS'}
  # TODO: get to work with dev/test/prod
  config.fog_directory =  'plannr-testing-temp'
  #config.fog_directory  = "plannr-#{Rails.env}"

  config.fog_public     = false                                   # optional, defaults to true
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
end
