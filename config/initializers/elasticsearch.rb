require 'elasticsearch'
require 'elasticsearch/model'

# This hopefully supports all our use cases
host = ENV["ELASTICSEARCH_PORT_9200_TCP_ADDR"] || ENV['PLANNR_ELASTIC_HOST'] || 'localhost'
port = (ENV["ELASTICSEARCH_PORT_9200_TCP_PORT"] || ENV['PLANNR_ELASTIC_PORT'] || 9200).to_i
hosts = {host: host, port: port}

Elasticsearch::Model.client = Elasticsearch::Client.new hosts
