import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  describe("Rendering", () => {
    it("renders children content", () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText("Card content")).toBeTruthy();
    });

    it("renders header when provided", () => {
      render(<Card header="Software Engineer">Content</Card>);
      expect(screen.getByText("Software Engineer")).toBeTruthy();
    });

    it("renders footer when provided", () => {
      render(<Card footer="Applied via LinkedIn">Content</Card>);
      expect(screen.getByText("Applied via LinkedIn")).toBeTruthy();
    });

    it("renders thumbnail with alt text when provided", () => {
      render(
        <Card thumbnail="https://example.com/img.png" thumbnailAlt="Company banner">
          Content
        </Card>,
      );
      const img = screen.getByRole("img", { name: "Company banner" });
      expect(img).toBeTruthy();
      expect(img.getAttribute("src")).toBe("https://example.com/img.png");
    });
  });

  describe("Roles & Accessibility", () => {
    it("uses role='button' when onClick is provided", () => {
      render(<Card onClick={() => {}}>Clickable</Card>);
      expect(screen.getByRole("button")).toBeTruthy();
    });

    it("uses role='group' when no onClick is provided", () => {
      render(<Card>Static</Card>);
      expect(screen.getByRole("group")).toBeTruthy();
    });

    it("associates header with aria-labelledby", () => {
      render(<Card header="My Card">Content</Card>);
      const group = screen.getByRole("group");
      const labelledBy = group.getAttribute("aria-labelledby");
      expect(labelledBy).toBeTruthy();
      expect(document.getElementById(labelledBy!)).toBeTruthy();
    });
  });

  describe("Keyboard Interaction", () => {
    it.each(["Enter", " "] as const)(
      "fires onClick on %s key",
      async (key) => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<Card onClick={onClick}>Clickable</Card>);
        const card = screen.getByRole("button");
        card.focus();
        await user.keyboard(key === "Enter" ? "{Enter}" : " ");
        expect(onClick).toHaveBeenCalledTimes(1);
      },
    );
  });

  describe("Disabled State", () => {
    it("does not fire onClick when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Card disabled onClick={onClick}>
          Disabled
        </Card>,
      );
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("sets aria-disabled when disabled", () => {
      render(<Card disabled>Disabled</Card>);
      const card = screen.getByRole("group");
      expect(card.getAttribute("aria-disabled")).toBe("true");
    });
  });

  describe("Loading State", () => {
    it("sets aria-busy when loading", () => {
      render(<Card loading>Content</Card>);
      expect(screen.getByRole("group").getAttribute("aria-busy")).toBe("true");
    });

    it("renders loading spinner when loading", () => {
      const { container } = render(<Card loading>Content</Card>);
      expect(container.querySelector(".animate-spin")).toBeTruthy();
    });

    it("does not fire onClick when loading", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Card loading onClick={onClick}>
          Loading
        </Card>,
      );
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("Selected State", () => {
    it("sets data-selected when selected", () => {
      render(<Card selected>Selected</Card>);
      expect(screen.getByRole("group").getAttribute("data-selected")).toBe("true");
    });
  });

  describe("Draggable", () => {
    it("wraps in DragItem container when dragId is provided", () => {
      const { container } = render(
        <Card dragId="app-1" dragType="application-card">
          Draggable
        </Card>,
      );
      const draggable = container.querySelector("[draggable='true']");
      expect(draggable).toBeTruthy();
    });

    it("only wraps element is draggable when dragId is provided", () => {
      const { container } = render(
        <Card dragId="app-1" dragType="application-card">
          Draggable
        </Card>,
      );
      const allDraggable = container.querySelectorAll("[draggable='true']");
      expect(allDraggable).toHaveLength(1);
    });

    it("does not render DragItem wrapper when dragId is absent", () => {
      const { container } = render(<Card>Static</Card>);
      const firstChild = container.firstChild as HTMLElement;
      expect(firstChild.classList.contains("bg-surface")).toBe(true);
    });
  });
});
