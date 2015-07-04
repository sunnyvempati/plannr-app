class CommentsController < ApplicationController
  before_action :find_commentable, except: [:destroy, :edit]
  before_action :find_comment, only: [:destroy, :edit]

  def index
    comments = @commentable.filtered_comments(current_user.id)
                           .includes(:commenter)
                           .order("created_at desc")
    render_success comments
  end

  def create
    created_comment = @commentable.comments.create!(comment_params)
    render_success created_comment
  end

  def edit
    render_success @comment if @comment.update_attributes!(comment_params)
  end

  def destroy
    render_success if @comment.destroy
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :locked).merge(commenter: current_user)
  end

  def find_commentable
    klass = params[:commentable_type].capitalize.constantize
    @commentable = klass.find(params[:commentable_id])
  end

  def find_comment
    @comment = Comment.find(params[:id])
  end
end
