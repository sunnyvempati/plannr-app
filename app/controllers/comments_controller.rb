class CommentsController < ApplicationController
  before_action :find_klass
  before_action :find_comment, only: :destroy

  def index
    render_success @klass.comments
  end

  def create
    created_comment @klass.comments.create!(comment_params)
    render_success created_comment
  end

  def destroy
    render_success if @comment.destroy
  end

  private

  def comment_params
    params.require(:comment).permit(:body).merge(commenter: current_user)
  end

  def find_klass
    @klass = params[:commentable_type].capitalize.constantize
    # @commenter = klass.find(params[:commentable_id])
  end

  def find_comment
    @comment = @klass.find(params[:commentable_id])
  end
end
