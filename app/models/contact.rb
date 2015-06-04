class Contact < ActiveRecord::Base
  include ContactTypes
  EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  US_PHONE_REGEX = %r{\A(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?\z}
  SEARCH_LIMIT = 5
  has_many :comments, as: :commentable
  has_many :event_contacts
  has_many :events, through: :event_contacts
  belongs_to :vendor

  belongs_to :owner, class_name: "User"

  acts_as_tenant :company

  scope :not_in, ->(event_id) {
      where("id not in (select contact_id from event_contacts where event_id = '#{event_id}')")
  }

  scope :search_not_in, ->(event_id, term) {
    wildcard_text = "'%#{term}%'"
    Contact.not_in(event_id)
      .where("lower(contacts.name) LIKE lower(#{wildcard_text})")
      .limit(5)
  }

  scope :search_clients, ->(term) {
    wildcard_text = "'%#{term.downcase}%'"
    where("lower(contacts.name) LIKE lower(#{wildcard_text})
        AND contacts.category = 1")
    .limit(5)
  }

  scope :search, ->(term) {
    wildcard_text = "'%#{term.downcase}%'"
    where("lower(contacts.name) LIKE lower(#{wildcard_text})")
  }

  validates :category, inclusion: { in: [CLIENT, VENDOR] }, allow_nil: true
  validates :name, :presence => true
  validates_format_of :email,
                      :with => EMAIL_REGEX,
                      :message => 'must be an email address',
                      :allow_blank => true
  validates_format_of :phone,
                      :with => US_PHONE_REGEX,
                      :message => 'must be a phone number in [1-]999-999-9999 [x9999] format',
                      :allow_blank => true
  validates_uniqueness_to_tenant :email, allow_blank: true, allow_nil: true,   message: 'this email already exists in your company'

  validates_presence_of :vendor, :if => "category==#{VENDOR}"
  validates :vendor, absence: true, :if => "category==#{CLIENT}"

  def self.quick_create(text)
    text.index(EMAIL_REGEX) ? new(name: text, email:text) : new(name:text)
  end
end
