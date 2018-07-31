import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import {toMomentFromTime} from '../helpers/toMoment';
import Educator from '../components/Educator';
import HelpBubble from '../components/HelpBubble';
import {parseTransitionNoteText} from './lightTransitionNotes';


export function sampleQuotes(style) {  
  const quotes = [
    'Smart, very athletic, baseball, works w/uncle (carpenter)',
    'Truly bilingual in English & French',
    'Analytical and precise, really good at work with keeping tracking of lots of details.  Enjoys baking at home and teaching her younger sister.',
    'Very social; gets along well w/adults and most kids'
  ];
  return quotes.map(quote => {
    const dateText = moment.utc().subtract(Math.random() * 30, 'days').format('M/D/YY');
    const tagline = <span><a href="#" style={style}>Samwise Gamgee</a>, Counselor</span>;
    const source = <span><a href="#" style={{fontSize: 12}}>Transition note</a> on {dateText}</span>;
    return {quote, tagline, source};
  });
}

export function quotesFrom(transitionNotes, educatorsIndex, style) {
  const safeNotes = transitionNotes.filter(transitionNote => !transitionNote.is_restricted);

  return _.flatten(safeNotes.map(note => {
    const dateText = toMomentFromTime(note.recorded_at).format('M/D/YY');
    const educator = educatorsIndex[note.educator_id] || educatorsIndex[_.keys(educatorsIndex)[0]];
    const tagline = <span>from <Educator style={style} educator={educator} /></span>;
    const source = (
      <span>
        <span>in</span>
        <HelpBubble
          style={{marginLeft: 5, marginRight: 5}}
          linkStyle={style}
          teaser="Transition note"
          title="Transition note"
          content={renderTransitionNote(note.text, dateText, <Educator educator={educator} />)} />
        <span>on {dateText}</span>
      </span>
    );

    // only strengths for now
    const noteParts = parseTransitionNoteText(note.text);
    const quote = noteParts.strengths;
    if (!quote || quote.length === 0) return [];
    return [{quote, source, tagline}];
  }));
   
}


export function upsellQuotes(student, style) {
  return [{
    quote: (
      <div>
        <div>Share an insight!</div>
        <textarea rows={3} style={{
          border: 0,
          background: '#f9f9f9',
          fontSize: 12,
          width: '100%',
          marginTop: 10
        }} placeholder={`What's one of ${student.first_name}'s strengths?`} />
      </div>
    ),
    withoutQuotes: true,
    source: <span>See <a href="#" style={style}>Ileana</a> or <a href="#" style={style}>Manuel</a> for examples.</span>,
    tagline: ''
  }];
}


function renderTransitionNote(text, dateText, educatorEl) {
  return (
    <div>
      <div style={{
        whiteSpace: 'pre',
        marginBottom: 10,
        padding: 20,
        border: '1px solid #ccc',
        background: '#eee'
      }}>{text}</div>
      <div>by {educatorEl}</div>
      <div>on {dateText}</div>
    </div>
  );
}