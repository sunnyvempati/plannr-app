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




