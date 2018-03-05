class HomeController < ApplicationController
  def home
    @serialized_data = {
      current_educator: current_educator
    }
    render 'shared/serialized_data'
  end

  # This is high-school only
  def assignments_json
    time_now = Time.now
    grade_threshold = 69
    time_threshold = 30.days

    # assignments with a section where student is struggling
    students = authorized { Student.all }
    failing_assignments = StudentSectionAssignment
      .includes(:student)
      .where('grade_numeric < ?', grade_threshold)
      .where(student_id: students.map(&:id))
      .order(grade_numeric: :asc)

    # remove those with student notes for NGE or 10GE
    unsupported_failing_assignments = failing_assignments.select do |assignment|
      assignment.student.event_notes
        .where(is_restricted: false)
        .where('updated_at > ?', time_now - time_threshold)
        .where(event_note_type_id: [305, 306])
        .count == 0
    end

    # ser
    assignments_json = unsupported_failing_assignments.map do |assignment|
      assignment.as_json({
        :only => [:id, :grade_letter, :grade_numeric],
        :include => {
          :student => {
            :only => [:id, :email, :first_name, :last_name, :grade, :house]
          },
          :section => {
            :only => [:id, :section_number, :schedule, :room_number],
            :include => {
              :educators => {:only => [:id, :full_name, :email]}
            }
          }
        }
      })
    end

    render json: {
      assignments: assignments_json
    }
  end
  
  # TODO(kr) Authorized behaves in unexpected ways here with `select`
  def birthdays_json
    time_now = Time.now
    students = authorized do
      Student.select(:id, :primary_email, :first_name, :last_name, :date_of_birth).all
        .where('extract(doy from date_of_birth) > ?', time_now.yday - 7)
        .where('extract(doy from date_of_birth) < ?', time_now.yday + 7)
    end
    students_json = students.map do |student|
      student.as_json({
        :only => [:id, :email, :first_name, :last_name, :date_of_birth]
      })
    end
    render json: {
      students: students_json
    }
  end

  def notes_json
    limit = 20
    event_notes = authorized { EventNote.all.order(updated_at: :desc) }
    recent_event_notes = event_notes.first(limit)
    event_notes_json = recent_event_notes.map do |event_note|
      event_note.as_json({
        :only => [:id, :updated_at, :event_note_type_id, :text],
        :include => {
          :educator => {:only => [:id, :full_name, :email]},
          :student => {
            :only => [:id, :email, :first_name, :last_name, :grade, :house],
            :include => {
              :homeroom => {
                :only => [:id, :name],
                :include => {
                  :educator => {:only => [:id, :full_name, :email]}
                }
              }
            }
          }
        }
      })
    end
    render json: {
      event_notes: event_notes_json
    }
  end
end
