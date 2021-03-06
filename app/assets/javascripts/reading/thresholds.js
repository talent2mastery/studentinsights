// benchmarkAssessmentKey values
export const DIBELS_DORF_WPM = 'dibels_dorf_wpm';
export const DIBELS_DORF_ACC = 'dibels_dorf_acc';
export const DIBELS_DORF_ERRORS = 'dibels_dorf_errors';
export const DIBELS_FSF = 'dibels_fsf';
export const DIBELS_LNF = 'dibels_lnf';
export const DIBELS_PSF = 'dibels_psf';
export const DIBELS_NWF_CLS = 'dibels_nwf_cls';
export const DIBELS_NWF_WWR = 'dibels_nwf_wwr';
export const F_AND_P_ENGLISH = 'f_and_p_english';
export const F_AND_P_SPANISH = 'f_and_p_spanish';
export const INSTRUCTIONAL_NEEDS = 'instructional_needs';


// shared across english and spanish
//
// Last revised on 2/13/20, see also internal
// doc: "Somerville F&P benchmarks (2/13/2020)"
// although note that depending on the context these
// levels are expressed as differently.  Here, the "benchmark"
// means "if the student scores at this score or above, this area might not
// be a top priority for focusing problem solving discussions."
const F_AND_P_THRESHOLDS_SHARED = {
  'KF:spring': {
    benchmark: 'C'
  },
  '1:fall': {
    benchmark: 'C'
  },
  '1:winter': {
    benchmark: 'F'
  },
  '1:spring': {
    benchmark: 'I'
  },
  '2:fall': {
    benchmark: 'I'
  },
  '2:winter': {
    benchmark: 'K'
  },
  '2:spring': {
    benchmark: 'M'
  },
  '3:fall': {
    benchmark: 'M'
  },
  '3:winter': {
    benchmark: 'O'
  },
  '3:spring': {
    benchmark: 'P'
  },
  '4:fall': {
    benchmark: 'P'
  },
  '4:winter': {
    benchmark: 'R'
  },
  '4:spring': {
    benchmark: 'T'
  },
  '5:fall': {
    benchmark: 'T'
  },
  '5:winter': {
    benchmark: 'T'
  },
  '5:spring': {
    benchmark: 'T'
  }
};


// all thresholds are "greater than or equal to" / "less than or equal to"
// see also "DIBELS cut points" sheet at https://docs.google.com/spreadsheets/d/1Z8t1wmaE2mX6kkNGw_ZtPr2ZDVfXkEaTmRbVUofEo08
const somervilleThresholds = {
  [DIBELS_FSF]: {
    'KF:fall': {
      benchmark: 18,
      risk: 7
    },
    'KF:winter': {
      benchmark: 44,
      risk: 31
    },
  },
  [DIBELS_LNF]: {
    'KF:fall': {
      benchmark: 22,
      risk: 10
    },
    'KF:winter': {
      benchmark: 42,
      risk: 19
    },
    'KF:spring': {
      benchmark: 52,
      risk: 38
    },
    '1:fall': {
      benchmark: 50,
      risk: 36
    }
  },
  [DIBELS_PSF]: {
    'KF:winter': {
      benchmark: 27,
      risk: 11
    },
    'KF:spring': {
      benchmark: 45,
      risk: 30
    },
    '1:fall': {
      benchmark: 45,
      risk: 30
    }
  },
  [DIBELS_NWF_CLS]: {
    'KF:winter': { // made optional, changed January 2020
      benchmark: 27,
      risk: 12
    },
    'KF:spring': {
      benchmark: 37,
      risk: 27
    },
    '1:fall': {
      benchmark: 33,
      risk: 19
    },
    '1:winter': {
      benchmark: 50,
      risk: 30
    },
    '2:fall': {
      benchmark: 62,
      risk: 45
    },
    '1:spring': {
      benchmark: 78,
      risk: 42
    },
  },
  [DIBELS_NWF_WWR]: {
    'KF:spring': {
      benchmark: 4,
      risk: 0
    },
    '1:fall': {
      benchmark: 4,
      risk: 1
    },
    '1:winter': {
      benchmark: 12,
      risk: 5
    },
    '1:spring': {
      benchmark: 18,
      risk: 9
    },
    '2:fall': {
      benchmark: 18,
      risk: 9
    },
  },
  [DIBELS_DORF_WPM]: {
    '1:winter': {
      benchmark: 30,
      risk: 18
    },
    '1:spring': {
      benchmark: 63,
      risk: 36
    },
    '2:fall': {
      benchmark: 68,
      risk: 46
    },
    '2:winter': {
      benchmark: 84,
      risk: 67
    },
    '2:spring': {
      benchmark: 100,
      risk: 82
    },
    '3:fall': {
      benchmark: 93,
      risk: 72
    },
    '3:winter': {
      benchmark: 108,
      risk: 88
    },
    '3:spring': {
      benchmark: 123,
      risk: 100
    }
  },
  [DIBELS_DORF_ACC]: {
    '1:winter': {
      benchmark: 85,
      risk: 73
    },
    '1:spring': {
      benchmark: 92,
      risk: 84
    },
    '2:fall': {
      benchmark: 93,
      risk: 84
    },
    '2:winter': {
      benchmark: 95,
      risk: 91
    },
    '2:spring': {
      benchmark: 97,
      risk: 93
    },
    '3:fall': {
      benchmark: 96,
      risk: 91
    },
    '3:winter': {
      benchmark: 97,
      risk: 93
    },
    '3:spring': {
      benchmark: 98,
      risk: 95
    }
  },
  [F_AND_P_ENGLISH]: F_AND_P_THRESHOLDS_SHARED,
  [F_AND_P_SPANISH]: F_AND_P_THRESHOLDS_SHARED
};

export function somervilleReadingThresholdsFor(benchmarkAssessmentKey, grade, benchmarkPeriodKey) {
  const thresholds = somervilleThresholds[benchmarkAssessmentKey];
  if (!thresholds) return null;
  const periodKey = [grade, benchmarkPeriodKey].join(':');
  return thresholds[periodKey] || null;
}
