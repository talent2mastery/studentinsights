import React from 'react';
import _ from 'lodash';
import Bar from '../components/Bar';
import BoxAndWhisker from '../components/BoxAndWhisker';
import {studentsInRoom} from './studentIdsByRoomFunctions';

const styles = {
  table: {
    width: '100%',
    textAlign: 'left',
    fontSize: 12,
    borderBottom: '1px solid #eee',
    padding: 20,
    tableLayout: 'fixed'
  },
  cell: { /* overridding some global CSS */
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: 12
  },
  barStyle: {
    background: 'white',
    fontSize: 10,
    position: 'relative',
    top: 4,
    borderTop: '2px solid #999'
  },
  barInnerStyle:{
    justifyContent: 'flex-start',
    padding: 2,
    color: '#ccc'
  }
};
export default class ClassroomStats extends React.Component {
  studentsInRoom(room) {
    const {students, studentIdsByRoom} = this.props;
    return studentsInRoom(students, studentIdsByRoom, room.roomKey);
  }

  render() {
    const {rooms} = this.props;

    // TODO(kr)
    const showStar = false;
    const showDibels = true;
    return (
      <div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.cell}></th>
              <th style={styles.cell}>Disability</th>
              <th style={styles.cell}>Learning English</th>
              <th style={styles.cell}>Gender (male)</th>
              <th style={styles.cell}>Students of color</th>
              <th style={styles.cell}>Low income</th>
              {showDibels && <th style={styles.cell}>Dibels CORE</th>}
              {showStar && <th style={styles.cell}>STAR Math boxplot</th>}
              {showStar && <th style={styles.cell}>STAR Reading boxplot</th>}
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => {  
              return (
                <tr key={room.roomKey}>
                  <td style={styles.cell}>{room.roomName}</td>
                  <td style={styles.cell}>{this.renderDisability(room)}</td>
                  <td style={styles.cell}>{this.renderEnglishLearners(room)}</td>
                  <td style={styles.cell}>{this.renderStudentsOfColor(room)}</td>
                  <td style={styles.cell}>{this.renderGender(room)}</td>
                  <td style={styles.cell}>{this.renderLowIncome(room)}</td>
                  {showDibels && <td style={styles.cell}>{this.renderDibelsCore(room)}</td>}
                  {showStar && <td style={styles.cell}>{this.renderMath(room)}</td>}
                  {showStar && <td style={styles.cell}>{this.renderReading(room)}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  renderMath(room) {
    return this.renderStar(room, student => student.most_recent_star_math_percentile);
  }


  renderReading(room) {
    return this.renderStar(room, student => student.most_recent_star_reading_percentile);
  }

  renderStar(room, accessor) {
    const students = this.studentsInRoom(room);
    const values = _.compact(students.map(accessor));
    return (
      <div>
        {(values.length === 0)
          ? <div style={{height: 30}}>{'\u00A0'}</div>
          : <BoxAndWhisker values={values} style={{width: 100, marginLeft: 'auto', marginRight: 'auto'}} />}
      </div>
    );
  }

  // if no score, consider them not core
  renderDibelsCore(room) {
    return this.renderBarFor(room, student => {
      return (student.dibels.length > 0)
        ? _.last(student.dibels).performance_level === 'Core'
        : false;
    });
  }

  renderStudentsOfColor(room) {
    return this.renderBarFor(room, student => {
      return student.hispanico_latino || student.race.indexOf('White') === -1;
    });
  }

  renderGender(room) {
    return this.renderBarFor(room, student => {
      return student.gender === 'M';
    });
  }

  // TODO(kr) PerDistrict
  renderLowIncome(room) {
    return this.renderBarFor(room, student => {
      return ['Free Lunch', 'Reduced Lunch'].indexOf(student.free_reduced_lunch) !== -1;
    });
  }

  renderDisability(room) {
    return this.renderBarFor(room, student => student.disability !== null);
  }

  renderEnglishLearners(room) {
    return this.renderBarFor(room, student => student.limited_english_proficiency !== 'Fluent');
  }

  renderBarFor(room, filterFn) {
    const students = this.studentsInRoom(room);
    const count = students.filter(filterFn).length;
    const percent = count === 0
      ? 0 
      : Math.round(100 * count / students.length);

    return (
      <Bar
        percent={percent}
        threshold={5}
        style={styles.barStyle}
        innerStyle={styles.barInnerStyle} />
    );
  }

}
ClassroomStats.propTypes = {
  students: React.PropTypes.array.isRequired,
  rooms: React.PropTypes.array.isRequired,
  studentIdsByRoom: React.PropTypes.object.isRequired
};
