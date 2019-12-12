import { getDisplayName } from '../src';

const refName = 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(grc)\'Ancient Greek\'';
const displayName = getDisplayName(refName);

// eslint-disable-next-line no-console
console.log(`The display name is "${displayName}"`);
