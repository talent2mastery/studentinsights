import React from 'react';
import PropTypes from 'prop-types';
import {gradeText} from '../helpers/gradeText';
import {prettyDibelsText} from '../reading/readingData';
import {statsForDataPoint} from './ChipForDibels';
import {ScoreBadge} from './containers';
import {thresholdsExplanation} from './HoverSummary';


export default class DibelsDialog extends React.Component {
  render() {
    const {nowFn} = this.context;
    const {gradeNow, benchmarkDataPoints} = this.props;

    return (
      <div style={{display: 'flex', flexDirection: 'column', marginBottom: 15}}>
          {benchmarkDataPoints.map(dataPoint => {
            const {
              prettyAssessmentText,
              score,
              atMoment,
              gradeThen,
              thresholds,
              concernKey
            } = statsForDataPoint(dataPoint, gradeNow, nowFn());
            return (
              <div key={dataPoint.id}>
                <div>{prettyAssessmentText}</div>
                <div>
                  <ScoreBadge
                    concernKey={concernKey}
                    score={score}
                    innerStyle={{padding: 10}}
                  />
                </div>
                <div>{thresholdsExplanation(thresholds)}</div>
                <div>{atMoment.format('M/D/YY')} in {gradeText(gradeThen)}</div>
              </div>
            );
          })}
      </div>
    );
  }
}
DibelsDialog.contextTypes = {
  nowFn: PropTypes.func.isRequired
};
DibelsDialog.propTypes = {
  gradeNow: PropTypes.string.isRequired,
  benchmarkDataPoints: PropTypes.array.isRequired
};
