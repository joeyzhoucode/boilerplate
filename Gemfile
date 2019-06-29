source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

gem 'rails', '~> 5.2.3'
gem 'puma', '~> 3.11'
gem 'redis', '~> 4.0'

gem 'bootsnap', '>= 1.1.0', require: false
gem 'rack-cors'

gem 'omniauth-google-oauth2'
gem 'faker'

group :development, :test do
  gem 'byebug'
  gem 'pry'
  gem 'pry-byebug', platforms: [:mri, :mingw, :x64_mingw]

  gem 'sqlite3'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring', require: false
end

group :production do
  gem 'pg'
end

gem 'devise', '>= 4.6.0'
