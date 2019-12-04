class MailgunHelper

  def self.should_use_mock?
    return true if Rails.env.development? || Rails.env.test?
    return true if ::EnvironmentVariable.is_true('USE_MOCK_MAILGUN')
    return true if !ENV.has_key?('MAILGUN_API_KEY')
    return true if !ENV.has_key?('MAILGUN_DOMAIN')
    return false
  end

  # Parse the Heroku environment variables into the URL form the Mailgun API expects
  def mailgun_url_from_env(env, options = {})
    api_key = env['MAILGUN_API_KEY']
    domain = env['MAILGUN_DOMAIN']
    if options.fetch(:validate, true)
      raise Exceptions::InvalidConfiguration unless api_key.present?
      raise Exceptions::InvalidConfiguration unless domain.present?
    end
    "https://api:#{api_key}@api.mailgun.net/v3/#{domain}/messages"
  end

  # Make a bare-bones HTML doc that is just text.
  def plain_html_from_unsafe_text(unsafe_text)
    "<html><body><pre style='font: monospace; font-size: 12px;'>#{unsafe_text}</pre></body></html>"
  end

  class Client
    # Make HTTP request and return response code only
    def post_email(mailgun_url, params = {})
      post_data = Net::HTTP.post_form(URI.parse(mailgun_url), params)
      return post_data.code.to_i
    end
  end

  # For tests and demo
  class MockClient
    # Make HTTP request and return response code only
    def post_email(mailgun_url, params = {})
      puts '>>>> logger: '
      puts logger.class
      puts logger
      logger.puts 'MailgunHelper::MockClient posted an email!'
      logger.puts "     from: #{params[:from]}"
      logger.puts "       to: #{params[:to]}"
      logger.puts "  subject: #{params[:subject]}"
      logger.puts '--------------------------'
      logger.puts params[:html]
      logger.puts '--------------------------'

      200
    end

    private
    def logger
      return STDOUT if Rails.env.development?
      return LogHelper::FakeLog.new if Rails.env.test?
      return STDOUT if PerDistrict.new.district_key == PerDistrict::DEMO
      raise 'invalid' # avoid possibly logging codes in real production site
    end
  end
end
