require 'attachment_with_status'
class AttachmentsController < ApplicationController
  before_action :authenticate_user

  def index
    @header = 'Attachments'
    @attachments = Attachment.all
    respond_to do |format|
      format.html
      format.json { render json: @attachments }
    end
  end

  def new
    @attachment = Attachment.new
  end

  def create
    @attachment = AttachmentWithStatus.new(Attachment.new(attachment_params))
    render_entity @attachment
  end

  def destroy
    @attachment = AttachmentWithStatus.new(Attachment.find(params[:id]))
    if @attachment.destroy
      redirect_to attachments_path, notice: "The attachment #{@attachment.name} has been deleted."
    end
  end

  def event_attachments
    order = sort_params ? "#{sort_params[:entity]} #{sort_params[:order]}" : 'file_name asc'
    render json: Event.find_by_id(params[:event_id]).attachments.order(order)
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
    params.require(:attachment)
      .permit(:file_name, :file_link)
      .merge(event_id: params[:event_id])
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
