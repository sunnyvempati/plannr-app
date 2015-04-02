class Contact < ActiveRecord::Base
  VENDOR = 'vendor'
  CLIENT = 'client'

  validates :name, presence: true
  validate :contact_contact_type
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :message => 'is an invalid email address', :allow_blank => true

  def contact_contact_type
    if contact_type && (contact_type != CLIENT  && contact_type != VENDOR)
        errors.add(:contact_type, 'must be ' + CLIENT + ', ' + VENDOR + ', or [blank]');
    end
  end


end
