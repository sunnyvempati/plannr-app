class TasksController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_task, only: [:show, :edit, :update, :destroy]


  def index
    @tasks = Task.all
    @header = "Tasks"
  end

  def show
    @header = "Task"
  end

  # GET /tasks/new
  def new
    @task = Task.new
    @header = "Create Task"
  end

  # GET /tasks/1/edit
  def edit
    @header = "Edit Task"

  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params)
    render_entity @task
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    @task.assign_attributes(task_params)
    render_entity @task
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:task).permit(:name, :description, :deadline)
    end

end
