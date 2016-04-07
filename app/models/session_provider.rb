class SessionProvider < ActiveRecord::Base
	PROVIDER = {
		password: 'PASSWORD'
	}

	validates :user_id, :provider, :identifier, :token, presence: true
	validates :token, uniqueness: true

	belongs_to :user

	def self.is_already_registered?(user, provider, identifier)
		SessionProvider.where('user_id != ?', user.id).where(provider: :provider, identifier: :identifier).exists?
	end

	def self.remove_all_tokens(user_id)
		results = SessionProvider.where(
			user_id: user_id
		)
		results.destroy
	end

	def self.remove_all_password_tokens(user_id)
		results = SessionProvider.where(
			provider: PROVIDER[:password],
			user_id: user_id
		)
		results.destroy
	end

	def self.remove_session_provider(provider, identifier)
		providers = SessionProvider.where(
			provider: provider,
			identifier: identifier
		)
		providers.destroy
	end

	def self.create_session_token(user, provider, identifier)
		# Make sure provider identifier is not already registered with another user
		if is_already_registered?(user, provider, identifier)
			raise 'User already registered to another provider'
		end

		user.session_providers.create(
			provider: provider,
			identifier: identifier,
			token: generate_unique_token
		)
	end

	def self.generate_unique_token
		token = nil
    loop do
      token = SecureRandom::urlsafe_base64(16)
      provider = SessionProvider.exists?(token: token)
      break unless provider
    end
    token
	end

	def self.find_user_by_token(token)
		provider = SessionProvider.find_by(token: token)
		if provider
			provider.user
		else
			nil
		end
	end

	def self.remove_token(token)
		SessionProvider.find_by(token: token).destroy
	end

	def self.find_user_by_provider(provider, identifier)
		result = SessionProvider.find_by(
			provider: provider,
			identifier: identifier
		)
		if result
			result.user
		else
			nil
		end
	end
end
