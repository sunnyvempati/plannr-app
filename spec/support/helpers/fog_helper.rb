Fog.mock!
Fog.credentials_path = Rails.root.join('config/fog_credentials.yml')
connection = Fog::Storage.new(:provider => 'AWS')

#this must match config.fog_directory
connection.directories.create(:key => 'plannr-development')
