class AttachmentFileUploader < CarrierWave::Uploader::Base
  Fog.credentials_path = Rails.root.join('config/fog_credentials.yml')

  # causes CarrierWave to fail noisily
  # this is to make error obvious while developing
  CarrierWave.configure do |config|
    config.ignore_integrity_errors = false
    config.ignore_processing_errors = false
    config.ignore_download_errors = false
  end

  # check here for region, endpoints, and other stuff
  # http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region

  CarrierWave.configure do |config|
    config.fog_credentials = {:provider => 'AWS'}
    # config.fog_directory  = fog_dir
    # config.fog_credentials = {
    #   # TODO: move id and key with DB credentials
    #   :provider               => 'AWS',                        # required
    #   :aws_access_key_id      => 'AKIAI2BHUZAVXYKNK7WQ',                        # required
    #   :aws_secret_access_key  => '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',                        # required
    #   #:region                 => 'us-west-1',                  # optional, defaults to 'us-east-1'
    #   :host                   => 's3-us-west-2.amazonaws.com',             # optional, defaults to nil
    #   #:endpoint               => 'https://s3-us-west-2.amazonaws.com', # optional, defaults to nil
    #   #:path_style             => true     # use old-style path
    # }
    # TODO: move
    config.fog_directory =  'plannr-development'

    #config.fog_directory  = "plannr-#{Rails.env}"
    config.fog_public     = false                                   # optional, defaults to true
    config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
  end


  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  # storage :file
  storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process :scale => [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process :resize_to_fit => [50, 50]
  # end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  # def extension_white_list
  #   %w(jpg jpeg gif png)
  # end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end

end
