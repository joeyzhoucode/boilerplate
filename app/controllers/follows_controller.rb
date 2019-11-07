class FollowsController < ApplicationController
  def create
    @user = User.find_by_username!(params[:profile_username])

    User.find(session[:user_id]).follow(@user) if session[:user_id] != @user.id

    render @user
  end

  def destroy
    @user = User.find_by_username!(params[:profile_username])

    User.find(session[:user_id]).stop_following(@user) if session[:user_id] != @user.id

    render @user
  end
end
