/**
 * Retrieves the display name from a given ref name.
 * @param {string} refName - The ref name
 * @returns {string} The display name, or null if the ref name does not contain a display name.
 */
export const getDisplayName = (refName) => {
  if (!refName || refName.charAt(refName.length - 1) !== "'") {
    return null;
  }

  const start = refName.indexOf("'");

  if (start < 0 || start === refName.length - 1) {
    return null;
  }

  return refName.substring(start + 1, refName.length - 1);
};

/**
 * Retrieves the service path from a given ref name.
 * @param {string} refName - The ref name
 * @returns {string} The service path, or null if the ref name does not contain a service path.
 */
export const getServicePath = (refName) => {
  if (!refName) {
    return null;
  }

  const parts = refName.split(':', 4);

  return parts[3] || null;
};

/**
 * Retrieves the vocabulary shord identifier from a given ref name.
 * @param {string} refName - The ref name
 * @returns {string} The short ID, or null if the ref name does not contain a vocabulary short ID.
 */
export const getVocabularyShortID = (refName) => {
  if (!refName) {
    return null;
  }

  const parts = refName.split(':', 6);
  const itemPart = parts[5];

  if (itemPart === 'item') {
    const vocabNamePart = parts[4];

    if (
      vocabNamePart &&
      vocabNamePart.indexOf('name(') === 0 &&
      vocabNamePart.lastIndexOf(')') === vocabNamePart.length - 1
    ) {
      return vocabNamePart.substring(5, vocabNamePart.length - 1);
    }
  }

  return null;
};

/**
 * Retrieves the vocabulary item short identifier from a given ref name.
 * @param {string} refName - The ref name
 * @returns {string} The short ID, or null if the ref name does not contain a vocabulary item
 * short ID.
 */
export const getItemShortID = (refName) => {
  if (!refName) {
    return null;
  }

  const parts = refName.split(':', 7);
  const itemPart = parts[5];

  if (itemPart === 'item') {
    const itemNamePart = parts[6];

    if (
      itemNamePart &&
      itemNamePart.indexOf('name(') === 0
    ) {
      const index = itemNamePart.indexOf(')');

      if (index > -1) {
        return itemNamePart.substring(5, index);
      }
    }
  }

  return null;
};

/**
 * Retrieves the csid from a given ref name, if present.
 * @param {string} refName - The ref name
 * @returns {string} The csid, or null if the ref name does not contain a csid.
 */
export const getCsid = (refName) => {
  if (!refName) {
    return null;
  }

  const parts = refName.split(':', 5);
  const idPart = parts[4];

  if (
    idPart &&
    idPart.indexOf('id(') === 0
  ) {
    const index = idPart.indexOf(')');

    if (index > -1) {
      return idPart.substring(3, index);
    }
  }

  return null;
};

export const removeDisplayName = (refName) => {
  if (!refName) {
    return refName;
  }

  const start = refName.indexOf("'");

  if (start < 0) {
    return refName;
  }

  return refName.substring(0, start);
};

export const setDisplayName = (refName, displayName) => {
  if (!refName) {
    return refName;
  }

  const strippedRefName = removeDisplayName(refName);

  return `${strippedRefName}'${displayName}'`;
};
