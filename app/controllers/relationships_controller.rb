class RelationshipsController < ApplicationController

  def create
    relationship = current_user.relationships.new(follow_id: params[:id])
    relationship.save
    id = params[:id]
    @json = [id]
    respond_to do |format|
      format.html
      format.json
    end
  end

  def destroy
    relationship = current_user.relationships.find_by(follow_id: params[:id])
    relationship.destroy
    id = params[:id]
    @json = [id]
    respond_to do |format|
      format.html
      format.json
    end
  end
    
end
