class Contact < ActiveRecord::Base
  VENDOR = 'vendor'
  CLIENT = 'client'

  before_validation :convert_contact_type_to_lowercase

  validates :name,
            :presence => true
  validates_format_of :email,
                      :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i,
                      :message => 'is an invalid email address',
                      :allow_blank => true
  validates_inclusion_of :contact_type,
                         :in => [CLIENT, VENDOR],
                         :message => 'must be ' + CLIENT + ', ' + VENDOR + ', or [blank]',
                         :allow_blank => true

  def convert_contact_type_to_lowercase
    self.contact_type = contact_type.downcase
  end
end
