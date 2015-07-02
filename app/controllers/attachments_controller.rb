class AttachmentsController < ApplicationController
  before_action :authenticate_user

  def index
    @attachments = Attachment.find(event_id: params[:event_id])
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
    @attachment.event_id = params[:event_id]

    render_entity @attachment
  end

  def destroy
    render_success if @attachment.destroy
  end

  def event_attachments
    order = sort_params ? "#{sort_params[:entity]} #{sort_params[:order]}" : 'file_name asc'
    render json: Attachment.where(event_id: params[:event_id]).order(order)
  end

  def search_in_events
    search_results = Attachment.search_in_event(params[:event_id], search_params[:text])
    render_success search_results
  end

  def mass_destroy
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

  # TODO: sort mixin
  def sort_params
    params.require(:sort).permit(:entity, :order) if params[:sort]
  end

  # TODO: search mixin
  def search_params
    params.require(:search).permit(:text)
  end

  # TODO: mass destroy mixin
  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end
end
