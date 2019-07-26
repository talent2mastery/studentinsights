# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: true
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/net-ldap/all/net-ldap.rbi
#
# net-ldap-0.16.1
module Net
  def self.const_missing(name); end
end
class Net::LDAP
  def add(args); end
  def add_attribute(dn, attribute, value); end
  def auth(username, password); end
  def authenticate(username, password); end
  def base; end
  def base=(arg0); end
  def bind(auth = nil); end
  def bind_as(args = nil); end
  def connection=(connection); end
  def delete(args); end
  def delete_attribute(dn, attribute); end
  def delete_tree(args); end
  def encryption(args); end
  def get_operation_result; end
  def host; end
  def host=(arg0); end
  def hosts; end
  def hosts=(arg0); end
  def initialize(args = nil); end
  def inspect; end
  def modify(args); end
  def modify_rdn(args); end
  def new_connection; end
  def normalize_encryption(args); end
  def open; end
  def paged_searches_supported?; end
  def password_modify(args); end
  def port; end
  def port=(arg0); end
  def rename(args); end
  def replace_attribute(dn, attribute, value); end
  def search(args = nil); end
  def search_root_dse; end
  def search_subschema_entry; end
  def self.open(args); end
  def self.result2string(code); end
  def use_connection(args); end
  include Net::LDAP::Instrumentation
end
module Net::BER::BERParser
  def parse_ber_object(syntax, id, data); end
  def read_ber(syntax = nil); end
  def read_ber_length; end
end
module Net::BER::Extensions::String
  def raw_utf8_encoded; end
  def read_ber!(syntax = nil); end
  def read_ber(syntax = nil); end
  def reject_empty_ber_arrays; end
  def to_ber(code = nil); end
  def to_ber_application_string(code); end
  def to_ber_bin(code = nil); end
  def to_ber_contextspecific(code); end
end
module Net::BER::Extensions::Array
  def to_ber(id = nil); end
  def to_ber_appsequence(id = nil); end
  def to_ber_contextspecific(id = nil); end
  def to_ber_control; end
  def to_ber_oid; end
  def to_ber_seq_internal(code); end
  def to_ber_sequence(id = nil); end
  def to_ber_set(id = nil); end
end
module Net::BER::Extensions::Integer
  def to_ber; end
  def to_ber_application(tag); end
  def to_ber_enumerated; end
  def to_ber_internal; end
  def to_ber_length_encoding; end
end
module Net::BER::Extensions::TrueClass
  def to_ber; end
end
module Net::BER::Extensions::FalseClass
  def to_ber; end
end
class IO
  include Net::BER::BERParser
end
class StringIO < Data
  include Net::BER::BERParser
end
class OpenSSL::SSL::SSLSocket
  include Net::BER::BERParser
end
module Net::BER::Extensions
end
class String
  include Net::BER::BERParser
  include Net::BER::Extensions::String
end
class Array
  include Net::BER::Extensions::Array
end
class Integer < Numeric
  include Net::BER::Extensions::Integer
end
class TrueClass
  include Net::BER::Extensions::TrueClass
end
class FalseClass
  include Net::BER::Extensions::FalseClass
end
module Net::BER
  def self.compile_syntax(syntax); end
end
class Net::BER::BerError < RuntimeError
end
class Net::BER::BerIdentifiedArray < Array
  def ber_identifier; end
  def ber_identifier=(arg0); end
  def initialize(*args); end
end
class Net::BER::BerIdentifiedOid
  def ber_identifier; end
  def ber_identifier=(arg0); end
  def initialize(oid); end
  def to_arr; end
  def to_ber; end
  def to_ber_oid; end
  def to_s; end
end
class Net::BER::BerIdentifiedString < String
  def ber_identifier; end
  def ber_identifier=(arg0); end
  def initialize(args); end
end
class Net::BER::BerIdentifiedNull
  def ber_identifier; end
  def ber_identifier=(arg0); end
  def to_ber; end
