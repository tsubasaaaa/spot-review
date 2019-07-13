class ReviewsController < ApplicationController
  def index
  end

  def new
    @review = Review.new
  end
  
  def create
    @review = Review.new(review_params)
    
    if @review.save
      redirect_to root_path
    else
      redirect_to new_item_path
    end
  end

  private
  def review_params
    params.require(:review).permit(
    :name,
    :text,
    :longitude,
    :latitude,
    :address).merge(user_id: current_user.id)
  end

end
