class Profile < ActiveRecord::Base
  belongs_to :user

  validates :user, uniqueness: true

  def full_name
    first_name + " " + last_name
  end
end
