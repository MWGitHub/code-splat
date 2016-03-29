class Api::UsersController < ApplicationController
  def create
    @user = User.create!(user_params)
    render :create
  end

  def update
    @user = User.update!(update_params)
    render :create
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

  def update_params
    params.require(:user).permit(:password)
  end
end
