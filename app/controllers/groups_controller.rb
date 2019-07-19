require 'faker'

class GroupsController < ApplicationController
  def index
    groups = Group.all.map do |t|
      {id: t.id, name: t.name, users: t.users.size }
    end
    render json: groups
  end

  def new
    name = generateName
    while Group.exists?(name: name)
      name = generateName
    end
    render json: { name: name }
  end

  def create
    user = User.find(request.session[:user_id])
    data = JSON.parse(request.body.read())
    name = data["group_name"]
    group = Group.create!(name: name)
    group.users << user
    render json: { name: name }
  end

  def show
    render json: Group.find(params[:id])
  end

  def destroy
    Group.find(params[:id]).destroy
    groups = Group.all.map do |t|
      {id: t.id, name: t.name, users: t.users.size }
    end
    render json: groups
  end

  private

  def generateName
    "#{Faker::Verb.ing_form.humanize}#{Faker::Games::Pokemon.name.humanize}"
  end
end
