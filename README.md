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

# Setting up Docker on OSX
You'll want to look into docker-machine.  Once you have it installed you can create a machine with the following command:

    docker-machine create \
      --driver=virtualbox \
      --virtualbox-cpu-count 4 \
      --virtualbox-memory "4096" \
      --engine-insecure-registry docker.yourplannr.com dev

## Using docker-compose
Docker Compose will help you run all the parts of the system locally.  It starts up all the supporting pieces as well as the plannr app.

It also links the current directory as a volume in the plannr-app container so that if you make changes they are applied immediately.

You can start it with `docker-compose up`, the first time you do this it might take a while as it has to build everything, but subsequent times will be much faster.

The first time you you start plannr app, it will create and migrate the database for you but it won't have any data in it.  In order to seed data you'll want to run db seed and you can do so via:
`docker-compose run plannr-app bundle exec rake db:seed`

# Deploying with Docker
1. Build a new image
1. Tag it with 'latest' and a version
1. Push image to docker.yourplannr.com
1. Log into rancher


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
