class Vendor < ActiveRecord::Base
  acts_as_tenant :company

  has_many :event_vendors
  has_many :events, through: :event_vendors
  belongs_to :owner, class_name: 'User'

  # scopes
  scope :not_in, ->(event_id) {
    joins('LEFT OUTER JOIN event_vendors ev ON ev.vendor_id = vendors.id')
      .where("ev.vendor_id IS NULL
        OR ev.event_id != '#{event_id}'")
      .select('vendors.*')
  }

  scope :search_not_in, ->(event_id, term) {
    wildcard_text = "'%#{term}%'"
    Vendor.not_in(event_id)
      .where("vendors.name LIKE #{wildcard_text}")
      .limit(5)
  }

  # TODO: case sensitivity in name
  scope :name_like, ->(name) { where('lower(vendors.name) LIKE ? ', name) }

  validates :name, presence: true
  validates_format_of :phone,
                      :with => %r{\A(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?\z},
                      :message => 'must be a phone number in [1-]999-999-9999 [x9999] format',
                      :allow_blank => true

end

