import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import React from "react";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders with default props", () => {
    render(<Navbar />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
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
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("px-md", "py-sm");
  });

  it("applies size variant md", () => {
    render(<Navbar size="md" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("px-lg", "py-md");
  });

  it("applies size variant lg", () => {
    render(<Navbar size="lg" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("px-2xl", "py-lg");
  });

  it("applies position variant static", () => {
    render(<Navbar position="static" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("static");
  });

  it("applies position variant sticky", () => {
    render(<Navbar position="sticky" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("sticky", "top-0", "z-40");
  });

  it("applies position variant fixed", () => {
    render(<Navbar position="fixed" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("fixed", "top-0", "left-0", "right-0", "z-40");
  });

  it("accepts custom className", () => {
    render(<Navbar className="custom-class" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("custom-class");
  });

  it("merges custom className with variant classes", () => {
    render(<Navbar size="md" className="custom-class" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("px-lg", "py-md", "custom-class");
  });

  it("accepts html attributes", () => {
    render(<Navbar data-testid="custom-navbar" />);
    expect(screen.getByTestId("custom-navbar")).toBeInTheDocument();
  });

  it("forwards ref to header element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Navbar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("HEADER");
  });

  it("renders with all layout classes", () => {
    const { container } = render(<Navbar title="Test" />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("flex", "items-center", "gap-md");
    expect(header).toHaveClass("border-b", "border-border");
    expect(header).toHaveClass("bg-surface");
    expect(header).toHaveClass("transition-all", "duration-200", "ease-out");
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

    it("renders as a banner landmark", () => {
      render(<Navbar title="App" />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("can be used as a plain page header without navigation", () => {
      render(<Navbar title={<h1>Dashboard</h1>} menuEnd={<button>Theme</button>} />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });

    it("supports aria-label for disambiguation when multiple headers exist", () => {
      render(
        <div>
          <Navbar aria-label="Site header" title="App" />
          <header aria-label="Article header"><h2>Article</h2></header>
        </div>,
      );
      expect(screen.getByRole("banner", { name: /site header/i })).toBeInTheDocument();
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

  describe("Menu Position", () => {
    it("applies justify-start by default (menuPosition='left')", () => {
      const { container } = render(
        <Navbar menu={<a href="/">Home</a>} />,
      );
      const menuContainer = container.querySelector("div.flex-1");
      expect(menuContainer).toHaveClass("justify-start");
    });

    it("applies justify-start when menuPosition='left'", () => {
      const { container } = render(
        <Navbar menu={<a href="/">Home</a>} menuPosition="left" />,
      );
      const menuContainer = container.querySelector("div.flex-1");
      expect(menuContainer).toHaveClass("justify-start");
    });

    it("applies justify-center when menuPosition='center'", () => {
      const { container } = render(
        <Navbar menu={<a href="/">Home</a>} menuPosition="center" />,
      );
      const menuContainer = container.querySelector("div.flex-1");
      expect(menuContainer).toHaveClass("justify-center");
    });

    it("applies justify-end when menuPosition='right'", () => {
      const { container } = render(
        <Navbar menu={<a href="/">Home</a>} menuPosition="right" />,
      );
      const menuContainer = container.querySelector("div.flex-1");
      expect(menuContainer).toHaveClass("justify-end");
    });

    it("menu container always has flex-1 regardless of position", () => {
      const positions = ["left", "center", "right"] as const;
      positions.forEach((menuPosition) => {
        const { container, unmount } = render(
          <Navbar menu={<a href="/">Home</a>} menuPosition={menuPosition} />,
        );
        expect(container.querySelector("div.flex-1")).toBeInTheDocument();
        unmount();
      });
    });

    it("menu is a direct child of nav (not nested in start/end sub-container)", () => {
      const { container } = render(
        <Navbar title="Logo" menu={<a href="/">Dashboard</a>} menuPosition="center" />,
      );
      const headerEl = container.querySelector("header");
      const menuContainer = headerEl?.querySelector(":scope > div.flex-1");
      expect(menuContainer).toBeInTheDocument();
      expect(menuContainer?.textContent).toContain("Dashboard");
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

    it("matches snapshot with menuPosition='right'", () => {
      const { container } = render(
        <Navbar
          title="AppIQ"
          menu={<a href="/">Dashboard</a>}
          menuIcon={<button>☰</button>}
          menuEnd={<button>Profile</button>}
          menuPosition="right"
        />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
