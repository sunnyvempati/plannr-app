require 'elasticsearch'
require 'elasticsearch/model'

# This hopefully supports all our use cases
host = ENV['ELASTIC_HOST'] || ENV["ELASTICSEARCH_PORT_9200_TCP_ADDR"] || 'localhost'
port = (ENV['ELASTIC_PORT'] || ENV["ELASTICSEARCH_PORT_9200_TCP_PORT"] || 9200).to_i
hosts = {host: host, port: port}

Elasticsearch::Model.client = Elasticsearch::Client.new hosts
