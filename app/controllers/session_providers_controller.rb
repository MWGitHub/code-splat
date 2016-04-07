class SessionProvidersController < ApplicationController
	def provider
		# find a user who matches auth hash
		provider = auth_hash[:provider]
    uid = auth_hash[:uid]
		user = User.find_or_create_by_auth_hash(auth_hash)
		sign_in!(user, provider, uid)
		redirect_to "/"
	end

  private
  def auth_hash
    request.env['omniauth.auth']
  end
end
