# boilerplate

This repo serves as a boilerplate for Rails 5 API + PostgreSQL + Redis + Create React App on Heroku.

## Getting started

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
git push heroku master
heroku run rake db:seed
heroku open
```
