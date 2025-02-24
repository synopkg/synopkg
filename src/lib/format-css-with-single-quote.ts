import { memoize } from '../utils/memoize';

/**
 * Memoized CSS formatter for better performance with repeated calls
 */
export const formatCssWithSingleQuote = memoize((file: { contents: string }) => {
  // Add caching for large files
  const cacheKey = `css-format-${hashContent(file.contents)}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  // Process in chunks for large files
  if (file.contents.length > 50000) {
    return processLargeFile(file);
  }

  // Regular processing for smaller files
  const result = /* formatting logic */;
  setCache(cacheKey, result);
  return result;
});
