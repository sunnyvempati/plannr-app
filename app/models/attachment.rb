class Attachment < ActiveRecord::Base
  after_save :update_for_uploaded_file
  after_destroy :update_for_destroyed_file

  acts_as_tenant :company
  mount_uploader :file_link, AttachmentFileUploader

  belongs_to :event
  belongs_to :owner, class_name: "User"

  validate :company_limit, :on => :create

  scope :with_event_id, lambda { |event_id|
    where(event_id: event_id)
  }

  scope :search_query, lambda { |query|
    return nil  if query.blank?
    terms = query.downcase.split(/\s+/)
    terms = terms.map do |e|
      '%' + e + '%'
    end
    num_or_conditions = 2
    where(
      terms.map do
        or_clauses = [
          'LOWER(attachments.file_name) LIKE ?',
          'LOWER(attachments.description) LIKE ?'
        ].join(' OR ')
        "(#{ or_clauses })"
      end.join(' AND '),
      *terms.map { |e| [e] * num_or_conditions }.flatten
    )
  }

  scope :sorted_by, lambda { |sort_option|
    # extract the sort direction from the param value.
    direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
    case sort_option.to_s
    when /^file_name_/
      order("LOWER(attachments.file_name) #{ direction }")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  }

  def self.default_filter_options
    {
      sorted_by: 'name_desc'
    }
  end

  def self.filter_sort_scopes
    %w(
      sorted_by
      search_query
      with_event_id
    )
  end

  filterrific default_filter_params: default_filter_options,
              available_filters: filter_sort_scopes

  def company_limit
    # TODO: need to make sure to check company limit against status
    # attachment_status = company.attachment_status
    # attachment_limit = company.attachment_limit

    # if attachment_status != nil
    #   if attachment_status.put_count > attachment_limit.put_count
    #     errors.add(:file_attachment, 'company is over upload count limit')
    #   end

    #   if attachment_status.space_count > attachment_limit.space_count
    #     errors.add(:file_attachment, 'company is over upload space limit')
    #   end
    # end
  end

  private

  def attachment_status
    AttachmentStatus.where(company: company).first
  end

  MEGABYTE = 1024.0 * 1024.0

  def update_for_uploaded_file
    status = attachment_status
    status.space_count += (file_link.file.size / MEGABYTE).round(4)
    status.put_count += 1
    status.save!
  end

  def update_for_destroyed_file
    status = attachment_status
    status.space_count -= (file_link.file.size / MEGABYTE).round(4)
    status.save!
  end
end
