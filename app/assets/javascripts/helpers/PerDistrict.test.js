import {
  shouldShowLowGradesBox,
  sortSchoolSlugsByGrade,
  studentTableEventNoteTypeIds,
  eventNoteTypeIdsForSearch,
  hasActive504Plan,
  recordServiceChoices,
  nonAcademicServiceTypeIdsForPhaselines,
  decideStudentProfileTabs
} from './PerDistrict';

it('#shouldShowLowGradesBox', () => {
  expect(shouldShowLowGradesBox([])).toEqual(false);
  expect(shouldShowLowGradesBox(['foo'])).toEqual(false);
  expect(shouldShowLowGradesBox(['foo', 'should_show_low_grades_box'])).toEqual(true);
});

it('#sortSchoolSlugsByGrade', () => {
  expect(['shs', 'whcs'].sort(sortSchoolSlugsByGrade.bind(null, 'somerville'))).toEqual(['whcs', 'shs']);
  expect(['shs', 'whcs'].sort(sortSchoolSlugsByGrade.bind(null, 'other'))).toEqual(['shs', 'whcs']);
});

describe('#studentTableEventNoteTypeIds', () => {
  it('handles somerville HS correctly', () => {
    const eventNoteTypeIds = studentTableEventNoteTypeIds('somerville', 'HS');
    expect(eventNoteTypeIds).toEqual([300, 305, 306, 307, 308]);
  });
  it('handles somerville elementary school correctly', () => {
    const eventNoteTypeIds = studentTableEventNoteTypeIds('somerville', 'ESMS');
    expect(eventNoteTypeIds).toEqual([300, 301]);
  });
  it('handles somerville Capuano early childhood center correctly', () => {
    const eventNoteTypeIds = studentTableEventNoteTypeIds('somerville', null);
    expect(eventNoteTypeIds).toEqual([300, 301]);
  });

  it('handles new_bedford correctly', () => {
    const eventNoteTypeIds = studentTableEventNoteTypeIds('new_bedford', null);
    expect(eventNoteTypeIds).toEqual([400, 300]);
  });

  it('handles bedford correctly', () => {
    const eventNoteTypeIds = studentTableEventNoteTypeIds('bedford', null);
    expect(eventNoteTypeIds).toEqual([300, 302, 304]);
  });
});

describe('#eventNoteTypeIdsForSearch', () => {
  it('handles somerville', () => {
    expect(eventNoteTypeIdsForSearch('somerville')).toEqual([300, 301, 302, 304, 305, 306, 307, 308]);
  });

  it('handles new_bedford', () => {
    expect(eventNoteTypeIdsForSearch('new_bedford')).toEqual([400, 300, 302, 304]);
  });

  it('handles beford', () => {
    expect(eventNoteTypeIdsForSearch('bedford')).toEqual([300, 302, 304]);
  });
});

describe('#hasActive504Plan', () => {
  it('works across test cases', () => {
    expect(hasActive504Plan('504')).toEqual(true);
    expect(hasActive504Plan('Active')).toEqual(true);
    expect(hasActive504Plan(null)).toEqual(false);
    expect(hasActive504Plan('Not 504')).toEqual(false);
    expect(hasActive504Plan('NotIn504')).toEqual(false);
    expect(hasActive504Plan('Exited')).toEqual(false);
    expect(hasActive504Plan('unknown')).toEqual(false);
  });
});

describe('#recordServiceChoices', () => {
  it('works across districts', () => {
    const defaultServiceChoices = {
      leftServiceTypeIds: [503, 502, 504],
      rightServiceTypeIds: [505, 506, 507]
    };
    expect(recordServiceChoices('somerville')).toEqual(defaultServiceChoices);
    expect(recordServiceChoices('new_bedford')).toEqual(defaultServiceChoices);
    expect(recordServiceChoices('demo')).toEqual(defaultServiceChoices);
    
    expect(recordServiceChoices('bedford')).toEqual({
      leftServiceTypeIds: [703, 702, 705, 704, 709],
      rightServiceTypeIds: [707, 706, 701, 708]
    });
  });
});

describe('#nonAcademicServiceTypeIdsForPhaselines', () => {
  it('works across districts', () => {
    const defaultServiceTypeIds = [502, 503, 504, 505, 506];
    expect(nonAcademicServiceTypeIdsForPhaselines('somerville')).toEqual(defaultServiceTypeIds);
    expect(nonAcademicServiceTypeIdsForPhaselines('new_bedford')).toEqual(defaultServiceTypeIds);
    expect(nonAcademicServiceTypeIdsForPhaselines('demo')).toEqual(defaultServiceTypeIds);

    expect(nonAcademicServiceTypeIdsForPhaselines('bedford')).toEqual([702, 703, 704, 705, 709]);
  });
});

describe('#decideStudentProfileTabs', () => {
  it('works across test cases', () => {
    const defaultTabs = {reading: true, math: true};
    expect(decideStudentProfileTabs('somerville', 'ECS')).toEqual(defaultTabs);
    expect(decideStudentProfileTabs('somerville', 'ES')).toEqual(defaultTabs);
    expect(decideStudentProfileTabs('somerville', 'ESMS')).toEqual(defaultTabs);
    expect(decideStudentProfileTabs('somerville', 'MS')).toEqual(defaultTabs);
    expect(decideStudentProfileTabs('somerville', 'HS')).toEqual({grades: true, testing: true});
    expect(decideStudentProfileTabs('somerville', 'OTHER')).toEqual(defaultTabs);
    expect(decideStudentProfileTabs('new_bedford', 'ES')).toEqual({math: true, reading: true});
    expect(decideStudentProfileTabs('new_bedford', 'MS')).toEqual({math: true, reading: true});
    expect(decideStudentProfileTabs('bedford', 'ES')).toEqual(defaultTabs);
    expect(decideStudentProfileTabs('demo', 'ES')).toEqual(defaultTabs);
    expect(decideStudentProfileTabs('demo', 'HS')).toEqual({grades: true, testing: true});
  });
});