end
class Net::LDAP::PDU
  def app_tag; end
  def bind_parameters; end
  def error_message; end
  def extended_response; end
  def failure?; end
  def initialize(ber_object); end
  def ldap_controls; end
  def message_id; end
  def msg_id; end
  def parse_bind_request(sequence); end
  def parse_bind_response(sequence); end
  def parse_controls(sequence); end
  def parse_extended_response(sequence); end
  def parse_ldap_result(sequence); end
  def parse_ldap_search_request(sequence); end
  def parse_search_referral(uris); end
  def parse_search_return(sequence); end
  def parse_unbind_request(sequence); end
  def result; end
  def result_code(code = nil); end
  def result_controls; end
  def result_server_sasl_creds; end
  def search_entry; end
  def search_parameters; end
  def search_referrals; end
  def status; end
  def success?; end
end
class Net::LDAP::PDU::Error < RuntimeError
end
class Net::LDAP::Filter
  def &(filter); end
  def ==(filter); end
  def coalesce(operator); end
  def execute(&block); end
  def initialize(op, left, right); end
  def match(entry); end
  def self.begins(attribute, value); end
  def self.bineq(attribute, value); end
  def self.construct(ldap_filter_string); end
  def self.contains(attribute, value); end
  def self.ends(attribute, value); end
  def self.eq(attribute, value); end
  def self.equals(attribute, value); end
  def self.escape(string); end
  def self.ex(attribute, value); end
  def self.from_rfc2254(ldap_filter_string); end
  def self.from_rfc4515(ldap_filter_string); end
  def self.ge(attribute, value); end
  def self.intersect(left, right); end
  def self.join(left, right); end
  def self.le(attribute, value); end
  def self.ne(attribute, value); end
  def self.negate(filter); end
  def self.new(*arg0); end
  def self.parse_ber(ber); end
  def self.parse_ldap_filter(obj); end
  def self.pres(attribute); end
  def self.present(attribute); end
  def self.present?(attribute); end
  def to_ber; end
  def to_raw_rfc2254; end
  def to_rfc2254; end
  def to_s; end
  def unescape(right); end
  def |(filter); end
  def ~; end
end
class Net::LDAP::Filter::FilterParser
  def filter; end
  def initialize(str); end
  def merge_branches(op, scanner); end
  def parse(scanner); end
  def parse_branches(scanner); end
  def parse_filter_branch(scanner); end
  def parse_paren_expression(scanner); end
  def self.new(*arg0); end
  def self.parse(ldap_filter_string); end
end
class Net::LDAP::Entry
  def [](name); end
  def []=(name, value); end
  def _dump(depth); end
  def attribute_names; end
  def dn; end
  def each; end
  def each_attribute; end
  def first(name); end
  def initialize(dn = nil); end
  def method_missing(sym, *args, &block); end
  def respond_to?(sym, include_all = nil); end
  def self._load(entry); end
  def self.attribute_name(name); end
  def self.from_single_ldif_string(ldif); end
  def setter?(sym); end
  def to_ldif; end
  def valid_attribute?(attr_name); end
end
class Net::LDAP::Dataset < Hash
  def comments; end
  def initialize(*args, &block); end
  def self.from_entry(entry); end
  def self.read_ldif(io); end
  def to_entries; end
  def to_ldif; end
  def to_ldif_string; end
  def value_is_binary?(value); end
  def version; end
  def version=(arg0); end
end
class InvalidName___Class_0x00___ChompedIO_37
  def gets; end
  def initialize(io); end
end
class Net::LDAP::Password
  def self.generate(type, str); end
end
module Net::LDAP::Instrumentation
  def instrument(event, payload = nil); end
  def instrumentation_service; end
