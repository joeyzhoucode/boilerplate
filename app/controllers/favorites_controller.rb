class FavoritesController < ApplicationController
  before_action :find_article!

  def create
    User.find(session[:user_id]).favorite(@article)

    render json: { article: @article }
  end

  def destroy
    User.find(session[:user_id]).unfavorite(@article)

    render json: { article: @article }
  end

  private

  def find_article!
    @article = Article.find_by(slug: params[:article_slug])
  end
end
