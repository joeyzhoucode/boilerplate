class CommentsController < ApplicationController
  before_action :find_article!

  def index
    @comments = @article.comments.order(created_at: :desc)
    render json: { comments: @comments.as_json }
  end

  def create
    @comment = @article.comments.new(comment_params)
    @comment.user = User.find(session[:user_id])

    render json: { errors: @comment.errors }, status: :unprocessable_entity unless @comment.save
  end

  def destroy
    @comment = @article.comments.find(params[:id])

    if @comment.user_id == session[:user_id]
      @comment.destroy
      render json: {}
    else
      render json: { errors: { comment: ['not owned by user'] } }, status: :forbidden
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

  def find_article!
    @article = Article.find_by_slug!(params[:article_slug])
  end
end
