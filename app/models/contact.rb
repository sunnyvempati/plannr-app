class Contact < ActiveRecord::Base
  acts_as_tenant :company
  belongs_to :owner, class_name: "User"
  enum contact_type: {client: 1, vendor: 2}
  validates :name,
            :presence => true
  validates_format_of :email,
                      :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i,
                      :message => 'must be an email address',
                      :allow_blank => true
  validates_uniqueness_of :email, scope: :company_id, message: 'must be unique to your company'

  def contact_type
    read_attribute(:contact_type).to_s
  end

  def contact_type= (value)
    write_attribute(:contact_type, value.to_i)
  end

end
