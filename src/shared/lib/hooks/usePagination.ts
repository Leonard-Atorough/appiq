import { useState, useMemo } from "react";
import { calculatePaginationState } from './calculatePaginationState';

export interface PaginationOptions {
  /** Total number of items to paginate. */
  totalItems: number;
  /** Number of items per page. */
  itemsPerPage: number;
  /** Initial page number. Defaults to 1. */
  initialPage?: number;
}

export interface PaginationResult {
  /** Total number of pages. */
  totalPages: number;
  /** Current page number (1-indexed). */
  currentPage: number;
  /** Index of the first item on the current page (0-indexed). */
  startIndex: number;
  /** Index of the last item on the current page (0-indexed). */
  endIndex: number;
  /** Whether there is a previous page. */
  hasPrev: boolean;
  /** Whether there is a next page. */
  hasNext: boolean;
  /** Navigate to the next page. */
  goToNext: () => void;
  /** Navigate to the previous page. */
  goToPrev: () => void;
  /** Navigate to a specific page number (1-indexed). Invalid page numbers are ignored. */
  goToPage: (page: number) => void;
  /** Jump to the first page. */
  goToStart: () => void;
  /** Jump to the last page. */
  goToEnd: () => void;
}

/**
 * Hook for managing pagination state and navigation.
 *
 * @param options - Configuration options for pagination.
 * @param options.totalItems - Total number of items to paginate.
 * @param options.itemsPerPage - Number of items to display per page.
 * @param options.initialPage - Initial page number (1-indexed). Defaults to 1.
 * @returns Pagination state and control functions.
 *
 * @example
 * const { currentPage, totalPages, startIndex, endIndex, goToNext, goToPrev } =
 *   usePagination({ totalItems: 100, itemsPerPage: 10 });
 */
export function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 1,
}: PaginationOptions): PaginationResult {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Use shared utility to calculate state
  const { totalPages, startIndex, endIndex, hasPrev, hasNext } = useMemo(
    () => calculatePaginationState(totalItems, itemsPerPage, currentPage),
    [totalItems, itemsPerPage, currentPage],
  );

  const goToNext = () => {
    if (hasNext) setCurrentPage(currentPage + 1);
  };

  const goToPrev = () => {
    if (hasPrev) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const goToStart = () => setCurrentPage(1);
  const goToEnd = () => setCurrentPage(totalPages);

  return {
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    hasPrev,
    hasNext,
    goToNext,
    goToPrev,
    goToPage,
    goToStart,
    goToEnd,
  };
}
