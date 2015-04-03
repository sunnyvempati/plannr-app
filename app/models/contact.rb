class Contact < ActiveRecord::Base
  enum contact_type: {client: 1, vendor: 2}

  validates :name,
            :presence => true
  validates_format_of :email,
                      :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i,
                      :message => 'is an invalid email address',
                      :allow_blank => true

  def contact_type
    read_attribute(:contact_type).to_s
  end

  def contact_type= (value)
    write_attribute(:contact_type, value.to_i)
  end

end