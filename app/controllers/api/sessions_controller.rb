class Api::SessionsController < ApplicationController
  def create
    session = session_params
    @user = User.find_by_credentials(session[:username], session[:password])

    if @user
      sign_in(@user)
      render :login
    end
  end

  def destroy
    sign_out
  end

  private
  def session_params
    params.require(:session).permit(:username, :password)
  end
end
