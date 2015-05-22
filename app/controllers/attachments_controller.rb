class AttachmentsController < ApplicationController
  before_action :authenticate_user

  def index
    @header = 'Attachments'
    @attachments = Attachment.all
    respond_to do |format|
      format.html
      format.json { render json: @attachments}
    end
  end

  def new
    @attachment = Attachment.new
  end

  def create
    @attachment = Attachment.new(event_id: attachment_params[:event_id], description: attachment_params[:description], file_name: attachment_params[:file_attachment][:file_name], file_link: attachment_params[:file_attachment][:file_contents])

    # render_entity @attachment do
    #   redirect_to session[:return_to] || attachments_path, notice: "The attachment #{@attachment.file_name} has been uploaded."
    #   return
    # end
    if @attachment.save
      redirect_to session[:return_to] || attachments_path, notice: "The attachment #{@attachment.file_name} has been uploaded."
    else
      render "new"
    end
  end

  def destroy
    @attachment = Attachment.find(params[:id])
    if @attachment.destroy
      redirect_to attachments_path, notice:  "The attachment #{@attachment.name} has been deleted."
    end
  end

  def quick_create
    @attachment = Attachment.quick_create(attachment_params)

    render_entity @attachment
  end

  def event_attachments
    order = sort_params ? "#{sort_params[:entity]} #{sort_params[:order]}" : 'name asc'
    render json: Event.find_by_id(params[:event_id]).attachments
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
      .permit(:event_id,  :description, file_attachment: [:file_contents, :file_name])
  end

  def quick_create_params
    params.require(:quick_create)
      .permit(:event_id,  :description, file_attachment: [:file_contents, :file_name])
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
