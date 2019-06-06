import React from 'react';
import PropTypes from 'prop-types';
import External from '../components/External';
import NoteText from '../components/NoteText';
import CleanSlateFeedView from '../feed/CleanSlateFeedView';
import {
  DIBELS_LNF,
  DIBELS_PSF,
  DIBELS_NWF_CLS,
  DIBELS_NWF_WWR,
  DIBELS_DORF_ACC,
  DIBELS_DORF_WPM,
  F_AND_P_ENGLISH
} from '../reading/thresholds';
import {
  SEE_AS_READER_SEARCH,
  ORAL_LANGUAGE_SEARCH,
  ENGLISH_SEARCH,
  SOUNDS_IN_WORDS_SEARCH,
  SOUNDS_AND_LETTERS_SEARCH
} from './TextSearchForReading';
import ChipForIEP, {buildLunrIndexForIEP, findWithinIEP, cleanedIepFullText} from './ChipForIEP';
import ChipForNotes, {buildLunrIndexForNotes, findWithinNotes} from './ChipForNotes';
import ChipForLanguage from './ChipForLanguage';
import ChipForDibels from './ChipForDibels';
import ChipForFAndPEnglish from './ChipForFAndPEnglish';
import ChipForService from './ChipForService';
import DibelsDialog from './DibelsDialog';
import FAndPDialog from './FAndPDialog';
import ReaderProfileDialog from './ReaderProfileDialog';
import {Ingredient, Sub, MultipleChips, NotesContainer} from './layout';
import {Suggestion, Why} from './containers';

