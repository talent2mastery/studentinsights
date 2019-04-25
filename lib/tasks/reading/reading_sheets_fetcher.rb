require 'google/apis/drive_v3'
require 'google/apis/sheets_v4'
require 'googleauth'
require 'googleauth/stores/file_token_store'
require 'fileutils'

OOB_URI = 'urn:ietf:wg:oauth:2.0:oob'.freeze
APPLICATION_NAME = 'Student Insights'.freeze
CREDENTIALS_PATH = 'credentials.json'.freeze
# The file token.yaml stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
TOKEN_PATH = 'token.yaml'.freeze
SCOPE = [Google::Apis::DriveV3::AUTH_DRIVE_READONLY, Google::Apis::SheetsV4::AUTH_SPREADSHEETS_READONLY]

##
# Ensure valid credentials, either by restoring from the saved credentials
# files or intitiating an OAuth2 authorization. If authorization is required,
# the user's default browser will be launched to approve the request.
#
# @return [Google::Auth::UserRefreshCredentials] OAuth2 credentials
def authorize
  client_id = Google::Auth::ClientId.from_file(CREDENTIALS_PATH)
  token_store = Google::Auth::Stores::FileTokenStore.new(file: TOKEN_PATH)
  authorizer = Google::Auth::UserAuthorizer.new(client_id, SCOPE, token_store)
  user_id = 'default'
  credentials = authorizer.get_credentials(user_id)
  if credentials.nil?
    url = authorizer.get_authorization_url(base_url: OOB_URI)
    puts 'Open the following URL in the browser and enter the ' \
         "resulting code after authorization:\n" + url
    code = gets
    credentials = authorizer.get_and_store_credentials_from_code(
      user_id: user_id, code: code, base_url: OOB_URI
    )
  end
  credentials
end

# Initialize the APIs

drive_service = Google::Apis::DriveV3::DriveService.new
drive_service.client_options.application_name = APPLICATION_NAME
drive_service.authorization = authorize

service = Google::Apis::SheetsV4::SheetsService.new
service.client_options.application_name = APPLICATION_NAME
service.authorization = authorize

# Get folder ID

folder_name = "Sheets imports"
folder = drive_service.list_files(q: "name = '#{folder_name}'",
                                    fields: 'files(id, name)')
folder_id = folder.files[0].id

# Get GIDs for all sheets in folder

sheets_info = drive_service.list_files(q: "'#{folder_id}' in parents",
                                  fields: 'files(id, name, properties)')

# response = drive_service.list_files(q: "parents in '1c17xHZhnVzwREt8Q8UKlnzuf9xiaQBxN'",
#                                     fields: 'nextPageToken, files(id, name)')

puts sheets_info.files.size

# sheets_info.files.each do |sheet|
#   puts sheet.properties
# end

puts 'Files:'
puts 'No files found' if sheets_info.files.empty?
sheets_info.files.each do |file|
  puts "#{file.name} (#{file.id}) #{file.properties}"
end

# sheets_info.files.each do |file|
#   dloaded = drive_service.export_file(file.id,
#                             'text/csv',
#                             download_dest: StringIO.new)
#   puts dloaded.string
# end