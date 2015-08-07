class User < ActiveRecord::Base
  acts_as_authentic  # authlogic
  acts_as_tenant :company

  include Elasticsearch::Model

  # Set up Elastic Search
  mapping do
    indexes :name, type: 'string', index: 'analyzed'
    indexes :email, type: 'string', index: 'not_analyzed'
    # Company ID here to allow for tenanted filtering of search
    indexes :company_id, type: 'string', index: 'not_analyzed'
    indexes :id, type: 'string', index: 'not_analyzed'
  end

  def as_indexed_json(options={})
    self.as_json(methods: :name,
                 except: [
                   :crypted_password,
                   :password_salt,
                   :perishable_token,
                   :persistence_token,
                   :single_access_token])
  end

  has_one :profile
  has_many :events

  # scopes
  scope :with_search_limit, lambda { |num|
    limit(num)
  }

  scope :search_query, lambda { |query|
    return nil  if query.blank?
    wildcard_text = "'%#{query.downcase}%'"
    includes(:profile)
      .joins(
        'INNER JOIN profiles p ON p.user_id = users.id')
        .where("lower(p.first_name || ' ' || p.last_name) LIKE lower(#{wildcard_text})")
        .select('users.*, p.first_name, p.last_name')
        .limit(5)
  }

  scope :sorted_by, lambda { |sort_option|
    # extract the sort direction from the param value.
    direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
    case sort_option.to_s
    when /^first_name_/
      joins(:profile).order("LOWER(profiles.first_name) #{ direction }")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }

  def self.default_filter_options
    {
      sorted_by: 'first_name_desc'
    }
  end

  def self.filter_sort_scopes
    %w(
      sorted_by
      search_query
      with_search_limit
    )
  end

  filterrific default_filter_params: default_filter_options,
              available_filters: filter_sort_scopes

  def name
    profile.full_name
  end

  def deliver_password_reset_instructions!
    reset_perishable_token!
    UserMailer.reset_password_instructions(self).deliver_later
  end

  def deliver_verification_instructions!
    reset_perishable_token!
    UserMailer.verification_instructions(self).deliver_later
  end

  def verify!
    self.verified = true
    self.save!
    UserMailer.notify_plannr(self).deliver_later
  end

  def company_admin?
    company_admin
  end
end
