class Review < ApplicationRecord
  belongs_to :user,optional: true
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images
  has_many :likes, dependent: :destroy
  has_many :liking_users, through: :likes, source: :user
end
