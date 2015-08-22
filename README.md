Plannr Dashboard
================
# Get Started
Things to install:
- rails
- postgres
- rbenv
- node/npm/bower
- pow/powder

Run these commands once you pull down code:
```
bundle
bundle exec rake bower:install
bundle exec rake db:create db:migrate db:seed
powder link
```

Navigate to `http://plannr-app.dev/login` to get started

## Deployment
- run `cap staging|production deploy` to deploy to servers.
- run `cap staging|production setup` to transfer secrets.

*We use nginx and passenger on our servers. Ask Sunny for access to servers*


### Using Bower
- Add component name to `Bowerfile`
- Run `bundle exec rake bower:install`

# Running the app
## Environment variables:
These are **REQUIRED TO BE SET** (unless marked optional) in order for the application to run

- `AWS_ACCESS_KEY_ID`: AWS key id
- `AWS_SECRET_ACCESS_KEY`: AWS Secret access key
- `SECRET_KEY_BASE`: Rails env secret key, used for verifying signed cookies
- `PLANNR_LOGSTASH_HOST`: **Optional** logstash host to use, system will also use docker-provided ENV vars
- `PLANNR_LOGSTASH_PORT`: **Optional** logstash port to use, system will also use docker-provided ENV vars
- `PLANNR_ELASTIC_HOST`: **Optional** Elasticsearch host to use, system will also use docker-provided ENV vars, or default to localhost
- `PLANNR_ELASTIC_PORT`: **Optional** Elasticsearch port to use, system will also use docker-provided ENV vars, or default to 9200
