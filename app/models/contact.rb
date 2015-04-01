class Contact < ActiveRecord::Base

  validates :name, presence: true

  validate :contact_contact_type

  def contact_contact_type
    if contact_type && (contact_type != 'client' && contact_type != 'vendor')
        errors.add(:contact_type, 'must be client, vendor, or [blank]');
    end
  end


end
