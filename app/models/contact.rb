class Contact < ActiveRecord::Base
  has_many :event_contacts
  has_many :events, through: :event_contacts

  belongs_to :owner, class_name: "User"
  
  acts_as_tenant :company
  
  enum contact_type: {client: 1, vendor: 2}

  # TODO: case sensitivity in search_condition
  scope :name_or_email_like, ->(search_condition) {      where('contacts.name LIKE ? OR contacts.email LIKE ?', search_condition, search_condition)  }


  validates :name,
            :presence => true
  validates_format_of :email,
                      :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i,
                      :message => 'must be an email address',
                      :allow_blank => true
  validates_format_of :phone,
                      :with => %r{\A(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?\z},
                      :message => 'must be a phone number in [1-]999-999-9999 [x9999] format',
                      :allow_blank => true
  validates_uniqueness_to_tenant :email, allow_blank: true, allow_nil: true,   message: 'this email already exists in your company'

  def contact_type
    read_attribute(:contact_type).to_s
  end

  def contact_type= (value)
    write_attribute(:contact_type, value.to_i)
  end

end
