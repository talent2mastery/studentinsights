export function isLimitedOrFlep(student) {
  return ['Limited', 'FLEP'].indexOf(student.limited_english_proficiency) !== -1;
}

export function isIepOr504(student) {
  return (student.disability !== null || student.plan_504 === '504');
}

export function isLowIncome(student) {
  return ['Free Lunch', 'Reduced Lunch'].indexOf(student.free_reduced_lunch) !== -1;
}

export function isHighDiscipline(student) {
  return (student.most_recent_school_year_discipline_incidents_count >= 3);
}

export const HighlightKeys = {
  IEP_OR_504: 'IEP_OR_504',
  LIMITED_OR_FLEP: 'LIMITED_OR_FLEP',
  GENDER: 'GENDER',
  LOW_INCOME: 'LOW_INCOME',
  HIGH_DISCIPLINE: 'HIGH_DISCIPLINE',
  STAR_MATH: 'STAR_MATH',
  STAR_READING: 'STAR_READING',
  DIBELS: 'DIBELS'
};

export function dibelsLevel(dibels) {
  const performanceLevel = dibels.performance_level.toLowerCase();
  if (performanceLevel.indexOf('core') !== -1) return 'core';
  if (performanceLevel.indexOf('strategic') !== -1) return 'strategic';
  if (performanceLevel.indexOf('strg') !== -1) return 'strategic';
  if (performanceLevel.indexOf('intensive') !== -1) return 'intensive';
  if (performanceLevel.indexOf('int') !== -1) return 'intensive';
  return null;
}
