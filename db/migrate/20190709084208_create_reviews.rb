class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :name
      t.string :text
      t.float :longitude
      t.float :latitude
      t.timestamps
    end
  end
end
