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
    expect(screen.getByRole("button", { name: /open menu/i })).toBeTruthy();
  });

  it("does not show menu initially", () => {
    render(<Dropdown items={baseItems} />);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("opens the menu on trigger click", async () => {
    const user = userEvent.setup();
    render(<Dropdown items={baseItems} />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("menu")).toBeTruthy();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("closes the menu when trigger is clicked again", async () => {
    const user = userEvent.setup();
    render(<Dropdown items={baseItems} />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    await user.click(trigger);
    expect(screen.getByRole("menu")).toBeTruthy();
    await user.click(trigger);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("calls item onClick and closes menu on item click", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(<Dropdown items={[{ label: "Edit", onClick: onEdit }, ...baseItems.slice(1)]} />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("menuitem", { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("closes menu on Escape and returns focus to trigger", async () => {
    const user = userEvent.setup();
    render(<Dropdown items={baseItems} />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    await user.click(trigger);
    expect(screen.getByRole("menu")).toBeTruthy();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
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
    expect(screen.getByRole("menu")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: /outside/i }));
    expect(screen.queryByRole("menu")).toBeNull();
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
    expect(screen.getByText("Actions")).toBeTruthy();
  });

  it("renders item icons", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        items={[{ label: "Edit", onClick: vi.fn(), icon: <svg data-testid="edit-icon" /> }]}
      />,
    );
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByTestId("edit-icon")).toBeTruthy();
  });

  it("trigger button is disabled when disabled prop is set", () => {
    render(<Dropdown items={baseItems} disabled />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeDisabled();
  });

  it("uses a custom triggerLabel for aria-label", () => {
    render(<Dropdown items={baseItems} triggerLabel="Row actions" />);
    expect(screen.getByRole("button", { name: /row actions/i })).toBeTruthy();
  });
});
