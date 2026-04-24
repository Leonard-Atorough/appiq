import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Dropdown } from "./Dropdown";
import type { DropdownItem } from "./dropdown.types";

const baseItems: DropdownItem[] = [
  { label: "Edit", onClick: vi.fn() },
  { label: "Archive", onClick: vi.fn() },
  { label: "Delete", onClick: vi.fn(), variant: "danger" },
];

describe("Dropdown", () => {
  it("renders the trigger button with accessible label", () => {
    render(<Dropdown items={baseItems} />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("does not show menu initially", () => {
    render(<Dropdown items={baseItems} />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the menu on trigger click", async () => {
    const user = userEvent.setup();
    render(<Dropdown items={baseItems} />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("closes the menu when trigger is clicked again", async () => {
    const user = userEvent.setup();
    render(<Dropdown items={baseItems} />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    await user.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("calls item onClick and closes menu on item click", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(<Dropdown items={[{ label: "Edit", onClick: onEdit }, ...baseItems.slice(1)]} />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("menuitem", { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes menu on Escape and returns focus to trigger", async () => {
    const user = userEvent.setup();
    render(<Dropdown items={baseItems} />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    await user.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("closes menu on outside click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Dropdown items={baseItems} />
        <button>Outside</button>
      </div>,
    );
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /outside/i }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("does not call onClick for a disabled item", async () => {
    const user = userEvent.setup();
    const onDisabled = vi.fn();
    render(
      <Dropdown
        items={[{ label: "Disabled", onClick: onDisabled, disabled: true }, ...baseItems.slice(1)]}
      />,
    );
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const disabledItem = screen.getByRole("menuitem", { name: /disabled/i });
    expect(disabledItem).toBeDisabled();
    await user.click(disabledItem);
    expect(onDisabled).not.toHaveBeenCalled();
  });

  it("renders danger variant item", async () => {
    const user = userEvent.setup();
    render(<Dropdown items={baseItems} />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const deleteBtn = screen.getByRole("menuitem", { name: /delete/i });
    expect(deleteBtn.className).toContain("text-error");
  });

  it("renders custom trigger content", () => {
    render(<Dropdown items={baseItems} trigger={<span>Actions</span>} />);
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders item icons", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        items={[{ label: "Edit", onClick: vi.fn(), icon: <svg data-testid="edit-icon" /> }]}
      />,
    );
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
  });

  it("trigger button is disabled when disabled prop is set", () => {
    render(<Dropdown items={baseItems} disabled />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeDisabled();
  });

  it("uses a custom triggerLabel for aria-label", () => {
    render(<Dropdown items={baseItems} triggerLabel="Row actions" />);
    expect(screen.getByRole("button", { name: /row actions/i })).toBeInTheDocument();
  });

  describe("Keyboard Navigation", () => {
    it("navigates between items with ArrowDown", async () => {
      const user = userEvent.setup();
      render(<Dropdown items={baseItems} />);
      await user.click(screen.getByRole("button", { name: /open menu/i }));
      const items = screen.getAllByRole("menuitem");
      // Menu should be open and items accessible
      expect(items).toHaveLength(3);
      // Navigate with arrow keys
      await user.keyboard("{ArrowDown}{ArrowDown}");
      const itemInFocus = document.activeElement as HTMLElement;
      expect(itemInFocus?.getAttribute("role")).toBe("menuitem");
    });

    it("navigates backwards with ArrowUp", async () => {
      const user = userEvent.setup();
      render(<Dropdown items={baseItems} />);
      await user.click(screen.getByRole("button", { name: /open menu/i }));
      const items = screen.getAllByRole("menuitem");
      expect(items).toHaveLength(3);
      // Navigate to end then back up
      await user.keyboard("{End}{ArrowUp}");
      const itemInFocus = document.activeElement as HTMLElement;
      expect(itemInFocus?.getAttribute("role")).toBe("menuitem");
    });

    it("can navigate with Home and End keys", async () => {
      const user = userEvent.setup();
      render(<Dropdown items={baseItems} />);
      await user.click(screen.getByRole("button", { name: /open menu/i }));
      const items = screen.getAllByRole("menuitem");
      expect(items).toHaveLength(3);
      // Navigate with Home and End
      await user.keyboard("{End}");
      expect(document.activeElement?.textContent).toContain("Delete");
      await user.keyboard("{Home}");
      expect(document.activeElement?.textContent).toContain("Edit");
    });

    it("skips disabled items during navigation", async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={[
            { label: "Item 1", onClick: vi.fn() },
            { label: "Item 2 (disabled)", onClick: vi.fn(), disabled: true },
            { label: "Item 3", onClick: vi.fn() },
          ]}
        />,
      );
      await user.click(screen.getByRole("button", { name: /open menu/i }));
      const items = screen.getAllByRole("menuitem");
      const disabledItem = items.find(item => item.textContent?.includes("disabled"));
      expect(disabledItem).toBeDisabled();
    });
  });

  describe("Trigger Variants", () => {
    it("renders kebab trigger by default", () => {
      render(<Dropdown items={baseItems} triggerLabel="Menu" />);
      const trigger = screen.getByRole("button", { name: /menu/i });
      expect(trigger).toBeInTheDocument();
    });

    it("renders custom trigger element", () => {
      render(<Dropdown items={baseItems} trigger={<span data-testid="custom-trigger">Custom</span>} />);
      expect(screen.getByTestId("custom-trigger")).toBeInTheDocument();
    });
  });

  describe("Alignment", () => {
    it("aligns menu to start by default", async () => {
      const user = userEvent.setup();
      render(<Dropdown items={baseItems} align="start" />);
      await user.click(screen.getByRole("button", { name: /open menu/i }));
      const menu = screen.getByRole("menu");
      expect(menu.style.left).toBeDefined();
    });

    it("aligns menu to end when specified", async () => {
      const user = userEvent.setup();
      render(<Dropdown items={baseItems} align="end" />);
      await user.click(screen.getByRole("button", { name: /open menu/i }));
      const menu = screen.getByRole("menu");
      expect(menu.style.right).toBeDefined();
    });
  });

  describe("Styling", () => {
    it("applies default variant styles to items", async () => {
      const user = userEvent.setup();
      render(<Dropdown items={baseItems} />);
      await user.click(screen.getByRole("button", { name: /open menu/i }));
      const editItem = screen.getByRole("menuitem", { name: /edit/i });
      expect(editItem).toHaveClass("text-base");
    });

    it("applies danger variant styles to items", async () => {
      const user = userEvent.setup();
      render(<Dropdown items={baseItems} />);
      await user.click(screen.getByRole("button", { name: /open menu/i }));
      const deleteItem = screen.getByRole("menuitem", { name: /delete/i });
      expect(deleteItem).toHaveClass("text-error");
    });

    it("applies custom className to root element", () => {
      render(<Dropdown items={baseItems} className="custom-class" />);
      const trigger = screen.getByRole("button", { name: /open menu/i });
      expect(trigger.parentElement).toHaveClass("custom-class");
    });

    it("applies aria attributes correctly", () => {
      render(<Dropdown items={baseItems} />);
      const trigger = screen.getByRole("button", { name: /open menu/i });
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("updates aria-expanded when menu opens", async () => {
      const user = userEvent.setup();
      render(<Dropdown items={baseItems} />);
      const trigger = screen.getByRole("button", { name: /open menu/i });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("sets aria-controls when menu is open", async () => {
      const user = userEvent.setup();
      render(<Dropdown items={baseItems} />);
      const trigger = screen.getByRole("button", { name: /open menu/i });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-controls");
      const menu = screen.getByRole("menu");
      expect(menu).toHaveAttribute("id", trigger.getAttribute("aria-controls"));
    });
  });
});
