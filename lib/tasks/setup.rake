namespace :setup do
  desc 'Resets credentials'
  task :credentials do
    puts 'Opening editor to setup credentials...\n'
    puts <<~YML
    # Copy this into your editor
    google:
      # Get these by creating a Google OAuth Client ID
      client_id:
      client_secret:
    YML
    exec 'rm -f config/credentials.yml.enc && EDITOR="code --wait" bin/rails credentials:edit'
  end

  desc 'Runs bundle and yarn install'
  task :install do
    exec 'bundle && yarn --cwd ./client/ install'
  end

  desc 'Resets, migrates, and seeds database'
  task :db do
    exec 'rake db:reset db:migrate db:seed'
  end

  desc 'Builds Heroku deploy infrastructure'
  task :heroku do
    exec 'heroku apps:create && heroku buildpacks:add heroku/nodejs --index 1 && heroku buildpacks:add heroku/ruby --index 2 && heroku config:set RAILS_MASTER_KEY="$(< config/master.key)"'
  end
end