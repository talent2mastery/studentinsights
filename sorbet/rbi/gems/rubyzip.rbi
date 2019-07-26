# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: true
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/rubyzip/all/rubyzip.rbi
#
# rubyzip-1.2.2
module Zip
  def case_insensitive_match; end
  def case_insensitive_match=(arg0); end
  def continue_on_exists_proc; end
  def continue_on_exists_proc=(arg0); end
  def default_compression; end
  def default_compression=(arg0); end
  def force_entry_names_encoding; end
  def force_entry_names_encoding=(arg0); end
  def on_exists_proc; end
  def on_exists_proc=(arg0); end
  def reset!; end
  def setup; end
  def sort_entries; end
  def sort_entries=(arg0); end
  def unicode_names; end
  def unicode_names=(arg0); end
  def warn_invalid_date; end
  def warn_invalid_date=(arg0); end
  def write_zip64_support; end
  def write_zip64_support=(arg0); end
  extend Zip
end
class Zip::DOSTime < Time
  def dos_equals(other); end
  def self.parse_binary_dos_format(binaryDosDate, binaryDosTime); end
  def to_binary_dos_date; end
  def to_binary_dos_time; end
end
module Zip::IOExtras
  def self.copy_stream(ostream, istream); end
  def self.copy_stream_n(ostream, istream, nbytes); end
end
module Zip::IOExtras::AbstractInputStream
  def each(a_sep_string = nil); end
  def each_line(a_sep_string = nil); end
  def flush; end
  def gets(a_sep_string = nil, number_of_bytes = nil); end
  def initialize; end
  def lineno; end
  def lineno=(arg0); end
  def pos; end
  def read(number_of_bytes = nil, buf = nil); end
  def readline(a_sep_string = nil); end
  def readlines(a_sep_string = nil); end
  def ungetc(byte); end
  include Enumerable
  include Zip::IOExtras::FakeIO
end
module Zip::IOExtras::AbstractOutputStream
  def print(*params); end
  def printf(a_format_string, *params); end
  def putc(an_object); end
  def puts(*params); end
  def write(data); end
  include Zip::IOExtras::FakeIO
end
module Zip::IOExtras::FakeIO
  def kind_of?(object); end
end
class Zip::Entry
  def <=>(other); end
  def ==(other); end
  def calculate_local_header_size; end
  def cdir_header_size; end
  def check_c_dir_entry_comment_size; end
  def check_c_dir_entry_signature; end
  def check_c_dir_entry_static_header_length(buf); end
  def check_name(name); end
  def clean_up; end
  def comment; end
  def comment=(arg0); end
  def comment_size; end
  def compressed_size; end
  def compressed_size=(arg0); end
  def compression_method; end
  def compression_method=(arg0); end
  def crc; end
  def crc=(arg0); end
  def create_directory(dest_path); end
  def create_file(dest_path, _continue_on_exists_proc = nil); end
  def create_symlink(dest_path); end
  def data_descriptor_size; end
  def directory?; end
  def dirty; end
  def dirty=(arg0); end
  def external_file_attributes; end
  def external_file_attributes=(arg0); end
  def extra; end
  def extra=(arg0); end
  def extra_size; end
  def extract(dest_path = nil, &block); end
  def file?; end
  def file_stat(path); end
  def file_type_is?(type); end
  def filepath; end
  def follow_symlinks; end
  def follow_symlinks=(arg0); end
  def fstype; end
  def fstype=(arg0); end
  def ftype; end
  def gather_fileinfo_from_srcpath(src_path); end
  def get_extra_attributes_from_path(path); end
  def get_input_stream(&block); end
  def get_raw_input_stream(&block); end
  def gp_flags; end
  def gp_flags=(arg0); end
  def header_signature; end
  def header_signature=(arg0); end
  def initialize(*args); end
  def internal_file_attributes; end
  def internal_file_attributes=(arg0); end
  def local_entry_offset; end
  def local_header_offset; end
  def local_header_offset=(arg0); end
  def mtime; end
  def name; end
  def name=(arg0); end
  def name_is_directory?; end
  def name_safe?; end
  def name_size; end
  def next_header_offset; end
  def pack_c_dir_entry; end
  def pack_local_entry; end
  def parent_as_string; end
  def parse_zip64_extra(for_local_header); end
  def prep_zip64_extra(for_local_header); end
  def read_c_dir_entry(io); end
  def read_c_dir_extra_field(io); end
  def read_local_entry(io); end
  def restore_ownership; end
  def restore_ownership=(arg0); end
  def restore_permissions; end
  def restore_permissions=(arg0); end
  def restore_times; end
  def restore_times=(arg0); end
  def self.read_c_dir_entry(io); end
  def self.read_local_entry(io); end
  def self.read_zip_64_long(io); end
  def self.read_zip_long(io); end
  def self.read_zip_short(io); end
  def set_default_vars_values; end
  def set_extra_attributes_on_path(dest_path); end
  def set_ftype_from_c_dir_entry; end
  def set_time(binary_dos_date, binary_dos_time); end
  def set_unix_permissions_on_path(dest_path); end
  def size; end
  def size=(arg0); end
  def symlink?; end
  def time; end
  def time=(value); end
  def to_s; end
  def unix_gid; end
  def unix_gid=(arg0); end
  def unix_perms; end
  def unix_perms=(arg0); end
  def unix_uid; end
  def unix_uid=(arg0); end
  def unpack_c_dir_entry(buf); end
  def unpack_local_entry(buf); end
  def verify_local_header_size!; end
  def write_c_dir_entry(io); end
  def write_local_entry(io, rewrite = nil); end
  def write_to_zip_output_stream(zip_output_stream); end
  def zipfile; end
  def zipfile=(arg0); end
