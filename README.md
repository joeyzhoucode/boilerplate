# boilerplate

This repo serves as a boilerplate for Rails 5 API + PostgreSQL + Redis + Create React App on Heroku.

## Getting started

``` shell
cd boilerplate
rake setup:credentials
rake setup:install
rake setup:db
```

### Deployment

Once you're ready to deploy to [Heroku](https://www.heroku.com), run:

``` shell
rake setup:heroku
git push heroku master
heroku run rake db:seed
heroku open
```

To use the Redis add-on (e.g. for ActionCable), run:

``` shell
heroku addons:create redistogo:nano
heroku config | grep REDISTOGO_URL
```

And copy the `REDISTOGO_URL` into `cable.yml`:

``` yml
development:
  adapter: async

test:
  adapter: async

production:
  adapter: redis
  url: # REDISTOGO_URL
  channel_prefix: joeyee_production
```
