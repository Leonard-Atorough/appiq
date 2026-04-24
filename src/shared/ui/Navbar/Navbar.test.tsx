import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import React from "react";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders with default props", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  it("renders title slot", () => {
    render(<Navbar title="App Title" />);
    expect(screen.getByText("App Title")).toBeInTheDocument();
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
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders menuIcon slot", () => {
    render(<Navbar menuIcon={<button>☰</button>} />);
    expect(screen.getByRole("button", { name: /☰/i })).toBeInTheDocument();
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
    expect(screen.getByRole("button", { name: /profile/i })).toBeInTheDocument();
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
    expect(screen.getByText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /☰/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /settings/i })).toBeInTheDocument();
  });

  it("applies size variant sm", () => {
    render(<Navbar size="sm" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("px-md", "py-sm");
  });

  it("applies size variant md", () => {
    render(<Navbar size="md" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("px-lg", "py-md");
  });

  it("applies size variant lg", () => {
    render(<Navbar size="lg" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("px-2xl", "py-lg");
  });

  it("applies position variant static", () => {
    render(<Navbar position="static" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("static");
  });

  it("applies position variant sticky", () => {
    render(<Navbar position="sticky" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("sticky", "top-0", "z-40");
  });

  it("applies position variant fixed", () => {
    render(<Navbar position="fixed" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("fixed", "top-0", "left-0", "right-0", "z-40");
  });

  it("accepts custom className", () => {
    render(<Navbar className="custom-class" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("custom-class");
  });

  it("merges custom className with variant classes", () => {
    render(<Navbar size="md" className="custom-class" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("px-lg", "py-md", "custom-class");
  });

  it("accepts html attributes", () => {
    render(<Navbar data-testid="custom-navbar" />);
    expect(screen.getByTestId("custom-navbar")).toBeInTheDocument();
  });

  it("forwards ref to nav element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Navbar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("NAV");
  });

  it("renders with all layout classes", () => {
    const { container } = render(<Navbar title="Test" />);
    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("flex", "items-center", "justify-between", "gap-md");
    expect(nav).toHaveClass("border-b", "border-border");
    expect(nav).toHaveClass("bg-surface");
    expect(nav).toHaveClass("transition-all", "duration-200", "ease-out");
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

  describe("Snapshots", () => {
    it("matches snapshot with default props", () => {
      const { container } = render(<Navbar />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot with all slots", () => {
      const { container } = render(
        <Navbar
          title="AppIQ"
          menu={<a href="/">Dashboard</a>}
          menuIcon={<button>☰</button>}
          menuEnd={<button>Profile</button>}
        />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot with size and position variants", () => {
      const { container } = render(
        <Navbar
          title="Test"
          size="lg"
          position="sticky"
        />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
