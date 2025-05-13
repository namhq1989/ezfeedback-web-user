/**
 * Formats a number to a human-readable string
 * @param num The number to format
 * @param options Formatting options
 * @returns Formatted number string
 */
export const formatNumber = (
  num: number,
  options: {
    /** Whether to use compact notation for large numbers (e.g., 1.2k) */
    compact?: boolean
    /** Number of decimal places to show */
    decimals?: number
  } = {},
): string => {
  const { compact = true, decimals = 1 } = options

  // Handle edge cases
  if (num === 0) return '0'
  if (!num) return ''

  // Format with compact notation for large numbers
  if (compact) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(decimals).replace(/\.0$/, '') + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(decimals).replace(/\.0$/, '') + 'k'
    }
  }

  // Regular formatting for smaller numbers
  return num.toString()
}
