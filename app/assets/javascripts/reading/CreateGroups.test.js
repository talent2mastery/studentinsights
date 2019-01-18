import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {withNowContext} from '../testing/NowContainer';
import PerDistrictContainer from '../components/PerDistrictContainer';
import CreateGroups from './CreateGroups';
import propsFixture from './CreateGroups.fixture';


export function testProps(props) {
  return {
    ...propsFixture,
    ...props
  };
}

export function testEl(props = {}) {
  return withNowContext('2019-01-16T11:03:06.123Z',
    <PerDistrictContainer districtKey="somerville">
      <CreateGroups {...props} />
    </PerDistrictContainer>
  );
}


it('renders without crashing', () => {
  const el = document.createElement('div');
  const props = testProps();
  ReactDOM.render(testEl(props), el);
});

it('snapshots', () => {
  const props = testProps();
  const tree = renderer
    .create(testEl(props))
    .toJSON();
  expect(tree).toMatchSnapshot();
});