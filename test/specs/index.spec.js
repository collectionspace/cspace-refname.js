import chai from 'chai';

import {
  getCsid,
  getDisplayName,
  getServicePath,
  getVocabularyShortID,
  getItemShortID,
  removeDisplayName,
  setDisplayName,
} from '../../src/index';

const { expect } = chai;

chai.should();

describe('getDisplayName', () => {
  it('should return null if the ref name is null, undefined, or empty', () => {
    expect(getDisplayName(null)).to.equal(null);
    expect(getDisplayName(undefined)).to.equal(null);
    expect(getDisplayName('')).to.equal(null);
  });

  it('should return null if the ref name has no display name', () => {
    expect(getDisplayName('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)'))
      .to.equal(null);
  });

  it('should return null if the ref name has a malformed display name', () => {
    expect(getDisplayName('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Uh oh no closing quote'))
      .to.equal(null);

    expect(getDisplayName('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)Uh oh no opening quote\''))
      .to.equal(null);
  });

  it('should return the display name', () => {
    getDisplayName('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\'')
      .should.equal('Ancient Greek');
  });

  it('should return an empty display name', () => {
    getDisplayName('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'\'')
      .should.equal('');
  });
});

describe('getServicePath', () => {
  it('should return null if the ref name is null, undefined, or empty', () => {
    expect(getServicePath(null)).to.equal(null);
    expect(getServicePath(undefined)).to.equal(null);
    expect(getServicePath('')).to.equal(null);
  });

  it('should return the service path', () => {
    getServicePath('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'')
      .should.equal('personauthorities');

    getServicePath('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\'')
      .should.equal('vocabularies');
  });
});

describe('getVocabularyShortID', () => {
  it('should return null if the ref name is null, undefined, or empty', () => {
    expect(getVocabularyShortID(null)).to.equal(null);
    expect(getVocabularyShortID(undefined)).to.equal(null);
    expect(getVocabularyShortID('')).to.equal(null);
  });

  it('should return null if the ref name does not have a vocabulary short id', () => {
    expect(getVocabularyShortID('urn:cspace:core.collectionspace.org:collectionobjects:id(36b64339-69ef-4c90-941f)\'LI2017.1.14\''))
      .to.equal(null);

    expect(getVocabularyShortID('urn:cspace:core.collectionspace.org:groups:id(d5129f1e-0c33-410f-9bb4)'))
      .to.equal(null);
  });

  it('should return the vocabulary short id', () => {
    getVocabularyShortID('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'')
      .should.equal('person');

    getVocabularyShortID('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\'')
      .should.equal('languages');
  });
});

describe('getItemShortID', () => {
  it('should return null if the ref name is null, undefined, or empty', () => {
    expect(getItemShortID(null)).to.equal(null);
    expect(getItemShortID(undefined)).to.equal(null);
    expect(getItemShortID('')).to.equal(null);
  });

  it('should return null if the ref name does not have an item short id', () => {
    expect(getItemShortID('urn:cspace:core.collectionspace.org:collectionobjects:id(36b64339-69ef-4c90-941f)\'LI2017.1.14\''))
      .to.equal(null);

    expect(getItemShortID('urn:cspace:core.collectionspace.org:groups:id(d5129f1e-0c33-410f-9bb4)'))
      .to.equal(null);
  });

  it('should return the item short id', () => {
    getItemShortID('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'')
      .should.equal('JaneDoe1484001439799');

    getItemShortID('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\'')
      .should.equal('grc');
  });
});

describe('getCsid', () => {
  it('should return null if the ref name is null, undefined, or empty', () => {
    expect(getCsid(null)).to.equal(null);
    expect(getCsid(undefined)).to.equal(null);
    expect(getCsid('')).to.equal(null);
  });

  it('should return null if the ref name does not have a csid', () => {
    expect(getCsid('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\''))
      .to.equal(null);

    expect(getCsid('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\''))
      .to.equal(null);
  });

  it('should return the csid', () => {
    getCsid('urn:cspace:core.collectionspace.org:collectionobjects:id(36b64339-69ef-4c90-941f)\'LI2017.1.14\'')
      .should.equal('36b64339-69ef-4c90-941f');
  });
});

describe('removeDisplayName', () => {
  it('should return the ref name if it is null, undefined, or empty', () => {
    expect(removeDisplayName(null)).to.equal(null);
    expect(removeDisplayName(undefined)).to.equal(undefined);

    removeDisplayName('').should.equal('');
  });

  it('should return the ref name if it does not have a display name', () => {
    const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)';

    removeDisplayName(refName).should.equal(refName);
  });

  it('should return a ref name with no display name', () => {
    removeDisplayName('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'')
      .should.equal('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)');

    removeDisplayName('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\'')
      .should.equal('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)');
  });
});

describe('setDisplayName', () => {
  it('should return the ref name if it is null, undefined, or empty', () => {
    expect(setDisplayName(null, 'foo')).to.equal(null);
    expect(setDisplayName(undefined, 'foo')).to.equal(undefined);

    setDisplayName('', 'foo').should.equal('');
  });

  it('should append the display name to the ref name if it does not have a display name', () => {
    const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)';

    setDisplayName(refName, 'foo').should
      .equal('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'foo\'');
  });

  it('should replace the display name on a ref name that has a display name', () => {
    setDisplayName(
      'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'',
      'new one',
    ).should.equal('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'new one\'');

    setDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\'',
      'something else',
    ).should.equal('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'something else\'');
  });
});
