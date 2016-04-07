class SessionProvider < ActiveRecord::Base
	PROVIDER = {
		password: 'PASSWORD'
	}

	validates :user_id, :provider, :identifier, presence: true

	belongs_to :user

	def self.remove_all_user_tokens(user_id)
		results = SessionProvider.where(
			provider: PROVIDER[:password],
			user_id: user_id
		)
		results.destroy
	end

	def self.remove_session_provider(provider, identifier)
		provider = SessionProvider.find_by(provider: provider, identifier: identifier)
		provider.destroy
	end

	def self.create_session_token(user)
		user.session_providers.create(
			provider: PROVIDER[:password],
			identifier: generate_unique_token
		)
	end

	def self.generate_unique_token
		token = nil
    loop do
      token = SecureRandom::urlsafe_base64(16)
      provider = SessionProvider.exists?(
				provider: PROVIDER[:password],
				identifier: token
			)
      break unless provider
    end
    token
	end

	def self.find_user_by_token(token)
		provider = SessionProvider.find_by(
			provider: PROVIDER[:password],
			identifier: token
		)
		if provider
			provider.user
		else
			nil
		end
	end

	def self.remove_token(user, token)
		return unless user

		provider = SessionProvider.find_by(
			provider: PROVIDER[:password],
			identifier: token
		).destroy
	end

	def self.find_user_by_provider(provider, identifier)
		result = SessionProvider.find_by(provider: provider, identifier: identifier)
		if result
			result.user
		else
			nil
		end
	end
end
