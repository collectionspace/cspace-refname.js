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

  const parts = refName.split(':', 5);
  const namePart = parts[4];

  if (
    namePart &&
    namePart.indexOf('name(') === 0 &&
    namePart.lastIndexOf(')') === namePart.length - 1
  ) {
    return namePart.substring(5, namePart.length - 1);
  }

  return null;
};

