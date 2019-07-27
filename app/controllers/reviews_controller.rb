class ReviewsController < ApplicationController

  before_action :set_review, only: [:show, :edit, :update, :destroy] 

  def index
    @reviews = Review.all.order(created_at: :desc).limit(4)
  end

  def new
    @review = Review.new
    4.times{@review.images.build}
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
    (4 - @review.images.size).times{@review.images.new}
  end

  def update
    if @review.update(edit_params)
      if params[:images].present?
        params[:images].each do |i|
          @image = @review.images.create(image: i)
        end
      end
      if params[:delete].present?
        params[:delete].each do |i|
          @image = Image.find(i)
          @image.delete
        end
      end
      redirect_to review_path(@review)
    end
  end

  def destroy
    if @review.user_id == current_user.id
      @review.destroy
      redirect_to list_reviews_path
    else
      redirect_to root_path
    end
  end
  
  def search
    @q = Review.ransack(params[:q])
    @reviews = @q.result(distinct: true)
  end

  def search_result
    @q = Review.search(search_params)
    @reviews = @q.result(distinct: true)
  end
  
  private
  def review_params
    params.require(:review).permit(
    :name,
    :text,
    :longitude,
    :latitude,
    :address,
    images_attributes:[:image]).merge(user_id: current_user.id)
  end

  def search_params
    params.require(:q).permit!
  end

  def set_review
    @review = Review.find(params[:id])
  end
end
