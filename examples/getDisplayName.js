import { getDisplayName } from '../src';

const refName = 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\'';
const displayName = getDisplayName(refName);

console.log(`The display name is "${displayName}"`);
