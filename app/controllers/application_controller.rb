class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

	protected
	def require_permissions!(threshold)
		allowed = current_user.score >= threshold
		unless allowed
			respond_to do |format|
	      format.html do
	        flash[:error] = 'Access denied'
	        redirect_to root_url
	      end
	      format.json do
	        render json: { error: "#{threshold} required to perform the action" }, status: :unauthorized
	      end
	    end
		end
	end

  private
  def current_user
    @current_user ||= User.find_by_session_token(session[:token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    @current_user = user
    session[:token] = user.reset_session_token!
  end

  def sign_out
    current_user.try(:reset_session_token!)
    session[:token] = nil
  end

  def require_signed_in!
    return if signed_in?

    respond_to do |format|
      format.html do
        flash[:error] = 'Access denied'
        redirect_to root_url
      end
      format.json do
        render json: { error: 'Access denied' }, status: :unauthorized
      end
    end
  end
end
