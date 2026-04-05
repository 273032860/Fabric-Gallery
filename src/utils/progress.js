/**
 * Maps a value from a given input range [inStart, inEnd] to an output range [outStart, outEnd].
 * Clamps the value to the output range.
 *
 * @param {number} value - The input value to map.
 * @param {number} inStart - The start of the input range.
 * @param {number} inEnd - The end of the input range.
 * @param {number} outStart - The start of the output range.
 * @param {number} outEnd - The end of the output range.
 * @returns {number} The mapped and clamped value.
 */
export const mapRange = (value, inStart, inEnd, outStart, outEnd) => {
  // Avoid division by zero
  if (inStart === inEnd) {
    return value >= inStart ? outEnd : outStart;
  }

  const mapped = ((value - inStart) / (inEnd - inStart)) * (outEnd - outStart) + outStart;

  // Clamp the value to the output range
  if (outStart < outEnd) {
    return Math.max(outStart, Math.min(outEnd, mapped));
  } else {
    return Math.max(outEnd, Math.min(outStart, mapped));
  }
};

/**
 * Maps a progress value from a given range [start, end] to [0, 1].
 * This is a specific case of mapRange.
 *
 * @param {number} progress - The input progress value.
 * @param {number} start - The start of the input range.
 * @param {number} end - The end of the input range.
 * @returns {number} The mapped progress value from 0 to 1.
 */
export const mapProgress = (progress, start, end) => {
  return mapRange(progress, start, end, 0, 1);
};
