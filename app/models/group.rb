class Group < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_and_belongs_to_many :users

  validates :name, presence: true, uniqueness: true, case_sensitive: false
end
