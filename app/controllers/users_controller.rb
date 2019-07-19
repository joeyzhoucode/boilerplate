class UsersController < ApplicationController
  def show
    user_id = params[:id] || request.session[:user_id]
    render json: User.select(:id, :first_name, :last_name, :email, :image).find(user_id)
  end
end
