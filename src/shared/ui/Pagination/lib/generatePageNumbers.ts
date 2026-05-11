/**
 * Generate the array of page numbers and ellipsis to display.
 * Maintains consistent output width by expanding the sibling range near boundaries.
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxSiblingButtons: number = 2,
  maxBoundaryButtons: number = 1,
): (number | "ellipsis")[] {
  if (totalPages <= 1) return [];

  // Calculate page ranges
  const startBoundary = maxBoundaryButtons;
  const endBoundary = totalPages - maxBoundaryButtons + 1;

  // Calculate sibling range, adjusted to maintain consistent output width
  let siblingStart = currentPage - maxSiblingButtons;
  let siblingEnd = currentPage + maxSiblingButtons;

  // Expand sibling range if we're near boundaries to maintain consistent width
  if (siblingStart <= startBoundary + 1) {
    siblingEnd = Math.min(siblingEnd + (startBoundary + 1 - siblingStart), totalPages);
    siblingStart = startBoundary + 1;
  }

  if (siblingEnd >= endBoundary - 1) {
    siblingStart = Math.max(siblingStart - (siblingEnd - (endBoundary - 1)), 1);
    siblingEnd = endBoundary - 1;
  }

  const pages: (number | "ellipsis")[] = [];
  const addedPages = new Set<number>();

  // Helper to add a page if not already added
  const addPage = (page: number) => {
    if (page >= 1 && page <= totalPages && !addedPages.has(page)) {
      pages.push(page);
      addedPages.add(page);
    }
  };

  // Add start boundary pages
  for (let i = 1; i <= startBoundary && i <= totalPages; i++) {
    addPage(i);
  }

  // Add ellipsis if there's a gap
  if (siblingStart > startBoundary + 1) {
    pages.push("ellipsis");
  }

  // Add sibling pages (skip if overlapping with start boundary)
  for (let i = Math.max(siblingStart, startBoundary + 1); i <= siblingEnd; i++) {
    addPage(i);
  }

  // Add ellipsis if there's a gap before end boundary
  if (siblingEnd < endBoundary - 1) {
    pages.push("ellipsis");
  }

  // Add end boundary pages
  for (let i = Math.max(endBoundary, siblingEnd + 1); i <= totalPages; i++) {
    addPage(i);
  }

  return pages;
}
