class Api::SessionsController < ApplicationController
  def show
    @user = nil
    if signed_in?
      @user = current_user
      render :login
    else
      render :json => {}
    end
  end

  def create
    session = session_params
    @user = User.find_by_credentials(session[:username], session[:password])
    @user ||= User.find_by_email(session[:username], session[:password])

    if @user
      sign_in!(@user)
      render :login
    end
  end

  def destroy
    sign_out!
    render :json => {}
  end

  private
  def session_params
    params.require(:session).permit(:username, :password)
  end
end
