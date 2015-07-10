class TasksController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def index
    @filter_sort = initialize_filterrific(
      Task,
      filter_sort_params
    ) || return

    @tasks = @filter_sort.find
    respond_to do |format|
      format.html
      format.json { render_success @tasks }
    end
  end

  def for_user
    render json: Task.includes(:assigned_to).filter(assigned_to: current_user.id, event_id: params[:event_id]).where(filter_params).order('name asc'), each_serializer: TaskWithEventSerializer
  end

  def show
    render_success @task
  end

  def new
    @task = Task.new
  end

  def edit
  end

  def create
    binding.pry
    @task = Task.new task_params
    @task.status = 1 # TODO
    render_entity @task
  end

  def update
    @task.assign_attributes task_params
    render_entity @task
  end

  def search_in_events
    search_results = Task.search_in_event(params[:event_id], search_params[:text])
    render_success search_results
  end

  def search
    render_success Task.search(search_params[:text])
  end

  def event_tasks
    order = sort_params ? "#{sort_params[:entity]} #{sort_params[:order]}" : 'name asc'
    tasks = Task.event_tasks(params[:event_id])
              .where(filter_params)
              .order(order)
    render json: tasks
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def mass_destroy
    render_success Task.destroy_all(id: mass_destroy_params[:ids])
  end

  private

  def set_task
    @task = Task.includes(:assigned_to).find(params[:id])
  end

  def filter_sort_params
    params.require(:filter_sort).permit(Task.filter_sort_scopes) if params[:filter_sort]
  end

  def task_params
    params.require(:task).permit(:name, :deadline, :event_id, :assigned_to_id, :status, :description).merge(owner: current_user)
  end

  def search_params
    params.require(:search).permit(:text)
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end
end
