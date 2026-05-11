/**
 * Pure utility for calculating pagination state.
 * Used by both usePagination hook and Pagination component to ensure consistency.
 */
export interface PaginationState {
  /** Total number of pages. */
  totalPages: number;
  /** Index of the first item on the current page (0-indexed). */
  startIndex: number;
  /** Index of the last item on the current page (0-indexed). */
  endIndex: number;
  /** Whether there is a previous page. */
  hasPrev: boolean;
  /** Whether there is a next page. */
  hasNext: boolean;
}

/**
 * Calculate pagination state given total items, items per page, and current page.
 * This is the single source of truth for pagination calculations.
 *
 * @param totalItems - Total number of items to paginate
 * @param itemsPerPage - Number of items per page
 * @param currentPage - Current page number (1-indexed)
 * @returns Pagination state object with totalPages, indices, and navigation flags
 */
export function calculatePaginationState(
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
): PaginationState {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  return {
    totalPages,
    startIndex,
    endIndex,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}
