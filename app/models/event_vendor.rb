class EventVendor < ActiveRecord::Base
  belongs_to :vendor
  belongs_to :event

  validates :event, uniqueness: { scope: :vendor }

  scope :vendors, ->(event_id) {
    includes(:vendor)
    .joins('INNER JOIN vendors ON vendors.id = event_vendors.vendor_id')
    .where("event_id = '#{event_id}'")
  }

  scope :search, ->(event_id, term) {
    wildcard_text = "'%#{term}%'"
    vendors(event_id).where("lower(vendors.name) LIKE lower(#{wildcard_text})")
  }
end
