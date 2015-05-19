class AttachmentsController < ApplicationController
  before_action :authenticate_user

  def index
    @attachments = Attachment.all
  end

  def new
    @attachment = Attachment.new
  end

  def create
    @attachment = Attachment.new(attachment_params)

    if @attachment.save
      AttachmentStatus.update_for_uploaded_file(@attachment.company, @attachment.file_attachment.file.size)
      redirect_to attachments_path, notice: "The attachment #{@attachment.name} has been uploaded."
    else
      render "new"
    end
  end

  def destroy
    @attachment = Attachment.find(params[:id])
    AttachmentStatus.update_for_destroyed_file(@attachment.company, @attachment.file_attachment.file.size)
    if @attachment.destroy
      redirect_to attachments_path, notice:  "The attachment #{@attachment.name} has been deleted."
    end
  end

  private
  def attachment_params
    params.require(:attachment).permit(:name, :file_attachment)
  end
end
