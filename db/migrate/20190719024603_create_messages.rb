class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.belongs_to :group, index: true
      t.belongs_to :user, index: true

      t.text :content
      t.datetime :created

      t.timestamps
    end
  end
end
