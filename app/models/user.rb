class User < ActiveRecord::Base
  acts_as_authentic  # authlogic
  acts_as_tenant :company

  has_one :profile
  has_many :events

  # scopes
  scope :search_with, ->(term) {
    wildcard_text = "'%#{term.downcase}%'"
    joins(
      'INNER JOIN profiles p ON p.user_id = users.id')
      .where("lower(p.first_name || ' ' || p.last_name) LIKE lower(#{wildcard_text})")
      .select('users.*, p.first_name, p.last_name')
      .limit(5)
  }

  def deliver_password_reset_instructions!
    reset_perishable_token!
    UserMailer.reset_password_instructions(self).deliver_now
  end

  def company_admin?
    company_admin
  end
end
