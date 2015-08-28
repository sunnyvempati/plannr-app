class AttachmentsController < ApplicationController
  include FilterSort
  before_action :authenticate_user

  def index
    @attachments = @filter_sort.find.page(params[:page])
    render_success @attachments
  end

  def new
    @attachment = Attachment.new
  end

  def create
    # get company attachment status (size)
    # get file size of the to-be created attachment
    # do a check
    # if all good - create
    # once you create, update company attachment status
    # if not - error
    @attachment = Attachment.new(attachment_params)
    render_entity @attachment
  end

  def destroy
    render_success if @attachment.destroy
  end

  def mass_delete
    render_success Attachment.destroy_all(id: mass_destroy_params[:ids])
  end

  private

  def attachment_params
    file_attachment = params[:file_attachment]
    return {
      file_link: file_attachment,
      file_name: file_attachment.original_filename,
      event_id: params[:event_id],
      owner: current_user
    }
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end

  def model
    Attachment
  end
end
