# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: strong
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/uber/all/uber.rbi
#
# uber-0.1.0
module Uber
end
module Uber::Delegates
  def delegates(model, *names); end
end
module Uber::Callable
end
module Uber::InheritableAttr
  def inheritable_attr(name, options = nil); end
  def self.inherit_for(klass, name, options = nil); end
end
class Uber::InheritableAttr::Clone
  def self.call(value, uncloneable = nil); end
  def self.uncloneable; end
end
