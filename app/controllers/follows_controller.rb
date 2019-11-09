class FollowsController < ApplicationController
  def create
    @user = User.find_by(id: params[:profile_user_id])

    User.find(session[:user_id]).follow(@user) if session[:user_id] != @user.id

    render json: { profile: @user }
  end

  def destroy
    @user = User.find_by(id: params[:profile_user_id])

    User.find(session[:user_id]).stop_following(@user) if session[:user_id] != @user.id

    render json: { profile: @user }
  end
end
