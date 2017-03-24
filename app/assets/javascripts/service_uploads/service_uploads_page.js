(function() {
  window.shared || (window.shared = {});
  var dom = window.shared.ReactHelpers.dom;
  var createEl = window.shared.ReactHelpers.createEl;
  var merge = window.shared.ReactHelpers.merge;
  var ServiceUploadDetail = window.shared.ServiceUploadDetail;
  var NewServiceUpload = window.shared.NewServiceUpload;

  var ServiceUploadsPage = window.shared.ServiceUploadsPage = React.createClass({

    propTypes: {
      serializedData: React.PropTypes.object.isRequired,
    },

    getInitialState: function () {
      return {
        serviceUploads: this.props.serializedData.serviceUploads, // Existing service uploads
        formData: {},                                             // New service upload form data

        // Student LASID validation
        studentLasidsReceivedFromBackend: false,
        incorrectLasids: [],
        missingLasidHeader: false,
        lasidAuthorizationError: false,

        // Overall form validation
        serverSideErrors: [],
        uploadingInProgress: false,
      };
    },

    render: function() {
      return dom.div({},
        dom.div({
          style: {
            width: '50%',
            float: 'left',
            padding: 20,
            marginTop: 20,
          }
        }, this.renderNewServiceUploadForm()),
        dom.div({
          style: {
            width: '50%',
            float: 'left'
          }
        }, this.renderServiceDetails())
      );
    },

    renderNewServiceUploadForm: function () {
      return createEl(NewServiceUpload, {
        // Actions
        onClickUploadButton: this.onClickUploadButton,
        onSelectStartDate: this.onSelectStartDate,
        onSelectEndDate: this.onSelectEndDate,
        onSelectFile: this.onSelectFile,
        onUserTypingServiceType: this.onUserTypingServiceType,
        onUserSelectServiceType: this.onUserSelectServiceType,

        // Student LASID validation
        lasidAuthorizationError: this.state.lasidAuthorizationError,
        studentLasidsReceivedFromBackend: this.state.studentLasidsReceivedFromBackend,
        incorrectLasids: this.state.incorrectLasids,
        missingLasidHeader: this.state.missingLasidHeader,

        // Overall form validation
        missingRequiredFields: this.isMissingRequiredFields(),
        formData: this.state.formData,
        serverSideErrors: this.state.serverSideErrors,
        uploadingInProgress: this.state.uploadingInProgress,
        serviceTypeNames: this.props.serializedData.serviceTypeNames,
      });
    },

    renderServiceDetails: function () {
      return this.state.serviceUploads.map(function (serviceUpload) {
        return createEl(ServiceUploadDetail, {
          data: serviceUpload,
          onClickDeleteServiceUpload: this.onClickDeleteServiceUpload,
          key: String(serviceUpload.id)
        });
      }, this);
    },

    onClickDeleteServiceUpload: function (id) {
      return $.ajax({
        url: '/service_uploads/' + id + '.json',
        method: 'DELETE',
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: function (data) {
          if (data.success) {
            this.setState({
              serviceUploads: this.state.serviceUploads.filter(function (upload) {
                return upload.id !== parseInt(data.id);
              })
            });
          }
        }.bind(this)
      });
    },

    onSelectStartDate: function (event) {
      this.setState({
        formData: merge(this.state.formData, { date_started: event })
      });
    },

    onSelectEndDate: function (event) {
      this.setState({
        formData: merge(this.state.formData, { date_ended: event })
      });
    },

    onUserTypingServiceType: function(event) {
      this.setState({
        formData: merge(this.state.formData, { service_type_name: event.target.value })
      });
    },

    onUserSelectServiceType: function(string) {
      this.setState({
        formData: merge(this.state.formData, { service_type_name: string })
      });
    },

    onClickUploadButton: function () {
      if (this.isMissingRequiredFields()) return;

      this.upload();
    },

    isMissingRequiredFields: function () {
      var formData = this.state.formData;

      if (!formData.file_name) return true;
      if (!formData.student_lasids) return true;
      if (!formData.service_type_name) return true;
      if (!formData.date_started) return true;

      return false;
    },

    upload: function () {
      this.setState({
        serverSideErrors: [],
        uploadingInProgress: true,
      });  // Clear out any errors

      $.ajax({
        url: '/service_uploads.json',
        method: 'POST',
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        data: JSON.stringify(this.state.formData),
        success: function (data) {
          if (data.service_upload) {
            this.setState({
              serviceUploads: [data.service_upload].concat(this.state.serviceUploads),
              uploadingInProgress: false,
              formData: {},
              studentLasidsReceivedFromBackend: false,
              incorrectLasids: [],
              missingLasidHeader: false,
              lasidAuthorizationError: false,
              serverSideErrors: [],
            });
          };

          if (data.errors) {
            this.setState({
              serverSideErrors: data.errors,
              uploadingInProgress: false
            });
          };
        }.bind(this)
      });
    },

    onSelectFile: function (event) {
      var file = event.target.files[0];
      if (!file || !file.name) return;

      this.setState({ formData: merge(this.state.formData, { file_name: file.name }) });

      var reader = new FileReader();
      reader.onload = this.onFileReaderLoaded.bind(this, reader);
      reader.readAsText(file);
    },

    onFileReaderLoaded: function (reader, e) {
      var text = reader.result;
      var rows = text.split("\n");
      var headerRow = rows.shift().split(",");

      if (headerRow[0].trim() !== 'LASID') {
        this.setState({ missingLasidHeader: true });
        return;
      };

      var student_lasids = rows.map(function(row) { return row.split(",")[0].trim(); })
                               .filter(function (lasid) { return lasid !== '' });

      this.validateLASIDs(student_lasids);
    },


    validateLASIDs: function (student_lasids) {
      return $.ajax({
        url: '/students/lasids.json',
        method: 'GET',
        success: function (data) {
          if (Array.isArray(data)) {
            this.setState({
              studentLasidsReceivedFromBackend: true,
              incorrectLasids: _.difference(student_lasids, data),
              formData: merge(this.state.formData, {
                student_lasids: student_lasids }
              ),
            });
          } else {
            this.setState({
              lasidAuthorizationError: true
            })
          };
        }.bind(this)
      });
    }

  });

})();