/**
 * capitalize the first letter of each word in a sentence
 *
 * @param {str} myStr
 */
export default function capitalize(myStr) {
  if (!myStr) {
    return myStr;
  }
  return myStr
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
}
