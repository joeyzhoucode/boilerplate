class CreateGroupsUsersJoinTable < ActiveRecord::Migration[5.2]
  def up
    create_table :groups_users, :id => false do |t|
      t.belongs_to :group, index: true
      t.belongs_to :user, index: true
    end
  end

  def down
    drop_table :groups_users
  end
end
