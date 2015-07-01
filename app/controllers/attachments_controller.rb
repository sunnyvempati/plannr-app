require 'attachment_with_status'
class AttachmentsController < ApplicationController
  before_action :authenticate_user

  def index
    @attachments = Attachment.all
    respond_to do |format|
      format.html
      format.json { render :json => @attachments.collect { |p| p.to_jq_upload }.to_json }
    end
  end

  def new
    @attachment = Attachment.new
  end

  def create
    @attachment = Attachment.new(attachment_params)
    @attachment.event_id = params[:event_id]
    attachment_with_status = AttachmentWithStatus.new(@attachment)

    if attachment_with_status.save
      render json: attachment_with_status.attachment
    else
      render_error
    end
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
