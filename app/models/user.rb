class User < ApplicationRecord
  has_and_belongs_to_many :groups, dependent: :destroy

  validates :email, presence: true, uniqueness: true

  has_many :articles, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :comments, dependent: :destroy

  acts_as_follower
  acts_as_followable

  def self.from_omniauth(auth)
    where(email: auth.info.email).first_or_initialize do |user|
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.email = auth.info.email
      user.image = auth.info.image
    end
  end

  def favorite(article)
    favorites.find_or_create_by(article: article)

    article.reload
  end

  def unfavorite(article)
    favorites.where(article: article).destroy_all

    article.reload
  end

  def favorited?(article)
    favorites.find_by(article_id: article.id).present?
  end

  def as_json(options = {})
    super(include: [:followers])
  end
end
