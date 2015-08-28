class Admin::ReportController < Admin::ApplicationController

  def users
    @users = User
             .joins(:profile, :company)
             .order('companies.name', 'profiles.last_name')
  end

  def companies
    @companies =
      Company
      .joins(join_count_clause('events'))
      .joins(join_count_clause('tasks'))
      .joins(join_count_clause('contacts'))
      .joins(join_count_clause('vendors'))
      .joins(join_count_clause('attachments'))
      .joins(join_count_clause('users'))
      .select('companies.*')
      .select('users.count AS user_count')
      .select('events.count AS event_count')
      .select('tasks.count AS task_count')
      .select('contacts.count AS contact_count')
      .select('vendors.count AS vendor_count')
      .select('attachments.count AS attachment_count')
  end

  private

  def join_count_clause(table)
    "LEFT JOIN (
           SELECT company_id, COUNT(*) AS count
           FROM #{table}
           GROUP BY company_id
         ) #{table} ON #{table}.company_id = companies.id"
  end
end
