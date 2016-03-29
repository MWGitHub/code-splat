class Api::SessionsController < ApplicationController
  def create
    session = session_params
    @user = User.find(
      username: session[:username],
      password: password[:password]
    )

    if @user
      sign_in(@user)
      render '/api/users/user', user: @user, show_session: true
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
