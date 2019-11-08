class ArticlesController < ApplicationController
  def index
    @articles = Article.all.includes(:user)
    @articles = @articles.order(created_at: :desc).offset(params[:offset] || 0).limit(params[:limit] || 20)

    @articles = @articles.tagged_with(params[:tag]) if params[:tag].present?
    @articles = @articles.authored_by(params[:author]) if params[:author].present?
    @articles = @articles.favorited_by(params[:favorited]) if params[:favorited].present?

    @articles_count = @articles.count

    render json: { articles: @articles.as_json, articles_count: @articles_count }
  end

  def feed
    @articles = Article.includes(:user).where(user: User.find(session[:user_id]).following_users)

    @articles_count = @articles.count

    @articles = @articles.order(created_at: :desc).offset(params[:offset] || 0).limit(params[:limit] || 20)

    render json: { articles: @articles.as_json, articles_count: @articles_count }
  end

  def create
    @article = Article.new(article_params)
    @article.user = User.find(session[:user_id])

    if @article.save
      render json: { article: @article }
    else
      render json: { errors: @article.errors }, status: :unprocessable_entity
    end
  end

  def show
    render json: { article: Article.find_by_slug!(params[:slug]) }
  end

  def update
    @article = Article.find_by_slug!(params[:slug])

    if @article.user_id == session[:user_id]
      @article.update_attributes(article_params)

      render json: { article: @articles.as_json }
    else
      render json: { errors: { article: ['not owned by user'] } }, status: :forbidden
    end
  end

  def destroy
    @article = Article.find_by_slug!(params[:slug])

    if @article.user_id == session[:user_id]
      @article.destroy

      render json: {}
    else
      render json: { errors: { article: ['not owned by user'] } }, status: :forbidden
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :body, :description, tag_list: [])
  end
end