end
class Zip::ExtraField::Generic
  def ==(other); end
  def initial_parse(binstr); end
  def self.name; end
  def self.register_map; end
  def to_c_dir_bin; end
  def to_local_bin; end
end
class Zip::ExtraField::UniversalTime < Zip::ExtraField::Generic
  def ==(other); end
  def atime; end
  def atime=(arg0); end
  def ctime; end
  def ctime=(arg0); end
  def flag; end
  def flag=(arg0); end
  def initialize(binstr = nil); end
  def merge(binstr); end
  def mtime; end
  def mtime=(arg0); end
  def pack_for_c_dir; end
  def pack_for_local; end
end
class Zip::ExtraField::OldUnix < Zip::ExtraField::Generic
  def ==(other); end
  def atime; end
  def atime=(arg0); end
  def gid; end
  def gid=(arg0); end
  def initialize(binstr = nil); end
  def merge(binstr); end
  def mtime; end
  def mtime=(arg0); end
  def pack_for_c_dir; end
  def pack_for_local; end
  def uid; end
  def uid=(arg0); end
end
class Zip::ExtraField::IUnix < Zip::ExtraField::Generic
  def ==(other); end
  def gid; end
  def gid=(arg0); end
  def initialize(binstr = nil); end
  def merge(binstr); end
  def pack_for_c_dir; end
  def pack_for_local; end
  def uid; end
  def uid=(arg0); end
end
class Zip::ExtraField::Zip64 < Zip::ExtraField::Generic
  def ==(other); end
  def compressed_size; end
  def compressed_size=(arg0); end
  def disk_start_number; end
  def disk_start_number=(arg0); end
  def extract(size, format); end
  def initialize(binstr = nil); end
  def merge(binstr); end
  def original_size; end
  def original_size=(arg0); end
  def pack_for_c_dir; end
  def pack_for_local; end
  def parse(original_size, compressed_size, relative_header_offset = nil, disk_start_number = nil); end
  def relative_header_offset; end
  def relative_header_offset=(arg0); end
end
class Zip::ExtraField::Zip64Placeholder < Zip::ExtraField::Generic
  def initialize(_binstr = nil); end
  def pack_for_local; end
end
class Zip::ExtraField::NTFS < Zip::ExtraField::Generic
  def ==(other); end
  def atime; end
  def atime=(arg0); end
  def ctime; end
  def ctime=(arg0); end
  def from_ntfs_time(ntfs_time); end
  def initialize(binstr = nil); end
  def merge(binstr); end
  def mtime; end
  def mtime=(arg0); end
  def pack_for_c_dir; end
  def pack_for_local; end
  def parse_tags(content); end
  def to_ntfs_time(time); end
end
class Zip::ExtraField < Hash
  def c_dir_size; end
  def create(name); end
  def create_unknown_item; end
  def extra_field_type_exist(binstr, id, len, i); end
  def extra_field_type_unknown(binstr, len, i); end
  def initialize(binstr = nil); end
  def length; end
  def local_size; end
  def merge(binstr); end
  def ordered_values; end
  def size; end
  def to_c_dir_bin; end
  def to_local_bin; end
  def to_s; end
