class UsersController < ApplicationController
  def show
    @user = User.find_by(id: request.session[:user_id])

    render json: { user: @user }
  end
end
