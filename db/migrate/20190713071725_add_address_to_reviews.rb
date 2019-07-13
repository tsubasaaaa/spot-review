class AddAddressToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :address, :string
  end
end
