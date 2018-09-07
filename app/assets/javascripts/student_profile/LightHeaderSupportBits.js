import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {isLimitedOrFlep, prettyEnglishProficiencyText} from '../helpers/language';
import {
  hasInfoAbout504Plan
} from '../helpers/PerDistrict';
import {maybeCapitalize} from '../helpers/pretty';
import HelpBubble, {
  modalFromLeft,
  modalFullScreenWithVerticalScroll
} from '../components/HelpBubble';
import AccessPanel from './AccessPanel';


/*
UI component for seconds column with extra bits about the
student (eg, IEP, FLEP, staff contacts).
*/
export default class LightHeaderSupportBits extends React.Component {
  render() {
    const {style} = this.props;

    // This has to fit within four lines, given parent layout.
    return (
      <div className="LightHeaderSupportBits" style={{...styles.root, style}}>
        {this.render504()}
        {this.renderLanguage()}
        {this.renderIEPLink()}
        {this.renderEducators()}
      </div>
    );
  }

  renderEducators() {
    return (
      <HelpBubble
        style={{marginLeft: 0, display: 'inline-block'}}
        linkStyle={styles.subtitleItem}
        teaser="Educator contacts"
        modalStyle={modalFromLeft}
        title="Educator contacts"
        content={this.renderEducatorContactsDialog()} />
    );
  }

  renderEducatorContactsDialog() {
    return (
      <div style={{fontSize: 14}}>
        <div style={styles.contactItem}>
          {this.renderCounselor()}
        </div>
        <div style={styles.contactItem}>
          {this.renderSpedLiaison()}
        </div>
        {this.renderOtherStaff()}
      </div>
    );
  }

  renderCounselor() {
    const {student} = this.props;
    const {counselor} = student;
    if (!counselor) return null;

    return (
      <div style={styles.contactItem}>
        <div>Counselor:</div>
        <div>{maybeCapitalize(counselor)}</div>
      </div>
    );
  }

  renderSpedLiaison() {
    const {student} = this.props;
    const spedLiaison = student.sped_liaison;
    if (spedLiaison === null || spedLiaison === undefined) return null;
    return (
      <div style={styles.contactItem}>
        <div>SPED liaison:</div>
        <div>{maybeCapitalize(spedLiaison)}</div>
      </div>
    );
  }

  renderOtherStaff() {
    const {activeServices} = this.props;
    const rawEducatorNames = activeServices.map(service => service.provided_by_educator_name);
    const educatorNames = _.compact(_.uniq(rawEducatorNames)).filter(name => name !== '');
    if (educatorNames.length === 0) return null;

    return (
      <div style={styles.contactItem}>
        <div>Educators providing services:</div>
        {educatorNames.map(educatorName => (
          <div key={educatorName}>{educatorName}</div>
        ))}
      </div>
    );
  }

  renderIEPLink() {
    const {student, iepDocument} = this.props;
    const hasDisability = student.disability !== 'None' && student.disability !== null;
    const hasLiaison = student.sped_liaison !== null && student.sped_liaison !== undefined;
    const spedPlacement = student.sped_placement || null;
    const hasIep = (iepDocument || hasDisability || hasLiaison || spedPlacement);

    if (hasIep && iepDocument) return <a target="_blank" href={`/iep_documents/${iepDocument.id}`} style={styles.subtitleItem}>IEP</a>;
    if (hasIep && hasDisability) return <span style={styles.subtitleItem}>IEP for {student.disability}</span>;
    if (hasIep) return <span style={styles.subtitleItem}>IEP</span>;
    return null;
  }

  render504() {
    const {student} = this.props;
    const plan504 = student.plan_504;
    return (hasInfoAbout504Plan(plan504))
      ? <div style={styles.subtitleItem}>504 plan</div>
      : null;
  }

  renderLanguage() {
    const {student, access} = this.props;
    const el = <div style={styles.subtitleItem}>{prettyEnglishProficiencyText(student.limited_english_proficiency)}</div>;

    if (!access) return el;
    return (
      <HelpBubble
        style={{marginLeft: 0, display: 'block'}}
        teaser={el}
        linkStyle={styles.subtitleItem}
        modalStyle={modalFromLeft}
        title="Language learning"
        content={<AccessPanel access={access} />}
      />
    );
  }
}

LightHeaderSupportBits.propTypes = {
  iepDocument: PropTypes.object,
  access: PropTypes.object,
  activeServices: PropTypes.arrayOf(PropTypes.shape({
    provided_by_educator_name: PropTypes.string
  })).isRequired,
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    grade: PropTypes.string,
    disability: PropTypes.string,
    sped_placement: PropTypes.string,
    plan_504: PropTypes.string,
    limited_english_proficiency: PropTypes.string,
    enrollment_status: PropTypes.string,
    home_language: PropTypes.string,
    date_of_birth: PropTypes.string,
    student_address: PropTypes.string,
    primary_phone: PropTypes.string,
    primary_email: PropTypes.string,
    house: PropTypes.string,
    counselor: PropTypes.string,
    sped_liaison: PropTypes.string,
    homeroom_id: PropTypes.number,
    school_name: PropTypes.string,
    school_local_id: PropTypes.string,
    homeroom_name: PropTypes.string,
    has_photo: PropTypes.bool
  }).isRequired,
  style: PropTypes.object
};

const styles = {
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  overviewColumn: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  subtitleItem: {
    display: 'inline-block',
    fontSize: 14
  },
  contactItem: {
    paddingTop: 6
  },
  svgIcon: {
    fill: "#3177c9",
    opacity: 0.5
  },
  carousel: {
    flex: 1,
    display: 'flex'
  }
};

