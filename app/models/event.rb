# An event
class Event < ActiveRecord::Base
  include Commentable
  include Searchable
  acts_as_tenant :company

  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  # Set up Elastic Search
  mapping do
    # Company ID here to allow for tenanted filtering of search
    # set these ids not not_analyzed so that they're exact matches
    indexes :company_id, type: 'string', index: 'not_analyzed'
    indexes :client_id, type: 'string', index: 'not_analyzed'
    indexes :id, type: 'string', index: 'not_analyzed'
    indexes :owner_id, type: 'string', index: 'not_analyzed'
  end

  has_many :event_contacts, dependent: :destroy
  has_many :contacts, through: :event_contacts
  has_many :event_vendors, dependent: :destroy
  has_many :vendors, through: :event_vendors
  has_many :tasks, dependent: :destroy
  has_many :attachments, dependent: :destroy
  belongs_to :owner, class_name: "User"
  belongs_to :client, class_name: "Contact"
  belongs_to :parent, class_name: "Event"

  validates :name, presence: true
  validate :dates

  include EventStatuses
  validates :status, inclusion: { in: [ACTIVE, ARCHIVED] }

  def self.search_query(query)
    results = search(:name, query)
    results.records
  end

  def self.sorted_by(sort_option)
    # extract the sort direction from the param value.
    direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
    case sort_option.to_s
    when /^name_/
      order("LOWER(events.name) #{ direction }")
    when /^start_date_/
      order("events.start_date #{ direction }")
    else
      raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
    end
  end

  def self.with_status(status)
    where(status: status)
  end

  def copy(options)
    included_options = []
    included_options << :event_contacts if options[:contacts]
    included_options << :event_vendors if options[:vendors]
    included_options << :tasks if options[:tasks]
    included_options << :comments if options[:comments]
    cloned_event = deep_clone include: included_options
    cloned_event.parent_id = options[:parent_event_id]
    cloned_event.status = ACTIVE
    cloned_event.tasks.each do |task|
      task.deadline = nil
      task.status = TaskStatuses::TODO
      task.assigned_to_id = nil
    end
    cloned_event
    # this will create a duplicate of the instance with the above config
  end

  def self.filter_sort_scopes
    %w(
      search_query
      sorted_by
      with_status
    )
  end

  filterrific available_filters: filter_sort_scopes

  protected

  def dates
    errors.add(:start_date, "must be in the future") if start_date && start_date < Date.today
    errors.add(:end_date, "must be after start date") if end_date && start_date && start_date > end_date
  end
end
