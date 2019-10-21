class UsersController < ApplicationController
  def index
    @user = User.find(current_user.id)
    @follow = Relationship.where(user_id: @user.id)
    @follower = Relationship.where(follow_id: @user.id)
    @total = 0
    @user.reviews.each do |review|
      if review.likes_count.present?
        @total += review.likes_count
      end
    end
  end

  def show
    @user = User.find(params[:id])
    @total = 0
    @follow = Relationship.where(user_id: @user.id)
    @follower = Relationship.where(follow_id: @user.id)
    @user.reviews.each do |review|
      if review.likes_count.present?
        @total += review.likes_count
      end
    end
  end

end
