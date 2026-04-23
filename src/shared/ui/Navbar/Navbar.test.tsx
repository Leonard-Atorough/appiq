import { render, screen } from "@testing-library/react";
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
});
