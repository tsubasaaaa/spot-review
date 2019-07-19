class Review < ApplicationRecord
  belongs_to :user,optional: true
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images
end
