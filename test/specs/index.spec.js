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

const expect = chai.expect;

chai.should();

describe('getDisplayName', function suite() {
  it('should return null if the ref name is null, undefined, or empty', function test() {
    expect(getDisplayName(null)).to.equal(null);
    expect(getDisplayName(undefined)).to.equal(null);
    expect(getDisplayName('')).to.equal(null);
  });

  it('should return null if the ref name has no display name', function test() {
    expect(getDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)'
    )).to.equal(null);
  });

  it('should return null if the ref name has a malformed display name', function test() {
    expect(getDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Uh oh no closing quote'
    )).to.equal(null);

    expect(getDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)Uh oh no opening quote\''
    )).to.equal(null);
  });

  it('should return the display name', function test() {
    getDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\''
    ).should.equal('Ancient Greek');
  });

  it('should return an empty display name', function test() {
    getDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'\''
    ).should.equal('');
  });
});

describe('getServicePath', function suite() {
  it('should return null if the ref name is null, undefined, or empty', function test() {
    expect(getServicePath(null)).to.equal(null);
    expect(getServicePath(undefined)).to.equal(null);
    expect(getServicePath('')).to.equal(null);
  });

  it('should return the service path', function test() {
    expect(getServicePath(
      'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\''
    )).to.equal('personauthorities');

    expect(getServicePath(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\''
    )).to.equal('vocabularies');
  });
});

describe('getVocabularyShortID', function suite() {
  it('should return null if the ref name is null, undefined, or empty', function test() {
    expect(getVocabularyShortID(null)).to.equal(null);
    expect(getVocabularyShortID(undefined)).to.equal(null);
    expect(getVocabularyShortID('')).to.equal(null);
  });

  it('should return null if the ref name does not have a vocabulary short id', function test() {
    expect(getVocabularyShortID(
      'urn:cspace:core.collectionspace.org:collectionobjects:id(36b64339-69ef-4c90-941f)\'LI2017.1.14\''
    )).to.equal(null);

    expect(getVocabularyShortID(
      'urn:cspace:core.collectionspace.org:groups:id(d5129f1e-0c33-410f-9bb4)'
    )).to.equal(null);
  });

  it('should return the vocabulary short id', function test() {
    expect(getVocabularyShortID(
      'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\''
    )).to.equal('person');

    expect(getVocabularyShortID(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\''
    )).to.equal('languages');
  });
});

describe('getItemShortID', function suite() {
  it('should return null if the ref name is null, undefined, or empty', function test() {
    expect(getItemShortID(null)).to.equal(null);
    expect(getItemShortID(undefined)).to.equal(null);
    expect(getItemShortID('')).to.equal(null);
  });

  it('should return null if the ref name does not have an item short id', function test() {
    expect(getItemShortID(
      'urn:cspace:core.collectionspace.org:collectionobjects:id(36b64339-69ef-4c90-941f)\'LI2017.1.14\''
    )).to.equal(null);

    expect(getItemShortID(
      'urn:cspace:core.collectionspace.org:groups:id(d5129f1e-0c33-410f-9bb4)'
    )).to.equal(null);
  });

  it('should return the item short id', function test() {
    expect(getItemShortID(
      'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\''
    )).to.equal('JaneDoe1484001439799');

    expect(getItemShortID(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\''
    )).to.equal('grc');
  });
});

describe('getCsid', function suite() {
  it('should return null if the ref name is null, undefined, or empty', function test() {
    expect(getCsid(null)).to.equal(null);
    expect(getCsid(undefined)).to.equal(null);
    expect(getCsid('')).to.equal(null);
  });

  it('should return null if the ref name does not have a csid', function test() {
    expect(getCsid(
      'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\''
    )).to.equal(null);

    expect(getCsid(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\''
    )).to.equal(null);
  });

  it('should return the csid', function test() {
    expect(getCsid(
      'urn:cspace:core.collectionspace.org:collectionobjects:id(36b64339-69ef-4c90-941f)\'LI2017.1.14\''
    )).to.equal('36b64339-69ef-4c90-941f');
  });
});

describe('removeDisplayName', function suite() {
  it('should return the ref name if it is null, undefined, or empty', function test() {
    expect(removeDisplayName(null)).to.equal(null);
    expect(removeDisplayName(undefined)).to.equal(undefined);
    expect(removeDisplayName('')).to.equal('');
  });

  it('should return the ref name if it does not have a display name', function test() {
    const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)';

    removeDisplayName(refName).should.equal(refName);
  });

  it('should return a ref name with no display name', function test() {
    expect(removeDisplayName(
      'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\''
    )).to.equal('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)');

    expect(removeDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\''
    )).to.equal('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)');
  });
});

describe('setDisplayName', function suite() {
  it('should return the ref name if it is null, undefined, or empty', function test() {
    expect(setDisplayName(null, 'foo')).to.equal(null);
    expect(setDisplayName(undefined, 'foo')).to.equal(undefined);
    expect(setDisplayName('', 'foo')).to.equal('');
  });

  it('should append the display name to the ref name if it does not have a display name', function test() {
    const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)';

    setDisplayName(refName, 'foo').should.equal(
      'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'foo\''
    );
  });

  it('should replace the display name on a ref name that has a display name', function test() {
    expect(setDisplayName(
      'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'',
      'new one'
    )).to.equal('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'new one\'');

    expect(setDisplayName(
      'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\'',
      'something else'
    )).to.equal('urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'something else\'');
  });
});
