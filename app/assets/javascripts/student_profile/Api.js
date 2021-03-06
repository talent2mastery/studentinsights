import {
  apiPatchJson,
  apiPutJson,
  apiPostJson,
  apiDeleteJson
} from '../helpers/apiFetchJson';


export default class Api {
  autosaveDraft(studentId, draft) {
    const {draftKey, eventNoteTypeId, isRestricted, text} = draft;
    return apiPutJson(`/api/students/${studentId}/event_note_drafts/${draftKey}`, {
      draft: {
        text,
        event_note_type_id: eventNoteTypeId,
        is_restricted: isRestricted
      }
    });
  }

  saveNotes(studentId, eventNoteParams) {
    if (eventNoteParams.id) {
      return this._updateNote(eventNoteParams);
    }
    else {
      return this._createNote(studentId, eventNoteParams);
    }
  }

  _createNote(studentId, eventNoteParams) {
    return apiPostJson('/api/event_notes', {
      draft_key: eventNoteParams.draftKey,
      event_note: {
        student_id: studentId,
        event_note_type_id: eventNoteParams.eventNoteTypeId,
        is_restricted: eventNoteParams.isRestricted || false,
        text: eventNoteParams.text,
        event_note_attachments_attributes: eventNoteParams.eventNoteAttachments
      }
    });
  }

  _updateNote(eventNoteParams) {
    const id = eventNoteParams.id;

    return apiPatchJson(`/api/event_notes/${id}`, {
      event_note: {
        text: eventNoteParams.text
      }
    });
  }

  deleteEventNoteAttachment(eventNoteAttachmentId) {
    const url = `/api/event_notes/attachments/${eventNoteAttachmentId}`;
    return apiDeleteJson(url);
  }

  saveService(studentId, serviceParams) {
    const url = '/students/' + studentId + '/service.json';
    const body = {
      service: {
        service_type_id: serviceParams.serviceTypeId,
        date_started: serviceParams.dateStartedText,
        estimated_end_date: serviceParams.estimatedEndDateText,
        provided_by_educator_name: serviceParams.providedByEducatorName,
        student_id: studentId
      }
    };

    return apiPostJson(url, body);
  }

  discontinueService(serviceId) {
    const url = '/services/' + serviceId;
    return apiDeleteJson(url);
  }
}
