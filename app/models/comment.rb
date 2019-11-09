class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :article

  validates :body, presence: true, allow_blank: false

  def as_json(options = {})
    super(include: { user: { except: [:google_token, :google_refresh_token] }})
  end
end