end
class Zip::EntrySet
  def <<(entry); end
  def ==(other); end
  def delete(entry); end
  def dup; end
  def each; end
  def entries; end
  def entry_order; end
  def entry_order=(arg0); end
  def entry_set; end
  def entry_set=(arg0); end
  def find_entry(entry); end
  def glob(pattern, flags = nil); end
  def include?(entry); end
  def initialize(an_enumerable = nil); end
  def length; end
  def parent(entry); end
  def push(entry); end
  def size; end
  def sorted_entries; end
  def to_key(entry); end
  include Enumerable
end
class Zip::CentralDirectory
  def ==(other); end
  def comment; end
  def each(&proc); end
  def entries; end
  def get_64_e_o_c_d(buf); end
  def get_e_o_c_d(buf); end
  def initialize(entries = nil, comment = nil); end
  def read_64_e_o_c_d(buf); end
  def read_central_directory_entries(io); end
  def read_e_o_c_d(buf); end
  def read_from_stream(io); end
  def self.read_from_stream(io); end
  def size; end
  def start_buf(io); end
  def write_64_e_o_c_d(io, offset, cdir_size); end
  def write_64_eocd_locator(io, zip64_eocd_offset); end
  def write_e_o_c_d(io, offset, cdir_size); end
  def write_to_stream(io); end
  def zip64_file?(buf); end
  include Enumerable
end
class Zip::File < Zip::CentralDirectory
  def add(entry, src_path, &continue_on_exists_proc); end
  def check_entry_exists(entryName, continue_on_exists_proc, procedureName); end
  def check_file(path); end
  def close; end
  def comment; end
  def comment=(arg0); end
  def commit; end
  def commit_required?; end
  def directory?(newEntry, srcPath); end
  def extract(entry, dest_path, &block); end
  def find_entry(entry_name); end
  def get_entry(entry); end
  def get_input_stream(entry, &aProc); end
  def get_output_stream(entry, permission_int = nil, comment = nil, extra = nil, compressed_size = nil, crc = nil, compression_method = nil, size = nil, time = nil, &aProc); end
  def glob(*args, &block); end
  def initialize(file_name, create = nil, buffer = nil, options = nil); end
  def mkdir(entryName, permissionInt = nil); end
  def name; end
  def on_success_replace; end
  def read(entry); end
  def remove(entry); end
  def rename(entry, new_name, &continue_on_exists_proc); end
  def replace(entry, srcPath); end
  def restore_ownership; end
  def restore_ownership=(arg0); end
  def restore_permissions; end
  def restore_permissions=(arg0); end
  def restore_times; end
  def restore_times=(arg0); end
  def self.add_buffer; end
  def self.foreach(aZipFileName, &block); end
  def self.get_partial_zip_file_name(zip_file_name, partial_zip_file_name); end
  def self.get_segment_count_for_split(zip_file_size, segment_size); end
  def self.get_segment_size_for_split(segment_size); end
  def self.open(file_name, create = nil); end
  def self.open_buffer(io, options = nil); end
  def self.put_split_signature(szip_file, segment_size); end
  def self.save_splited_part(zip_file, partial_zip_file_name, zip_file_size, szip_file_index, segment_size, segment_count); end
  def self.split(zip_file_name, segment_size = nil, delete_zip_file = nil, partial_zip_file_name = nil); end
  def to_s; end
  def write_buffer(io = nil); end
  include Zip::FileSystem
end
class Zip::InputStream
  def close; end
  def eof; end
  def eof?; end
  def get_decompressor; end
  def get_io(io_or_file, offset = nil); end
  def get_next_entry; end
  def initialize(context, offset = nil, decrypter = nil); end
  def input_finished?; end
  def open_entry; end
  def produce_input; end
  def rewind; end
  def self.open(filename_or_io, offset = nil, decrypter = nil); end
  def self.open_buffer(filename_or_io, offset = nil); end
  def sysread(number_of_bytes = nil, buf = nil); end
  include Zip::IOExtras::AbstractInputStream
