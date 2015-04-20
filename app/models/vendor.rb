class Vendor < ActiveRecord::Base
  SEARCH_LIMIT = 5

  has_many :event_vendors
  has_many :events, through: :event_vendors

  belongs_to :owner, class_name: "User"

  acts_as_tenant :company

  # TODO: case sensitivity in search_condition
  def self.search_other_vendors(params)
    wildcard_text = '%' + params[:text] + '%'
    Vendor.other_vendors(params[:event_id])
      .where('vendors.name LIKE ?', wildcard_text).limit(SEARCH_LIMIT)
  end

  def self.other_vendors(event_id)
    Vendor.joins(
      "LEFT OUTER JOIN event_vendors ec ON ec.vendor_id = vendors.id")
      .where("ec.vendor_id IS null
        OR ec.event_id != '" + event_id + "'")
      .select("vendors.*")
  end

  validates :name, presence: true
  validates_format_of :phone,
                      :with => %r{\A(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?\z},
                      :message => 'must be a phone number in [1-]999-999-9999 [x9999] format',
                      :allow_blank => true




end

