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
    @current_user ||= SessionProvider.find_user_by_token(session[:token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in!(user, provider = SessionProvider::PROVIDER[:password])
    @current_user = user
		provider = SessionProvider.create_session_token(user)
    session[:token] = provider[:identifier]
  end

  def sign_out!
		SessionProvider.remove_token(current_user, session[:token])
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