end
class Zip::OutputStream
  def <<(data); end
  def close; end
  def close_buffer; end
  def comment; end
  def comment=(arg0); end
  def copy_raw_entry(entry); end
  def finalize_current_entry; end
  def finish; end
  def get_compressor(entry, level); end
  def init_next_entry(entry, level = nil); end
  def initialize(file_name, stream = nil, encrypter = nil); end
  def put_next_entry(entry_name, comment = nil, extra = nil, compression_method = nil, level = nil); end
  def self.open(file_name, encrypter = nil); end
  def self.write_buffer(io = nil, encrypter = nil); end
  def update_local_headers; end
  def write_central_directory; end
  include Zip::IOExtras::AbstractOutputStream
end
class Zip::Decompressor
  def initialize(input_stream); end
end
class Zip::Compressor
  def finish; end
end
module Zip::NullDecompressor
  def eof; end
  def eof?; end
  def input_finished?; end
  def produce_input; end
  def self.eof; end
  def self.input_finished?; end
  def self.produce_input; end
  def self.sysread(_numberOfBytes = nil, _buf = nil); end
  def sysread(_numberOfBytes = nil, _buf = nil); end
end
class Zip::NullCompressor < Zip::Compressor
  def <<(_data); end
  def compressed_size; end
  def self.allocate; end
  def self.instance; end
  def self.new(*arg0); end
  def size; end
  extend Singleton::SingletonClassMethods
  include Singleton
end
module Zip::NullInputStream
  include Zip::IOExtras::AbstractInputStream
  include Zip::NullDecompressor
end
class Zip::PassThruCompressor < Zip::Compressor
  def <<(data); end
  def crc; end
  def initialize(outputStream); end
  def size; end
end
class Zip::PassThruDecompressor < Zip::Decompressor
  def eof; end
  def eof?; end
  def initialize(input_stream, chars_to_read); end
  def input_finished?; end
  def produce_input; end
  def sysread(number_of_bytes = nil, buf = nil); end
end
class Zip::Encrypter
end
class Zip::Decrypter
end
module Zip::NullEncryption
  def gp_flags; end
  def header_bytesize; end
end
class Zip::NullEncrypter < Zip::Encrypter
  def data_descriptor(_crc32, _compressed_size, _uncomprssed_size); end
  def encrypt(data); end
  def header(_mtime); end
  def reset!; end
  include Zip::NullEncryption
end
class Zip::NullDecrypter < Zip::Decrypter
  def decrypt(data); end
  def reset!(_header); end
  include Zip::NullEncryption
end
module Zip::TraditionalEncryption
  def decrypt_byte; end
  def gp_flags; end
  def header_bytesize; end
  def initialize(password); end
  def reset_keys!; end
  def update_keys(n); end
end
class Zip::TraditionalEncrypter < Zip::Encrypter
  def data_descriptor(crc32, compressed_size, uncomprssed_size); end
  def encode(n); end
  def encrypt(data); end
  def header(mtime); end
  def reset!; end
  include Zip::TraditionalEncryption
end
class Zip::TraditionalDecrypter < Zip::Decrypter
  def decode(n); end
  def decrypt(data); end
  def reset!(header); end
  include Zip::TraditionalEncryption
end
class Zip::Inflater < Zip::Decompressor
  def eof; end
  def eof?; end
  def initialize(input_stream, decrypter = nil); end
  def input_finished?; end
  def internal_input_finished?; end
  def internal_produce_input(buf = nil); end
  def produce_input; end
  def sysread(number_of_bytes = nil, buf = nil); end
  def value_when_finished; end
end
class Zip::Deflater < Zip::Compressor
  def <<(data); end
  def crc; end
  def finish; end
  def initialize(output_stream, level = nil, encrypter = nil); end
  def size; end
end
class Zip::StreamableStream < Anonymous_Delegator_41
  def clean_up; end
  def get_input_stream; end
  def get_output_stream; end
  def initialize(entry); end
  def write_to_zip_output_stream(aZipOutputStream); end
end
class Zip::StreamableDirectory < Zip::Entry
  def initialize(zipfile, entry, srcPath = nil, permissionInt = nil); end
end
class Zip::Error < StandardError
end
class Zip::EntryExistsError < Zip::Error
end
class Zip::DestinationFileExistsError < Zip::Error
end
class Zip::CompressionMethodError < Zip::Error
end
class Zip::EntryNameError < Zip::Error
end
class Zip::InternalError < Zip::Error
end
class Zip::GPFBit3Error < Zip::Error
end
module Zip::FileSystem
  def dir; end
  def file; end
  def initialize; end
