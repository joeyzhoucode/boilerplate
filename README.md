# boilerplate

This repo serves as a boilerplate for Rails 5 API + PostgreSQL + Redis + Create React App on Heroku.

## Getting started

First you must set up Rails Credentials for Omniauth, run:

``` shell
cd boilerplate
EDITOR="code --wait" bin/rails credentials:edit
```

In this editor, you must setup your secrets like so:

``` yml
google:

  # Get these by creating a Google OAuth Client ID
  client_id:
  client_secret:
```

Then, start the server and client locally:

``` shell
cd boilerplate
bundle
cd client
yarn install
cd ..
rake db:migrate
rake db:seed
rake start
```

Once you're ready to deploy to [Heroku](https://www.heroku.com), run:

``` shell
heroku apps:create
heroku buildpacks:add heroku/nodejs --index 1
heroku buildpacks:add heroku/ruby --index 2
heroku config:set RAILS_MASTER_KEY="$(< config/master.key)"
git push heroku master
heroku run rake db:seed
heroku open
```
