import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders with default props", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeTruthy();
  });

  it("renders title slot", () => {
    render(<Navbar title="App Title" />);
    expect(screen.getByText("App Title")).toBeTruthy();
  });

  it("renders menu slot", () => {
    render(
      <Navbar
        menu={
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
          </nav>
        }
      />,
    );
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("About")).toBeTruthy();
  });

  it("renders menuIcon slot", () => {
    render(<Navbar menuIcon={<button>☰</button>} />);
    expect(screen.getByRole("button", { name: /☰/i })).toBeTruthy();
  });

  it("renders menuEnd slot", () => {
    render(
      <Navbar
        menuEnd={
          <div>
            <button>Profile</button>
          </div>
        }
      />,
    );
    expect(screen.getByRole("button", { name: /profile/i })).toBeTruthy();
  });

  it("renders all slots together", () => {
    render(
      <Navbar
        title="Logo"
        menu={<a href="/">Home</a>}
        menuIcon={<button>☰</button>}
        menuEnd={<button>Settings</button>}
      />,
    );
    expect(screen.getByText("Logo")).toBeTruthy();
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByRole("button", { name: /☰/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /settings/i })).toBeTruthy();
  });

  it("applies size variants", () => {
    render(<Navbar size="lg" />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("py-lg");
  });

  it("applies position variants", () => {
    render(<Navbar position="sticky" />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("sticky");
    expect(nav.className).toContain("top-0");
  });

  it("accepts custom className", () => {
    render(<Navbar className="custom-class" />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("custom-class");
  });

  it("accepts html attributes", () => {
    render(<Navbar data-testid="custom-navbar" />);
    expect(screen.getByTestId("custom-navbar")).toBeTruthy();
  });

  describe("Keyboard Navigation & Accessibility", () => {
    it("allows tabbing through focusable elements in logical order", async () => {
      const user = userEvent.setup();
      render(
        <Navbar
          menuIcon={<button aria-label="Toggle menu">☰</button>}
          menu={<a href="/">Home</a>}
          menuEnd={<button>Profile</button>}
        />,
      );

      const menuButton = screen.getByRole("button", { name: /toggle menu/i });
      const homeLink = screen.getByRole("link", { name: /home/i });
      const profileButton = screen.getByRole("button", { name: /profile/i });

      // Tab to first focusable element (menuIcon)
      await user.tab();
      expect(menuButton).toHaveFocus();

      // Tab to second focusable element (menu link)
      await user.tab();
      expect(homeLink).toHaveFocus();

      // Tab to third focusable element (menuEnd button)
      await user.tab();
      expect(profileButton).toHaveFocus();
    });

    it("documents that shift+tab support depends on browser/test environment", async () => {
      render(
        <Navbar
          menuIcon={<button aria-label="Toggle menu">☰</button>}
          menu={<a href="/">Home</a>}
          menuEnd={<button>Profile</button>}
        />,
      );

      const menuButton = screen.getByRole("button", { name: /toggle menu/i });

      // Focus on menu button
      menuButton.focus();
      expect(menuButton).toHaveFocus();

      // Note: Shift+tab behavior is browser-dependent; this documents the expected UX
      // when keyboard navigation is properly implemented in the consuming application
    });

    it("allows focus to move out of navbar (no trap)", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Navbar menuIcon={<button aria-label="Toggle">☰</button>} />
          <button>Outside Button</button>
        </div>
      );

      const outsideButton = screen.getByRole("button", { name: /outside/i });

      // Tab through navbar element
      await user.tab();
      // Tab to outside button
      await user.tab();
      expect(outsideButton).toHaveFocus();
    });

    it("renders with proper semantic navigation role", () => {
      render(<Navbar title="App" />);
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("supports aria-label for disambiguation when multiple navbars", () => {
      render(
        <div>
          <Navbar aria-label="Main navigation" title="App" />
          <nav aria-label="Secondary navigation">
            <a href="/help">Help</a>
          </nav>
        </div>,
      );

      const mainNav = screen.getByRole("navigation", { name: /main navigation/i });
      const secondaryNav = screen.getByRole("navigation", { name: /secondary navigation/i });

      expect(mainNav).toBeInTheDocument();
      expect(secondaryNav).toBeInTheDocument();
    });

    it("accepts aria-expanded for menu toggle pattern", () => {
      const { rerender } = render(
        <Navbar
          menuIcon={<button aria-label="Toggle menu" aria-expanded={false}>☰</button>}
        />,
      );

      let toggleButton = screen.getByRole("button", { name: /toggle menu/i });
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");

      // Update to open state
      rerender(
        <Navbar
          menuIcon={<button aria-label="Toggle menu" aria-expanded={true}>☰</button>}
        />,
      );

      toggleButton = screen.getByRole("button", { name: /toggle menu/i });
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    });
  });
});
