class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, unless: -> { request.format.json? }

  respond_to :json

  def index
    render :file => 'public/index.html'
  end
end
