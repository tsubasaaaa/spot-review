class ReviewsController < ApplicationController

  before_action :set_review, only: [:show, :edit, :update, :destroy] 

  def index
    @reviews = Review.all
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

  def list
    @reviews = Review.where(user_id: current_user.id)
  end

  def show
  end

  def edit
  end

  def update
    if @review.update(review_params)
      redirect_to review_path(@review)
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

  def set_review
    @review = Review.find(params[:id])
  end
end
