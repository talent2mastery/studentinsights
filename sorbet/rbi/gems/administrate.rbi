# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: strong
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/administrate/all/administrate.rbi
#
# administrate-0.10.0
module Administrate
  def self.railtie_helpers_paths; end
  def self.railtie_namespace; end
  def self.railtie_routes_url_helpers(include_path_helpers = nil); end
  def self.table_name_prefix; end
  def self.use_relative_model_naming?; end
end
module Administrate::Page
end
class Administrate::Page::Base
  def attribute_field(dashboard, resource, attribute_name, page); end
  def dashboard; end
  def get_attribute_value(resource, attribute_name); end
  def initialize(dashboard, options = nil); end
  def options; end
  def resource_name; end
  def resource_path; end
end
class Administrate::Page::Form < Administrate::Page::Base
  def attributes; end
  def dashboard; end
  def initialize(dashboard, resource); end
  def page_title; end
  def resource; end
end
class Administrate::Page::Show < Administrate::Page::Base
  def attributes; end
  def initialize(dashboard, resource); end
  def page_title; end
  def resource; end
end
class Administrate::Page::Collection < Administrate::Page::Base
  def attribute_names; end
  def attribute_types; end
  def attributes_for(resource); end
  def order; end
  def order_params_for(*args, &block); end
  def ordered_by?(*args, &block); end
  def ordered_html_class(attr); end
end
class Administrate::Order
  def apply(relation); end
  def attribute; end
  def belongs_to_attribute?(relation); end
  def direction; end
  def has_many_attribute?(relation); end
  def initialize(attribute = nil, direction = nil); end
  def opposite_direction; end
  def order_by_association(relation); end
  def order_by_count(relation); end
  def order_by_id(relation); end
  def order_params_for(attr); end
  def ordered_by?(attr); end
  def reflect_association(relation); end
  def reversed_direction_param_for(attr); end
end
class Administrate::ResourceResolver
  def controller_path; end
  def controller_path_parts; end
  def dashboard_class; end
  def initialize(controller_path); end
  def model_path_parts; end
  def namespace; end
  def resource_class; end
  def resource_class_name; end
  def resource_name; end
  def resource_title; end
end
class Administrate::Search
  def association_search?(attribute); end
  def attribute_types; end
  def column_to_query(attr); end
  def initialize(scoped_resource, dashboard_class, term); end
  def query; end
  def query_table_name(attr); end
  def resolver; end
  def run; end
  def search_attributes; end
  def search_terms; end
  def tables_to_join; end
  def term; end
end
class Administrate::Namespace
  def all_routes; end
  def initialize(namespace); end
  def namespace; end
  def resources; end
  def routes; end
end
class Administrate::Namespace::Resource
  def initialize(namespace, resource); end
  def name; end
  def namespace; end
  def path; end
  def resource; end
  def to_s; end
  def to_sym; end
end
class Administrate::Engine < Rails::Engine
  def self.add_javascript(script); end
  def self.add_stylesheet(stylesheet); end
  def self.javascripts; end
  def self.stylesheets; end
end
module Administrate::Field
end
class Administrate::Field::Deferred
  def ==(other); end
  def deferred_class; end
  def html_class(*args, &block); end
  def initialize(deferred_class, options = nil); end
  def new(*args); end
  def options; end
  def permitted_attribute(attr, _options = nil); end
  def searchable?; end
  def searchable_field; end
end
class Administrate::Field::Base
  def attribute; end
  def data; end
  def html_class; end
  def initialize(attribute, data, page, options = nil); end
  def name; end
  def options; end
  def page; end
  def resource; end
  def self.field_type; end
  def self.html_class; end
  def self.permitted_attribute(attr, _options = nil); end
  def self.searchable?; end
  def self.with_options(options = nil); end
  def to_partial_path; end
end
class Administrate::Field::Associative < Administrate::Field::Base
  def associated_class; end
  def associated_class_name; end
  def associated_dashboard; end
  def display_associated_resource; end
  def foreign_key; end
  def primary_key; end
end
class Administrate::Field::BelongsTo < Administrate::Field::Associative
  def associated_resource_options; end
  def candidate_resources; end
  def display_candidate_resource(resource); end
  def permitted_attribute; end
  def selected_option; end
  def self.permitted_attribute(attr, _options = nil); end
end
class Administrate::Field::Boolean < Administrate::Field::Base
  def to_s; end
end
class Administrate::Field::DateTime < Administrate::Field::Base
  def date; end
  def datetime; end
  def format; end
  def timezone; end
end
class Administrate::Field::Email < Administrate::Field::Base
  def self.searchable?; end
end
class Administrate::Field::HasMany < Administrate::Field::Associative
  def associated_collection; end
  def associated_resource_options; end
  def attribute_key; end
  def candidate_resources; end
  def data; end
  def direction; end
  def display_candidate_resource(resource); end
  def includes; end
  def limit; end
  def more_than_limit?; end
  def order; end
  def permitted_attribute; end
  def resources(page = nil); end
  def selected_options; end
  def self.permitted_attribute(attr, _options = nil); end
  def sort_by; end
end
class Administrate::Field::HasOne < Administrate::Field::Associative
  def nested_form; end
  def resolver; end
  def self.permitted_attribute(attr, options = nil); end
end
class Administrate::Field::Number < Administrate::Field::Base
  def decimals; end
  def format_string; end
  def prefix; end
  def suffix; end
  def to_s; end
  def value; end
end
class Administrate::Field::Polymorphic < Administrate::Field::BelongsTo
  def associated_dashboard(klass = nil); end
  def associated_resource_grouped_options; end
  def candidate_resources_for(klass); end
  def classes; end
  def display_candidate_resource(resource); end
  def order; end
  def permitted_attribute; end
  def selected_global_id; end
  def self.permitted_attribute(attr, _options = nil); end
end
class Administrate::Field::Select < Administrate::Field::Base
  def collection; end
  def selectable_options; end
  def self.searchable?; end
end
class Administrate::Field::String < Administrate::Field::Base
  def self.searchable?; end
  def truncate; end
  def truncation_length; end
end
class Administrate::Field::Text < Administrate::Field::Base
  def self.searchable?; end
  def truncate; end
  def truncation_length; end
end
class Administrate::Field::Time < Administrate::Field::Base
end
class Administrate::Field::Password < Administrate::Field::Base
  def character; end
  def self.searchable?; end
  def truncate; end
  def truncation_length; end
end
class Administrate::BaseDashboard
  def association_includes; end
  def attribute_not_found_message(attr); end
  def attribute_type_for(attribute_name); end
  def attribute_types; end
  def attribute_types_for(attribute_names); end
  def collection_attributes; end
  def display_resource(resource); end
  def form_attributes; end
  def permitted_attributes; end
  def show_page_attributes; end
  include Administrate
end
