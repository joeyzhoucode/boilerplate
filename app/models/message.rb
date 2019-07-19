class Message < ApplicationRecord
  belongs_to :theatre
  belongs_to :user, foreign_key: 'user_id'

  validates_presence_of :content

  after_create_commit { MessageBroadcastJob.perform_later(self) }
end
