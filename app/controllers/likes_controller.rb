class LikesController < ApplicationController

  def create
    like = current_user.likes.new(review_id: params[:id])
    like.save
    @review = Review.find(params[:id])
    count = @review.likes.count
    id = params[:id]
    @json = [count,id]
    # binding.pry
    respond_to do |format|
      format.html
      format.json
    end
  end

  def destroy
    like = current_user.likes.find_by(review_id: params[:id])
    like.destroy
    @review = Review.find(params[:id])
    count = @review.likes.count
    id = params[:id]
    @json = [count,id]
    respond_to do |format|
      format.html
      format.json
    end
  end
end
