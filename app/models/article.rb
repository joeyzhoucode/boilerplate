class Article < ActiveRecord::Base
  belongs_to :user
  has_many :favorites, dependent: :destroy
  has_many :comments, dependent: :destroy

  scope :authored_by, ->(id) { where(user: User.where(id: id)) }
  scope :favorited_by, -> (id) { joins(:favorites).where(favorites: { user: User.where(id: id) }) }

  acts_as_taggable

  validates :title, presence: true, allow_blank: false
  validates :body, presence: true, allow_blank: false
  validates :slug, uniqueness: true, exclusion: { in: ['feed'] }

  has_many :articles, dependent: :destroy

  before_validation do
    self.slug ||= "#{title.to_s.parameterize}-#{rand(36**6).to_s(36)}"
  end

  def as_json(options = {})
    super(include: :user)
  end
end