/* todo
other bits:
- sped eval from melissa's chart
- TOWRE in older grades?
- maybe CTOPP naming in older grades (instead of SPS RAN)?
- CELF maybe for older grades? speech eval?
- working memory: WISC-5 maybe in older grades? not K

review search heuristics:
- sight words?
- special education evaluation?
*/
export default class ReaderProfileJune extends React.Component {
  render() {
    const {feedCards, iepContents} = this.props;
    const notes = feedCards.map(card => card.json);
    const lunrIndex = buildLunrIndexForNotes(notes);
    const cleanIepFullText = (iepContents)
      ? cleanedIepFullText(iepContents.pages.map(page => page.text).join('\n'))
      : null;
    const iepLunrIndex = (iepContents)
      ? buildLunrIndexForIEP(cleanIepFullText)
      : null;

    return (
      <div style={{marginTop: 10}}>
        <Ingredient
          name="See themselves as a reader"
          color="#4db1f0"
          notes={
            <NotesContainer>
              {this.renderChipForNotes(SEE_AS_READER_SEARCH, lunrIndex)}
              {this.renderChipForIEP(SEE_AS_READER_SEARCH, iepLunrIndex, cleanIepFullText)}
            </NotesContainer>
          }
          subs={[
            <Sub name="in small groups" />,
            <Sub name="independently" />
          ]}
        />

        <Ingredient
          name="Communicate with oral language"
          color="#f06060"
          notes={
            <NotesContainer>
              {this.renderChipForNotes(ORAL_LANGUAGE_SEARCH, lunrIndex)}
              {this.renderChipForIEP(ORAL_LANGUAGE_SEARCH, iepLunrIndex, cleanIepFullText)}
            </NotesContainer>
          }
          subs={[
            <Sub name="expressive" />,
            <Sub name="receptive" />
          ]}
        />

        <Ingredient
          name="Speak and listen in English"
          color="rgba(140, 17, 140, 0.57)"
          notes={
            <NotesContainer>
              {this.renderChipForNotes(ENGLISH_SEARCH, lunrIndex)}
              {this.renderChipForIEP(ENGLISH_SEARCH, iepLunrIndex, cleanIepFullText)}
            </NotesContainer>
          }
          subs={[
            <Sub name="spoken"
              screener={this.renderChipForLanguage('oral')}
              intervention={this.renderChipForService(510)}
            />,
            <Sub name="written"
              screener={this.renderChipForLanguage('literacy')}
              intervention={this.renderChipForService(510)}
            />
          ]}
        />

        <Ingredient
          name="Discriminate Sounds in Words"
          notes={
            <NotesContainer>
              {this.renderChipForNotes(SOUNDS_IN_WORDS_SEARCH, lunrIndex)}
              {this.renderChipForIEP(SOUNDS_IN_WORDS_SEARCH, iepLunrIndex, cleanIepFullText)}
            </NotesContainer>
          }
          subs={[
            <Sub
              name="blending"
              diagnostic={
                <Suggestion
                  text="SPS PAST"
                  dialog={
                    <div>
                      <Why>
                        <p>The SPS PAST is for diagnosing instructional needs in phonological awareness (eg, blending, deleting) at different levels of details (eg, syllable, individual phonemes).</p>
                        <p>Results from the SPS PAST can be used to determine where to start in the SPS Heggerty intervention program.</p>
                      </Why>
                      <External style={{display: 'block'}} href="https://www.dropbox.com/s/kqd79ry3a9a8jra/PAST%20A.docx?dl=0">SPS PAST A</External>
                      <External style={{display: 'block'}} href="https://www.dropbox.com/s/vysqs1ccoo3ohps/PAST%20B.docx?dl=0">SPS PAST B</External>
                      <External style={{display: 'block'}} href="https://www.dropbox.com/s/jk377ydprqn9pdx/PAST%20C.docx?dl=0">SPS PAST C</External>
                    </div>
                  }
                />
              }
              intervention={
                <Suggestion
                  text="SPS Heggerty"
                  dialog={
                    <div>
                      <Why>
                        <p>The SPS Heggerty intervention is short 1:1 phonological awareness program, intended for 4-8 week intervention cycles.</p>
                        <p>You can determine where to start with the SPS PAST, and get a sense of progress over a cycle with using the PAST as a post-test.</p>
                      </Why>
                      <External style={{display: 'block'}} href="https://www.dropbox.com/s/u6e1ek42b1gzun8/SPS%20Heggerty%20PA%20Intervention.docx?dl=0">SPS Heggerty Intervention</External>
                    </div>
                  }
                />
              }
              screener={this.renderChipForDibels('blending', DIBELS_PSF)}
            />,
            <Sub name="deleting" />,
            <Sub name="substituting" />
          ]}
        />

        <Ingredient
          name="Represent Sounds with Letters"
          isLast={true}
          notes={
            <NotesContainer>
              {this.renderChipForNotes(SOUNDS_AND_LETTERS_SEARCH, lunrIndex)}
              {this.renderChipForIEP(SOUNDS_AND_LETTERS_SEARCH, iepLunrIndex, cleanIepFullText)}
            </NotesContainer>
          }
          subs={[
            <Sub name="letters"
              screener={this.renderChipForDibels('letters', DIBELS_LNF)}
            />,
            <Sub name="accurate"
              diagnostic={
                <Suggestion
                  text="phonics screeners"
                  dialog={
                    <div>
                      <Why>
                        <p>Phonics screeners are for diagnosing instructional needs in phonics (eg, CVC, blends, multisyllable words).</p>
                        <p>Results from the phonics screeners can be used to determine where to start in a phonics intervention program (eg, Wilson).</p>
                      </Why>
                      <External style={{display: 'block'}} href="https://www.dropbox.com/s/rg1gv8uxuc0ugw1/QuickPhonicsScreener.pdf?dl=0">Quick Phonics Screener</External>
                      <External style={{display: 'block'}} href="https://www.dropbox.com/s/xn7szj0stl1smuv/Decoding%20Survey.pdf?dl=0">Decoding Screener</External>
                    </div>
                  }
                />
              }
              screener={this.renderChipForDibels('accurate', DIBELS_DORF_ACC)}
            />,
            <Sub name="fluent"
              screener={
                <MultipleChips chips={[
                  this.renderChipForDibels('fluent', DIBELS_DORF_WPM),
                  this.renderChipForDibels('fluent', DIBELS_NWF_WWR),
                  this.renderChipForDibels('fluent', DIBELS_NWF_CLS)
                ]} />
              }
              intervention={
                <MultipleChips chips={[
                  this.renderChipForService(507),
                  this.renderChipForService(514),
                  this.renderChipForService(511)
                ]} />
              }
            />,
            <Sub name="comprehension"
              screener={this.renderChipForFAndPEnglish('comprehension')}
            />
          ]}
        />
      </div>
    );
  }

