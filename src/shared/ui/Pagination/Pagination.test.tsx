import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  describe("rendering", () => {
    it("should not render if total pages is 1", () => {
      const { container } = render(
        <Pagination
          totalItems={10}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={vi.fn()}
        />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("should render navigation when more than 1 page", () => {
      render(
        <Pagination
          totalItems={20}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={vi.fn()}
        />,
      );
      expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    });

    it("should render page number buttons", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={2}
          onPageChange={vi.fn()}
        />,
      );
      expect(screen.getByLabelText("Go to page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 5")).toBeInTheDocument();
    });
  });

  describe("first/last buttons", () => {
    it("should show first/last buttons when showFirstLast is true", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={3}
          onPageChange={vi.fn()}
          showFirstLast
        />,
      );
      expect(screen.getByLabelText("Go to first page")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to last page")).toBeInTheDocument();
    });

    it("should hide first/last buttons when showFirstLast is false", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={3}
          onPageChange={vi.fn()}
          showFirstLast={false}
        />,
      );
      expect(screen.queryByLabelText("Go to first page")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Go to last page")).not.toBeInTheDocument();
    });

    it("should disable first button on first page", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={vi.fn()}
          showFirstLast
        />,
      );
      expect(screen.getByLabelText("Go to first page")).toBeDisabled();
    });

    it("should disable last button on last page", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={5}
          onPageChange={vi.fn()}
          showFirstLast
        />,
      );
      expect(screen.getByLabelText("Go to last page")).toBeDisabled();
    });
  });

  describe("prev/next buttons", () => {
    it("should show prev/next buttons when showPrevNext is true", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={2}
          onPageChange={vi.fn()}
          showPrevNext
        />,
      );
      expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
    });

    it("should hide prev/next buttons when showPrevNext is false", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={2}
          onPageChange={vi.fn()}
          showPrevNext={false}
        />,
      );
      expect(screen.queryByLabelText("Go to previous page")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Go to next page")).not.toBeInTheDocument();
    });

    it("should disable prev button on first page", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={vi.fn()}
          showPrevNext
        />,
      );
      expect(screen.getByLabelText("Go to previous page")).toBeDisabled();
    });

    it("should disable next button on last page", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={5}
          onPageChange={vi.fn()}
          showPrevNext
        />,
      );
      expect(screen.getByLabelText("Go to next page")).toBeDisabled();
    });
  });

  describe("active page indicator", () => {
    it("should mark current page as active", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={3}
          onPageChange={vi.fn()}
        />,
      );
      const activeButton = screen.getByLabelText("Go to page 3");
      expect(activeButton).toHaveAttribute("aria-current", "page");
    });

    it("should not mark other pages as active", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={3}
          onPageChange={vi.fn()}
        />,
      );
      expect(screen.getByLabelText("Go to page 1")).not.toHaveAttribute("aria-current");
      expect(screen.getByLabelText("Go to page 2")).not.toHaveAttribute("aria-current");
    });
  });

  describe("page navigation callbacks", () => {
    it("should call onPageChange when clicking a page button", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={onPageChange}
        />,
      );
      await user.click(screen.getByLabelText("Go to page 3"));
      expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it("should call onPageChange when clicking next button", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={2}
          onPageChange={onPageChange}
          showPrevNext
        />,
      );
      await user.click(screen.getByLabelText("Go to next page"));
      expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it("should call onPageChange when clicking previous button", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={3}
          onPageChange={onPageChange}
          showPrevNext
        />,
      );
      await user.click(screen.getByLabelText("Go to previous page"));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("should call onPageChange with 1 when clicking first button", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={4}
          onPageChange={onPageChange}
          showFirstLast
        />,
      );
      await user.click(screen.getByLabelText("Go to first page"));
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it("should call onPageChange with last page number when clicking last button", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={2}
          onPageChange={onPageChange}
          showFirstLast
        />,
      );
      await user.click(screen.getByLabelText("Go to last page"));
      expect(onPageChange).toHaveBeenCalledWith(5);
    });

    it("should not call onPageChange when clicking disabled buttons", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={onPageChange}
          showPrevNext
        />,
      );
      const prevButton = screen.getByLabelText("Go to previous page");
      expect(prevButton).toBeDisabled();
      await user.click(prevButton);
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });

  describe("ellipsis rendering", () => {
    it("should render ellipsis when there are gaps in page numbers", () => {
      render(
        <Pagination
          totalItems={200}
          itemsPerPage={10}
          currentPage={10}
          onPageChange={vi.fn()}
          maxSiblingButtons={1}
          maxBoundaryButtons={1}
        />,
      );
      const ellipsis = screen.queryAllByText("…");
      expect(ellipsis.length).toBeGreaterThan(0);
    });

    it("should not render ellipsis when all pages fit without gaps", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={2}
          onPageChange={vi.fn()}
        />,
      );
      expect(screen.queryByText("…")).not.toBeInTheDocument();
    });
  });

  describe("custom icons", () => {
    it("should use custom icons when provided", () => {
      const customIcons = {
        previous: "◀",
        next: "▶",
        first: "⏮",
        last: "⏭",
      };
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={2}
          onPageChange={vi.fn()}
          icons={customIcons}
          showFirstLast
          showPrevNext
        />,
      );
      expect(screen.getByLabelText("Go to first page")).toHaveTextContent("⏮");
      expect(screen.getByLabelText("Go to previous page")).toHaveTextContent("◀");
      expect(screen.getByLabelText("Go to next page")).toHaveTextContent("▶");
      expect(screen.getByLabelText("Go to last page")).toHaveTextContent("⏭");
    });

    it("should use default icons when no custom icons provided", () => {
      const { container } = render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={2}
          onPageChange={vi.fn()}
          showFirstLast
          showPrevNext
        />,
      );
      // Icon component should render
      expect(container.querySelectorAll("svg").length).toBeGreaterThan(0);
    });
  });

  describe("accessibility", () => {
    it("should have proper semantic navigation role", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={2}
          onPageChange={vi.fn()}
        />,
      );
      expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    });

    it("should have aria-label on all buttons", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={2}
          onPageChange={vi.fn()}
          showFirstLast
          showPrevNext
        />,
      );
      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveAttribute("aria-label");
      });
    });

    it("should have aria-current on active page", () => {
      render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={3}
          onPageChange={vi.fn()}
        />,
      );
      expect(screen.getByLabelText("Go to page 3")).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("should mark ellipsis as aria-hidden", () => {
      render(
        <Pagination
          totalItems={200}
          itemsPerPage={10}
          currentPage={10}
          onPageChange={vi.fn()}
          maxSiblingButtons={1}
          maxBoundaryButtons={1}
        />,
      );
      const ellipsis = screen.queryAllByText("…");
      ellipsis.forEach((el) => {
        // The ellipsis element itself should have aria-hidden
        expect(el.closest("div[aria-hidden]")).toHaveAttribute("aria-hidden", "true");
      });
    });
  });

  describe("custom className", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={vi.fn()}
          className="custom-class"
        />,
      );
      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });
  });
});
