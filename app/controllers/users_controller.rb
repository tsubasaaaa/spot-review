class UsersController < ApplicationController
  def index
    @user = User.find(current_user.id)
    @total = 0
    @user.reviews.each do |review|
      if review.likes_count.present?
        @total += review.likes_count
      end
    end
  end

  def show
  end
end
