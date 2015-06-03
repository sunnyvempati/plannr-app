class Vendor < ActiveRecord::Base
  acts_as_tenant :company

  has_many :event_vendors
  has_many :events, through: :event_vendors
  belongs_to :owner, class_name: 'User'

  has_many :contacts

  scope :not_in, ->(event_id) {
    where("id not in (select vendor_id from event_vendors where event_id = '#{event_id}')")
  }

  scope :search_not_in, ->(event_id, term) {
    wildcard_text = "'%#{term}%'"
    Vendor.not_in(event_id)
    .where("lower(vendors.name) LIKE lower(#{wildcard_text})")
    .limit(5)
  }

  scope :search, ->(term) {
    wildcard_text = "'%#{term}%'"
    Vendor.where("lower(vendors.name) LIKE lower(#{wildcard_text})")
  }

  validates :name, presence: true
  validates_format_of :phone,
                      :with => %r{\A(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?\z},
                      :message => 'must be a phone number in [1-]999-999-9999 [x9999] format',
                      :allow_blank => true

end
