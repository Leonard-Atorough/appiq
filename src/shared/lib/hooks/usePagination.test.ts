import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  describe('initialization', () => {
    it('should initialize with default page 1', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10 })
      );
      expect(result.current.currentPage).toBe(1);
    });

    it('should initialize with a custom initial page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 5 })
      );
      expect(result.current.currentPage).toBe(5);
    });
  });

  describe('pagination calculations', () => {
    it('should calculate total pages correctly', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10 })
      );
      expect(result.current.totalPages).toBe(10);
    });

    it('should round up total pages for partial last page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 105, itemsPerPage: 10 })
      );
      expect(result.current.totalPages).toBe(11);
    });

    it('should calculate start index correctly', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10 })
      );
      expect(result.current.startIndex).toBe(0); // Page 1: (1-1) * 10 = 0
    });

    it('should calculate start index for different pages', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 3 })
      );
      expect(result.current.startIndex).toBe(20); // Page 3: (3-1) * 10 = 20
    });

    it('should calculate end index correctly', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10 })
      );
      expect(result.current.endIndex).toBe(9); // Page 1: min(0 + 10 - 1, 100 - 1) = 9
    });

    it('should cap end index at total items minus one', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 10 })
      );
      expect(result.current.endIndex).toBe(99); // Page 10: min(90 + 10 - 1, 100 - 1) = 99
    });

    it('should handle single item per page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 50, itemsPerPage: 1 })
      );
      expect(result.current.totalPages).toBe(50);
      expect(result.current.startIndex).toBe(0);
      expect(result.current.endIndex).toBe(0);
    });

    it('should handle items per page larger than total items', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 5, itemsPerPage: 20 })
      );
      expect(result.current.totalPages).toBe(1);
      expect(result.current.startIndex).toBe(0);
      expect(result.current.endIndex).toBe(4);
    });
  });

  describe('navigation flags', () => {
    it('should have no previous page on first page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 1 })
      );
      expect(result.current.hasPrev).toBe(false);
    });

    it('should have previous page on page 2 or later', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 2 })
      );
      expect(result.current.hasPrev).toBe(true);
    });

    it('should have next page before last page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 5 })
      );
      expect(result.current.hasNext).toBe(true);
    });

    it('should have no next page on last page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 10 })
      );
      expect(result.current.hasNext).toBe(false);
    });

    it('should have no next or previous page on single-page result', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 5, itemsPerPage: 20, initialPage: 1 })
      );
      expect(result.current.hasPrev).toBe(false);
      expect(result.current.hasNext).toBe(false);
    });
  });

  describe('navigation controls', () => {
    it('goToNext should advance to next page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10 })
      );
      act(() => result.current.goToNext());
      expect(result.current.currentPage).toBe(2);
    });

    it('goToNext should not exceed total pages', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 10 })
      );
      act(() => result.current.goToNext());
      expect(result.current.currentPage).toBe(10);
    });

    it('goToPrev should go back to previous page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 3 })
      );
      act(() => result.current.goToPrev());
      expect(result.current.currentPage).toBe(2);
    });

    it('goToPrev should not go below page 1', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 1 })
      );
      act(() => result.current.goToPrev());
      expect(result.current.currentPage).toBe(1);
    });

    it('goToPage should navigate to a specific valid page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10 })
      );
      act(() => result.current.goToPage(5));
      expect(result.current.currentPage).toBe(5);
    });

    it('goToPage should ignore invalid (0 or negative) page numbers', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 5 })
      );
      act(() => result.current.goToPage(0));
      expect(result.current.currentPage).toBe(5);
      act(() => result.current.goToPage(-1));
      expect(result.current.currentPage).toBe(5);
    });

    it('goToPage should ignore page numbers exceeding total pages', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 5 })
      );
      act(() => result.current.goToPage(15));
      expect(result.current.currentPage).toBe(5);
    });

    it('goToStart should jump to first page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10, initialPage: 7 })
      );
      act(() => result.current.goToStart());
      expect(result.current.currentPage).toBe(1);
    });

    it('goToEnd should jump to last page', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10 })
      );
      act(() => result.current.goToEnd());
      expect(result.current.currentPage).toBe(10);
    });
  });

  describe('edge cases', () => {
    it('should handle zero total items', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 0, itemsPerPage: 10 })
      );
      expect(result.current.totalPages).toBe(0);
      expect(result.current.hasNext).toBe(false);
    });

    it('should handle very large item counts', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 1000000, itemsPerPage: 10 })
      );
      expect(result.current.totalPages).toBe(100000);
    });

    it('should update indices when navigating between pages', () => {
      const { result } = renderHook(() =>
        usePagination({ totalItems: 100, itemsPerPage: 10 })
      );

      act(() => result.current.goToPage(3));
      expect(result.current.startIndex).toBe(20);
      expect(result.current.endIndex).toBe(29);

      act(() => result.current.goToNext());
      expect(result.current.startIndex).toBe(30);
      expect(result.current.endIndex).toBe(39);
    });
  });
});
