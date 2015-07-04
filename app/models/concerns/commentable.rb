module Commentable
  extend ActiveSupport::Concern

  included do
    has_many :comments, as: :commentable, dependent: :destroy
  end

  def filtered_comments(user_id)
    comments.where("
      (commenter_id = '#{user_id}' and locked = true) OR
      locked = false
    ")
  end
end
