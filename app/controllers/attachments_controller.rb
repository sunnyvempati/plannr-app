class AttachmentsController < ApplicationController
  def index
    @attachments = Attachment.all

  end

  def new
    @attachment = Attachment.new
  end

  def create
    @attachment = Attachment.new(attachment_params)

    if @attachment.save
      redirect_to attachments_path, notice: "The attachment #{@attachment.name} has been uploaded."
    else
      render "new"
    end
  end

  def destroy
    @attachment = Attachment.find(params[:id])
    @attachment.destroy
    redirect_to attachments_path, notice:  "The attachment #{@attachment.name} has been deleted."
  end

  private
  def attachment_params
     params.require(:attachment).permit(:name, :file_attachment)
  end
end
