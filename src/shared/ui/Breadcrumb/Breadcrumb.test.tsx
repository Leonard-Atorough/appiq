import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Applications", href: "/applications" },
    { label: "Job #123" },
  ];

  describe("Rendering", () => {
    it("renders breadcrumb with items", () => {
      render(<Breadcrumb items={items} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Applications")).toBeInTheDocument();
      expect(screen.getByText("Job #123")).toBeInTheDocument();
    });

    it("renders nav with aria-label", () => {
      render(<Breadcrumb items={items} />);
      expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toBeInTheDocument();
    });

    it("renders list items in order", () => {
      const { container } = render(<Breadcrumb items={items} />);
      const listItems = container.querySelectorAll("ol li");
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  describe("Links", () => {
    it("renders middle items as links", () => {
      render(<Breadcrumb items={items} />);
      const homeLink = screen.getByText("Home").closest("a");
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("renders last item as text by default", () => {
      render(<Breadcrumb items={items} />);
      const lastItem = screen.getByText("Job #123");
      expect(lastItem.closest("a")).not.toBeInTheDocument();
      expect(lastItem).toHaveAttribute("aria-current", "page");
    });

    it("renders last item as link when lastItemAsLink=true", () => {
      const linkItems = [...items];
      linkItems[2] = { ...linkItems[2], href: "/jobs/123" };
      render(<Breadcrumb items={linkItems} lastItemAsLink={true} />);
      const lastLink = screen.getByText("Job #123").closest("a");
      expect(lastLink).toHaveAttribute("href", "/jobs/123");
    });

    it("renders disabled items as text", () => {
      const disabledItems = [
        { label: "Home", href: "/" },
        { label: "Disabled", disabled: true, href: "/disabled" },
        { label: "Current" },
      ];
      render(<Breadcrumb items={disabledItems} />);
      const disabledItem = screen.getByText("Disabled");
      expect(disabledItem.closest("a")).not.toBeInTheDocument();
      expect(disabledItem).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Separators", () => {
    it("renders default separator between items", () => {
      const { container } = render(<Breadcrumb items={items} />);
      const separators = container.querySelectorAll("li[aria-hidden='true']");
      expect(separators.length).toBeGreaterThan(0);
    });

    it("renders custom separator", () => {
      const { container } = render(<Breadcrumb items={items} separator=">" />);
      const separator = container.querySelector("li[aria-hidden='true']");
      expect(separator).toHaveTextContent(">");
    });

    it("does not render separator after last item", () => {
      const { container } = render(<Breadcrumb items={items} />);
      // Check that there's no separator after the last text item
      const lastItem = container.querySelectorAll("li")[-1];
      // Last visible element should not have aria-hidden
      expect(lastItem).not.toHaveAttribute("aria-hidden");
    });
  });

  describe("Collapsing", () => {
    const longItems = Array.from({ length: 8 }, (_, i) => ({
      label: `Item ${i}`,
      href: `/item-${i}`,
    }));

    it("does not collapse when items <= maxItems", () => {
      render(<Breadcrumb items={items} maxItems={5} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Applications")).toBeInTheDocument();
      expect(screen.getByText("Job #123")).toBeInTheDocument();
    });

    it("collapses from start by default", () => {
      render(<Breadcrumb items={longItems} maxItems={3} collapseFrom="start" />);
      // First items should be hidden
      expect(screen.queryByText("Item 0")).not.toBeInTheDocument();
      // Last items should be visible
      expect(screen.getByText("Item 7")).toBeInTheDocument();
    });

    it("collapses from end when specified", () => {
      render(<Breadcrumb items={longItems} maxItems={3} collapseFrom="end" />);
      // First items should be visible
      expect(screen.getByText("Item 0")).toBeInTheDocument();
      // Last items should be hidden
      expect(screen.queryByText("Item 7")).not.toBeInTheDocument();
    });

    it("renders dropdown for collapsed items by default", () => {
      const { container } = render(<Breadcrumb items={longItems} maxItems={3} useDropdown={true} />);
      const dropdownButton = container.querySelector("button");
      expect(dropdownButton).toBeInTheDocument();
    });

    it("renders expand button for collapsed items when useDropdown=false", async () => {
      const user = userEvent.setup();
      render(<Breadcrumb items={longItems} maxItems={3} useDropdown={false} />);
      const expandButton = screen.getByRole("button", { name: /more/i });
      expect(expandButton).toBeInTheDocument();

      await user.click(expandButton);
      // After clicking, collapsed items should appear
      expect(screen.getByText("Item 0")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("last item has aria-current='page'", () => {
      render(<Breadcrumb items={items} />);
      const lastItem = screen.getByText("Job #123");
      expect(lastItem).toHaveAttribute("aria-current", "page");
    });

    it("separators have aria-hidden='true'", () => {
      const { container } = render(<Breadcrumb items={items} />);
      const separators = container.querySelectorAll("li[aria-hidden='true']");
      separators.forEach((sep) => {
        expect(sep).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("disabled items have aria-disabled='true'", () => {
      const disabledItems = [
        { label: "Home", href: "/" },
        { label: "Disabled", disabled: true },
      ];
      render(<Breadcrumb items={disabledItems} />);
      const disabledItem = screen.getByText("Disabled");
      expect(disabledItem).toHaveAttribute("aria-disabled", "true");
    });

    it("supports custom aria-labels", () => {
      const itemsWithLabels = [
        { label: "Home", href: "/", ariaLabel: "Go to homepage" },
      ];
      render(<Breadcrumb items={itemsWithLabels} />);
      const homeLink = screen.getByText("Home").closest("a");
      expect(homeLink).toHaveAttribute("aria-label", "Go to homepage");
    });
  });
});