end
class Net::LDAP::Connection
  def add(args); end
  def bind(auth); end
  def close; end
  def delete(args); end
  def encode_sort_controls(sort_definitions); end
  def initialize(server = nil); end
  def message_queue; end
  def modify(args); end
  def next_msgid; end
  def open_connection(server); end
  def password_modify(args); end
  def prepare_socket(server, timeout = nil); end
  def queued_read(message_id); end
  def read(syntax = nil); end
  def rename(args); end
  def search(args = nil); end
  def self.modify_ops(operations); end
  def self.wrap_with_ssl(io, tls_options = nil, timeout = nil); end
  def setup_encryption(args, timeout = nil); end
  def socket; end
  def socket_class=(socket_class); end
  def write(request, controls = nil, message_id = nil); end
  include Net::LDAP::Instrumentation
end
module Net::LDAP::Connection::GetbyteForSSLSocket
  def getbyte; end
end
module Net::LDAP::Connection::FixSSLSocketSyncClose
  def close; end
end
class Net::LDAP::Connection::DefaultSocket
  def self.new(host, port, socket_opts = nil); end
end
class Net::LDAP::LdapError < StandardError
  def message; end
end
class Net::LDAP::Error < StandardError
end
class Net::LDAP::AlreadyOpenedError < Net::LDAP::Error
end
class Net::LDAP::SocketError < Net::LDAP::Error
end
class Net::LDAP::ConnectionRefusedError < Net::LDAP::Error
  def initialize(*args); end
  def message; end
  def warn_deprecation_message; end
end
class Net::LDAP::ConnectionError < Net::LDAP::Error
  def initialize(errors); end
  def self.new(errors); end
end
class Net::LDAP::NoOpenSSLError < Net::LDAP::Error
end
class Net::LDAP::NoStartTLSResultError < Net::LDAP::Error
end
class Net::LDAP::NoSearchBaseError < Net::LDAP::Error
end
class Net::LDAP::StartTLSError < Net::LDAP::Error
end
class Net::LDAP::EncryptionUnsupportedError < Net::LDAP::Error
end
class Net::LDAP::EncMethodUnsupportedError < Net::LDAP::Error
end
class Net::LDAP::AuthMethodUnsupportedError < Net::LDAP::Error
end
class Net::LDAP::BindingInformationInvalidError < Net::LDAP::Error
end
class Net::LDAP::NoBindResultError < Net::LDAP::Error
end
class Net::LDAP::SASLChallengeOverflowError < Net::LDAP::Error
end
class Net::LDAP::SearchSizeInvalidError < Net::LDAP::Error
end
class Net::LDAP::SearchScopeInvalidError < Net::LDAP::Error
end
class Net::LDAP::ResponseTypeInvalidError < Net::LDAP::Error
end
class Net::LDAP::ResponseMissingOrInvalidError < Net::LDAP::Error
end
class Net::LDAP::EmptyDNError < Net::LDAP::Error
end
class Net::LDAP::HashTypeUnsupportedError < Net::LDAP::Error
end
class Net::LDAP::OperatorError < Net::LDAP::Error
end
class Net::LDAP::SubstringFilterError < Net::LDAP::Error
end
class Net::LDAP::SearchFilterError < Net::LDAP::Error
end
class Net::LDAP::BERInvalidError < Net::LDAP::Error
end
class Net::LDAP::SearchFilterTypeUnknownError < Net::LDAP::Error
end
class Net::LDAP::BadAttributeError < Net::LDAP::Error
end
class Net::LDAP::FilterTypeUnknownError < Net::LDAP::Error
end
class Net::LDAP::FilterSyntaxInvalidError < Net::LDAP::Error
end
class Net::LDAP::EntryOverflowError < Net::LDAP::Error
end
class Net::LDAP::AuthAdapter
  def bind; end
  def initialize(conn); end
  def self.[](name); end
  def self.register(names, adapter); end
end
class Net::LDAP::AuthAdapter::Simple < Net::LDAP::AuthAdapter
  def bind(auth); end
end
class Net::LDAP::AuthAdapter::Sasl < Net::LDAP::AuthAdapter
  def bind(auth); end
end
module Net::LDAP::LDAPControls
end
