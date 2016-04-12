class Api::UsersController < ApplicationController
  def create
    @user = User.create(user_params)
    if @user.valid?
      sign_in!(@user, SessionProvider::PROVIDER[:password], @user.id)
      render :create
    else
      p @user.errors.to_hash(true)
      render json: @user.errors.as_json, status: :unprocessable_entity
    end
  end

  def update
    @user = User.update!(update_params)
    render :create
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def update_params
    params.require(:user).permit(:email, :password)
  end
end
