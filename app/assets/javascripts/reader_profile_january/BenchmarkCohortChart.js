import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import {toSchoolYear} from '../helpers/schoolYear';
import {apiFetchJson} from '../helpers/apiFetchJson';
import {percentileWithSuffix} from '../helpers/percentiles';
import GenericLoader from '../components/GenericLoader';
import BenchmarkBoxChart from './BenchmarkBoxChart';
import {Box} from './BoxChartElements';
import {BLANK} from './colors';


export default class BenchmarkCohortChart extends React.Component {
  constructor(props) {
    super(props);

    this.fetchJson = this.fetchJson.bind(this);
    this.renderBoxChartFromJson = this.renderBoxChartFromJson.bind(this);
  }

  fetchJson() {
    const {nowFn} = this.context;
    const {studentId, benchmarkAssessmentKey} = this.props;
    const schoolYearNow = toSchoolYear(nowFn());
    const queryString = qs.stringify({
      benchmark_assessment_key: benchmarkAssessmentKey,
      school_years: [schoolYearNow - 1, schoolYearNow]
    }, {arrayFormat: 'bracket'});
    const url = `/api/students/${studentId}/reader_profile_cohort_json?${queryString}`;
    return apiFetchJson(url);
  }

  render() {
    return (
      <div className="CohortChart">
        <GenericLoader
          promiseFn={this.fetchJson}
          render={this.renderBoxChartFromJson}
        />
      </div>
    );
  }

  renderBoxChartFromJson(json) {
    const {gradeNow, readerJson, benchmarkAssessmentKey} = this.props;
    return (
      <BenchmarkBoxChart
        gradeNow={gradeNow}
        readerJson={readerJson}
        benchmarkAssessmentKey={benchmarkAssessmentKey}
        renderRaw={true}
        renderBoxFn={this.renderCohortBoxFn.bind(this, json)}
      />
    );
  }

  renderCohortBoxFn(json, boxParams) {
    const {schoolYear, benchmarkPeriodKey} = boxParams;
    const whenKey = [schoolYear, benchmarkPeriodKey].join('-');
    const cell = json.cells[whenKey];
    const hasValue = (cell && cell.stats.p !== null && cell.stats.p !== undefined);
    const pText =  (hasValue) ? percentileWithSuffix(cell.stats.p) : null;
    const tooltipText = (hasValue) ? [
      'Within the school, at that grade level:',
      `  ${padFormatStudentsHave(cell.stats.n_higher, 3)} a higher score`,
      `  ${padFormatStudentsHave(cell.stats.n_equal, 3)} the same score`,
      `  ${padFormatStudentsHave(cell.stats.n_lower, 3)} a lower score`,
      '',
      `A score of "${cell.value}" is in the ${pText} percentile`
    ].join("\n") : null;
    return (
      <Box
        key={benchmarkPeriodKey}
        title={tooltipText}
        color={BLANK}
        style={{color: '#666'}}>
        {pText}
      </Box>
    );
  }
}
BenchmarkCohortChart.contextTypes = {
  nowFn: PropTypes.func.isRequired
};
BenchmarkCohortChart.propTypes = {
  studentId: PropTypes.number.isRequired,
  gradeNow: PropTypes.string.isRequired,
  benchmarkAssessmentKey: PropTypes.string.isRequired,
  readerJson: PropTypes.object.isRequired
};


function padFormatStudentsHave(num, n) {
  let str = num.toString() + "\t";
  return (num === 1) ? `${str} student has` : `${str} students have`;
}