  renderChipForIEP(words, iepLunrIndex, cleanIepFullText) {
    if (iepLunrIndex === null || cleanIepFullText === null) return null;
    
    const {student} = this.props;
    const iepMatchPositions = findWithinIEP(iepLunrIndex, words);
    if (iepMatchPositions.length === 0) return null;
    
    return (
      <ReaderProfileDialog
        icon={
          <ChipForIEP
            iepMatchPositions={iepMatchPositions}
            iepFullText={cleanIepFullText}
          />
        }
        title={`IEP at-a-glance for ${student.first_name}`}
        content={
          <div>
            <External
              style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: 10
              }}
              href={`/students/${student.id}/latest_iep_document`}
            >Download IEP at a glance PDF</External>
            <NoteText text={cleanIepFullText} />
          </div>
        }
        modalStyle={styles.rightDialog}
      />
    );
  }

  renderChipForNotes(words, lunrIndex) {
    const {student, feedCards} = this.props;
    const notes = feedCards.map(card => card.json);
    const notesMatches = findWithinNotes(lunrIndex, notes, words);
    if (notesMatches.length === 0) return null;

    return (
      <ReaderProfileDialog
        icon={<ChipForNotes notesMatches={notesMatches} />}
        title={`Notes for ${student.first_name}`}
        content={<CleanSlateFeedView feedCards={feedCards} style={{fontSize: 14}} />}
        modalStyle={styles.rightDialog}
      />
    );
  }

  renderChipForLanguage(accessKey) {
    const {student, access} = this.props;
    return (
      <ChipForLanguage
        accessKey={accessKey}
        student={student}
        access={access}
      />
    );
  }

  renderChipForDibels(ingredientName, benchmarkAssessmentKey) {
    const {student, dataPointsByAssessmentKey} = this.props;

    const benchmarkDataPoints = dataPointsByAssessmentKey[benchmarkAssessmentKey] || [];
    return (
      <ReaderProfileDialog
        title={ingredientName}
        modalStyle={styles.leftDialog}
        content={
          <DibelsDialog
            gradeNow={student.grade}
            benchmarkDataPoints={benchmarkDataPoints}
          />
        }
        icon={
          <ChipForDibels
            student={student}
            benchmarkDataPoints={benchmarkDataPoints}
          />
        }
      />
    );
  }

  renderChipForFAndPEnglish(ingredientName) {
    const {student, dataPointsByAssessmentKey} = this.props;

    const benchmarkDataPoints = dataPointsByAssessmentKey[F_AND_P_ENGLISH] || [];
    return (
      <ReaderProfileDialog
        title={ingredientName}
        modalStyle={styles.leftDialog}
        content={
          <FAndPDialog
            gradeNow={student.grade}
            benchmarkDataPoints={benchmarkDataPoints}
          />
        }
        icon={
          <ChipForFAndPEnglish
            student={student}
            benchmarkDataPoints={benchmarkDataPoints}
          />
        }
      />
    );
  }

  renderChipForService(serviceTypeId) {
    const {services} = this.props;
    const matchingServices = services.filter(service => service.service_type_id === serviceTypeId);
    if (matchingServices.length === 0) return null;

    return (
      <ChipForService
        serviceTypeId={serviceTypeId}
        matchingServices={matchingServices}
      />
    );
  }
}
ReaderProfileJune.contextTypes = {
  nowFn: PropTypes.func.isRequired,
  districtKey: PropTypes.string.isRequired
};
ReaderProfileJune.propTypes = {
  access: PropTypes.object,
  services: PropTypes.array.isRequired,
  iepContents: PropTypes.object,
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    grade: PropTypes.any.isRequired
  }).isRequired,
  feedCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSchoolYear: PropTypes.number.isRequired,
  dataPointsByAssessmentKey: PropTypes.object.isRequired
};


const styles = {
  rightDialog: {
    content: {
      right: 40,
      left: 'auto',
      width: '55%',
      top: 100,
      bottom: 100
    }
  },
  leftDialog: {
    content: {
      left: 40,
      right: 'auto',
      width: '55%',
      top: 100,
      bottom: 100
    }
  },
};