end
class Zip::FileSystem::ZipFsFile
  def atime(fileName); end
  def basename(fileName); end
  def blockdev?(_filename); end
  def chardev?(_filename); end
  def chmod(modeInt, *filenames); end
  def chown(ownerInt, groupInt, *filenames); end
  def ctime(fileName); end
  def delete(*args); end
  def dir=(arg0); end
  def directory?(fileName); end
  def dirname(fileName); end
  def executable?(fileName); end
  def executable_real?(fileName); end
  def exist?(fileName); end
  def exists?(fileName); end
  def expand_path(aPath); end
  def file?(fileName); end
  def foreach(fileName, aSep = nil, &aProc); end
  def ftype(fileName); end
  def get_entry(fileName); end
  def grpowned?(fileName); end
  def initialize(mappedZip); end
  def join(*fragments); end
  def link(_fileName, _symlinkName); end
  def lstat(fileName); end
  def mtime(fileName); end
  def new(fileName, openMode = nil); end
  def open(fileName, openMode = nil, permissionInt = nil, &block); end
  def owned?(fileName); end
  def pipe; end
  def pipe?(_filename); end
  def popen(*args, &aProc); end
  def read(fileName); end
  def readable?(fileName); end
  def readable_real?(fileName); end
  def readlines(fileName); end
  def readlink(_fileName); end
  def rename(fileToRename, newName); end
  def setgid?(fileName); end
  def setuid?(fileName); end
  def size(fileName); end
  def size?(fileName); end
  def socket?(_fileName); end
  def split(fileName); end
  def stat(fileName); end
  def sticky?(fileName); end
  def symlink(_fileName, _symlinkName); end
  def symlink?(_fileName); end
  def truncate(_fileName, _len); end
  def umask(*args); end
  def unix_mode_cmp(fileName, mode); end
  def unlink(*args); end
  def utime(modifiedTime, *fileNames); end
  def writable?(fileName); end
  def writable_real?(fileName); end
  def zero?(fileName); end
end
class Zip::FileSystem::ZipFsFile::ZipFsStat
  def atime; end
  def blksize; end
  def blockdev?; end
  def blocks; end
  def chardev?; end
  def ctime; end
  def dev; end
  def directory?; end
  def executable?; end
  def executable_real?; end
  def file?; end
  def ftype; end
  def get_entry; end
  def gid; end
  def grpowned?; end
  def initialize(zipFsFile, entryName); end
  def ino; end
  def kind_of?(t); end
  def mode; end
  def mtime; end
  def nlink; end
  def owned?; end
  def pipe?; end
  def rdev; end
  def rdev_major; end
  def rdev_minor; end
  def readable?; end
  def readable_real?; end
  def self.delegate_to_fs_file(*methods); end
  def setgid?; end
  def setuid?; end
  def size; end
  def size?; end
  def socket?; end
  def sticky?; end
  def symlink?; end
  def uid; end
  def writable?; end
  def writable_real?; end
  def zero?; end
end
class Zip::FileSystem::ZipFsDir
  def chdir(aDirectoryName); end
  def chroot(*_args); end
  def delete(entryName); end
  def entries(aDirectoryName); end
  def file=(arg0); end
  def foreach(aDirectoryName); end
  def getwd; end
  def glob(*args, &block); end
  def initialize(mappedZip); end
  def mkdir(entryName, permissionInt = nil); end
  def new(aDirectoryName); end
  def open(aDirectoryName); end
  def pwd; end
  def rmdir(entryName); end
  def unlink(entryName); end
end
class Zip::FileSystem::ZipFsDirIterator
  def close; end
  def each(&aProc); end
  def initialize(arrayOfFileNames); end
  def read; end
  def rewind; end
  def seek(anIntegerPosition); end
  def tell; end
  include Enumerable
end
class Zip::FileSystem::ZipFileNameMapper
  def each; end
  def expand_path(aPath); end
  def expand_to_entry(aPath); end
  def find_entry(fileName); end
  def get_entry(fileName); end
  def get_input_stream(fileName, &aProc); end
  def get_output_stream(fileName, permissionInt = nil, &aProc); end
  def glob(pattern, *flags, &block); end
  def initialize(zipFile); end
  def mkdir(fileName, permissionInt = nil); end
  def pwd; end
  def pwd=(arg0); end
  def read(fileName); end
  def remove(fileName); end
  def rename(fileName, newName, &continueOnExistsProc); end
  include Enumerable
end
