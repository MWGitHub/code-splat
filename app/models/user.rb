class User < ActiveRecord::Base
  attr_reader :password

  after_initialize :ensure_session_token

  validates :username, :password_digest, :session_token, presence: true
  validates :username, length: { minimum: 1 }
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, :username, uniqueness: true

  has_many :projects, foreign_key: "author_id"

  def is_password?(unencrypted)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted)
  end

  def password=(unencrypted)
    if unencrypted.present?
      @password = unencrypted
      self.password_digest = BCrypt::Password.create(unencrypted)
    end
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user.try(:is_password?, password) ? user : nil
  end

  def self.find_by_session_token(token)
    User.find_by(session_token: token)
  end

  def self.generate_session_token
    token = nil
    loop do
      token = SecureRandom::urlsafe_base64(16)
      user = User.exists?(session_token: token)
      break unless user
    end
    token
  end

  private
  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
