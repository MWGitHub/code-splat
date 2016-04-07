class User < ActiveRecord::Base

	include PgSearch
	multisearchable against: :username

  attr_reader :password

  validates :username, :password_digest, :score, presence: true
  validates :username, length: { minimum: 1 }
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, :email, uniqueness: true, allow_blank: true, allow_nil: true

  has_many :projects, foreign_key: :author_id
  has_many :source_files, foreign_key: :author_id
  has_many(
    :contributions,
    class_name: 'TextChange',
    foreign_key: :author_id
  )

	has_many :session_providers

  def is_password?(unencrypted)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted)
  end

  def password=(unencrypted)
    if unencrypted.present?
      @password = unencrypted
      self.password_digest = BCrypt::Password.create(unencrypted)
    end
  end

	def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    user = SessionProvider.find_user_by_provider(provider, uid)
    return user if user

    user = User.create!(
			password_digest: BCrypt::Password.create(SecureRandom::urlsafe_base64(16)),
      username: generate_unique_username(auth_hash[:extra][:raw_info][:name].underscore.gsub(' ', '_'))
    )
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user.try(:is_password?, password) ? user : nil
  end

  def self.find_by_email(email, password)
    user = User.find_by(email: email)
    user.try(:is_password?, password) ? user : nil
	end


	private
	def self.generate_unique_username(front)
		username = ''
		loop do
			username = "#{front}_#{rand(999999)}"
			user = User.find_by(username: username)
			break unless user
		end
		username
	end
end
