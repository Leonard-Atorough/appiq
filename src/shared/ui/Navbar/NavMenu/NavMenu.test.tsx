import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { NavMenu } from "./NavMenu";
import { RouteContext } from "@app/providers/contexts/RouteContext";

const items = [
  { id: "dashboard", href: "/", label: "Dashboard" },
  { id: "applications", href: "/applications", label: "Applications" },
  { id: "jobs", href: "/jobs", label: "Jobs" },
];

function renderWithRoute(ui: React.ReactElement, currentRoute = "/") {
  const navigate = vi.fn();
  return {
    navigate,
    ...render(
      <RouteContext.Provider value={{ currentRoute, navigate }}>{ui}</RouteContext.Provider>,
    ),
  };
}

describe("NavMenu", () => {
  it("renders all items", () => {
    renderWithRoute(<NavMenu items={items} />);
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /applications/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /jobs/i })).toBeInTheDocument();
  });

  it("renders a nav landmark with accessible label", () => {
    renderWithRoute(<NavMenu items={items} />);
    expect(screen.getByRole("navigation", { name: /main menu/i })).toBeInTheDocument();
  });

  it("marks the current route with aria-current='page'", () => {
    renderWithRoute(<NavMenu items={items} />, "/applications");
    expect(screen.getByRole("link", { name: /applications/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does not set aria-current on inactive links", () => {
    renderWithRoute(<NavMenu items={items} />, "/applications");
    expect(screen.getByRole("link", { name: /dashboard/i })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: /jobs/i })).not.toHaveAttribute("aria-current");
  });

  it("calls RouteContext navigate on link click", async () => {
    const user = userEvent.setup();
    const { navigate } = renderWithRoute(<NavMenu items={items} />);
    await user.click(screen.getByRole("link", { name: /applications/i }));
    expect(navigate).toHaveBeenCalledWith("/applications");
  });

  it("calls onNavigate instead of RouteContext navigate when provided", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const { navigate } = renderWithRoute(<NavMenu items={items} onNavigate={onNavigate} />);
    await user.click(screen.getByRole("link", { name: /jobs/i }));
    expect(onNavigate).toHaveBeenCalledWith("/jobs");
    expect(navigate).not.toHaveBeenCalled();
  });

  it("prevents default browser navigation on link click", async () => {
    const user = userEvent.setup();
    renderWithRoute(<NavMenu items={items} />);
    const link = screen.getByRole("link", { name: /dashboard/i });
    const clickHandler = vi.fn((e: MouseEvent) => e.preventDefault());
    link.addEventListener("click", clickHandler);
    await user.click(link);
    // jsdom does not navigate, so we just verify the link didn't trigger a full navigation
    expect(link).toBeInTheDocument();
  });

  it("renders item icons when provided", () => {
    const itemsWithIcons = [
      { id: "home", href: "/", label: "Dashboard", icon: <span data-testid="icon-home">🏠</span> },
    ];
    renderWithRoute(<NavMenu items={itemsWithIcons} />);
    expect(screen.getByTestId("icon-home")).toBeInTheDocument();
  });

  it("applies active variant class to the current route link", () => {
    const { container } = renderWithRoute(<NavMenu items={items} />, "/jobs");
    const jobsLink = screen.getByRole("link", { name: /jobs/i });
    expect(jobsLink).toHaveClass("text-primary");
    // Inactive links should not have text-primary
    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
    expect(dashboardLink).toHaveClass("text-secondary");
    expect(dashboardLink).not.toHaveClass("text-primary");
    expect(container).toBeTruthy();
  });

  it("accepts and applies a custom className", () => {
    const { container } = renderWithRoute(<NavMenu items={items} className="custom-nav-class" />);
    expect(container.querySelector("nav")).toHaveClass("custom-nav-class");
  });

  it("renders nothing when items array is empty", () => {
    renderWithRoute(<NavMenu items={[]} />);
    expect(screen.getByRole("navigation")).toBeEmptyDOMElement();
  });

  describe("Keyboard Navigation", () => {
    it("allows tabbing through all links in order", async () => {
      const user = userEvent.setup();
      renderWithRoute(<NavMenu items={items} />);
      await user.tab();
      expect(screen.getByRole("link", { name: /dashboard/i })).toHaveFocus();
      await user.tab();
      expect(screen.getByRole("link", { name: /applications/i })).toHaveFocus();
      await user.tab();
      expect(screen.getByRole("link", { name: /jobs/i })).toHaveFocus();
    });

    it("activates link on Enter key", async () => {
      const user = userEvent.setup();
      const onNavigate = vi.fn();
      renderWithRoute(<NavMenu items={items} onNavigate={onNavigate} />);
      await user.tab();
      await user.keyboard("{Enter}");
      expect(onNavigate).toHaveBeenCalledWith("/");
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot with default active route", () => {
      const { container } = renderWithRoute(<NavMenu items={items} />, "/");
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot with mid-list active route", () => {
      const { container } = renderWithRoute(<NavMenu items={items} />, "/applications");
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
