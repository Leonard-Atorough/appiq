import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Button } from "@shared/ui/Button";

const meta: Meta<typeof Sidebar> = {
  title: "Shared/Sidebar",
  component: Sidebar,
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

// Mock navigation items for reusable content
function NavItems() {
  return (
    <ul className="flex flex-col gap-sm">
      <li>
        <a href="#" className="text-sm hover:text-primary">
          Home
        </a>
      </li>
      <li>
        <a href="#" className="text-sm hover:text-primary">
          Applications
        </a>
      </li>
      <li>
        <a href="#" className="text-sm hover:text-primary">
          Job Boards
        </a>
      </li>
      <li>
        <a href="#" className="text-sm hover:text-primary">
          Settings
        </a>
      </li>
    </ul>
  );
}

function Logo() {
  return <div className="font-semibold text-base">AppIQ</div>;
}

function UserMenu() {
  return (
    <div className="flex items-center gap-sm text-sm">
      <div className="w-8 h-8 rounded-full bg-primary" />
      <span>Profile</span>
    </div>
  );
}

// --- Static (Always Open) ---
export const Static: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar header={<Logo />} footer={<UserMenu />}>
        <NavItems />
      </Sidebar>
      <main className="flex-1 p-md bg-muted">Main content</main>
    </div>
  ),
};

// --- Uncontrolled Collapsible ---
export const UncontrolledCollapsible: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar collapsible defaultOpen={true} header={<Logo />} footer={<UserMenu />}>
        <NavItems />
      </Sidebar>
      <main className="flex-1 p-md bg-muted">Main content</main>
    </div>
  ),
};

// --- Controlled Collapsible ---
export const ControlledCollapsible: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="flex h-screen gap-md">
        <Sidebar
          collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          header={<Logo />}
          footer={<UserMenu />}
        >
          <NavItems />
        </Sidebar>
        <main className="flex-1 p-md">
          <div className="flex flex-col gap-md">
            <Button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "Collapse" : "Expand"} Sidebar (Controlled)
            </Button>
            <p className="text-sm text-muted">Main content area</p>
          </div>
        </main>
      </div>
    );
  },
};

// --- Sticky Positioning ---
export const Sticky: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar position="sticky" collapsible header={<Logo />} footer={<UserMenu />}>
        <NavItems />
      </Sidebar>
      <main className="flex-1 p-md bg-muted overflow-y-auto">
        <div className="space-y-md">
          <h2 className="text-lg font-semibold">Sticky Sidebar Demo</h2>
          <p>Sidebar stays at top when scrolling main content.</p>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-20 bg-surface rounded p-md">
              Content block {i + 1}
            </div>
          ))}
        </div>
      </main>
    </div>
  ),
};

// --- Fixed Positioning ---
export const Fixed: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar position="fixed" collapsible header={<Logo />} footer={<UserMenu />}>
        <NavItems />
      </Sidebar>
      <main className="flex-1 p-md ml-64 bg-muted overflow-y-auto">
        <div className="space-y-md">
          <h2 className="text-lg font-semibold">Fixed Sidebar Demo</h2>
          <p>Sidebar remains fixed to viewport; content scrolls behind.</p>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-20 bg-surface rounded p-md">
              Content block {i + 1}
            </div>
          ))}
        </div>
      </main>
    </div>
  ),
};

// --- Custom Widths ---
export const CustomWidths: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar
        collapsible
        open={true}
        onOpenChange={() => {}}
        width="24rem"
        collapsedWidth="5rem"
        header={<Logo />}
        footer={<UserMenu />}
      >
        <NavItems />
      </Sidebar>
      <main className="flex-1 p-md bg-muted">
        <p className="text-sm text-muted">Main content with wider sidebar</p>
      </main>
    </div>
  ),
};

// --- Collapse Mode: Mini (Reduce Width) ---
export const CollapseModeMin: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="flex h-screen gap-md">
        <Sidebar
          collapsible
          collapseMode="mini"
          open={isOpen}
          onOpenChange={setIsOpen}
          header={<Logo />}
          footer={<UserMenu />}
        >
          <NavItems />
        </Sidebar>
        <main className="flex-1 p-md">
          <div className="space-y-md">
            <h2 className="text-lg font-semibold">Mini Collapse Mode</h2>
            <p className="text-sm text-muted">
              Click the toggle to collapse sidebar to a mini width (4rem).
              Content remains visible but condensed.
            </p>
          </div>
        </main>
      </div>
    );
  },
};

// --- Collapse Mode: Hide (Fully Hidden) ---
export const CollapseModeHide: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="flex h-screen gap-md">
        <Sidebar
          collapsible
          collapseMode="hide"
          open={isOpen}
          onOpenChange={setIsOpen}
          header={<Logo />}
          footer={<UserMenu />}
        >
          <NavItems />
        </Sidebar>
        <main className="flex-1 p-md">
          <div className="space-y-md">
            <Button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "Hide" : "Show"} Sidebar
            </Button>
            <h2 className="text-lg font-semibold">Hide Collapse Mode</h2>
            <p className="text-sm text-muted">
              Click the toggle to completely hide the sidebar (width 0).
              The sidebar disappears entirely until reopened.
            </p>
          </div>
        </main>
      </div>
    );
  },
};

// --- Collapse Mode Comparison ---
export const CollapseModeComparison: Story = {
  render: () => {
    const [miniOpen, setMiniOpen] = useState(true);
    const [hideOpen, setHideOpen] = useState(true);
    return (
      <div className="space-y-2xl p-lg">
        <div>
          <h2 className="text-lg font-semibold mb-md">Mini Mode</h2>
          <div className="flex h-80 gap-md border border-base rounded-lg p-md bg-muted">
            <Sidebar
              collapsible
              collapseMode="mini"
              open={miniOpen}
              onOpenChange={setMiniOpen}
              header={<Logo />}
            >
              <NavItems />
            </Sidebar>
            <div className="flex-1 flex items-center justify-center bg-surface rounded">
              <p className="text-sm text-muted">Main content</p>
            </div>
          </div>
          <p className="text-xs text-muted mt-sm">Sidebar collapses to 4rem width</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-md">Hide Mode</h2>
          <div className="flex h-80 gap-md border border-base rounded-lg p-md bg-muted">
            <Sidebar
              collapsible
              collapseMode="hide"
              open={hideOpen}
              onOpenChange={setHideOpen}
              header={<Logo />}
            >
              <NavItems />
            </Sidebar>
            <div className="flex-1 flex items-center justify-center bg-surface rounded">
              <p className="text-sm text-muted">Main content</p>
            </div>
          </div>
          <p className="text-xs text-muted mt-sm">Sidebar completely hidden (width 0)</p>
        </div>
      </div>
    );
  },
};

// --- Header & Footer Hidden When Collapsed ---
export const CollapsedHiddenHeader: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="flex h-screen gap-md">
        <Sidebar
          collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          header={<Logo />}
          footer={<UserMenu />}
        >
          <NavItems />
        </Sidebar>
        <main className="flex-1 p-md">
          <p className="text-sm text-muted">
            Notice: header and footer hide when sidebar collapses
          </p>
        </main>
      </div>
    );
  },
};

// --- Scroll Behavior ---
export const ScrollableContent: Story = {
  render: () => (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        collapsible
        open={true}
        onOpenChange={() => {}}
        scrollable={true}
        header={<Logo />}
        footer={<UserMenu />}
      >
        <div className="space-y-sm">
          {Array.from({ length: 30 }).map((_, i) => (
            <a key={i} href="#" className="block text-sm hover:text-primary py-xs px-sm rounded">
              Navigation item {i + 1}
            </a>
          ))}
        </div>
      </Sidebar>
      <main className="flex-1 p-md bg-muted">Main content</main>
    </div>
  ),
};

// --- Accessibility Demo ---
export const AccessibilityFeatures: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="flex h-screen gap-md">
        <Sidebar
          collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          ariaLabel="Main site navigation"
          toggleLabel="Toggle main navigation"
          header={<Logo />}
          footer={<UserMenu />}
        >
          <NavItems />
        </Sidebar>
        <main className="flex-1 p-md">
          <div className="space-y-md">
            <h2 className="text-lg font-semibold">Accessibility Features</h2>
            <ul className="list-disc list-inside space-y-sm text-sm">
              <li>
                Sidebar uses <code>&lt;aside&gt;</code> with landmark role
              </li>
              <li>aria-label identifies the navigation region</li>
              <li>Toggle button has aria-expanded and aria-label</li>
              <li>Keyboard: Tab to navigate, Enter/Space to toggle</li>
              <li>Escape key closes sidebar when collapsible</li>
            </ul>
          </div>
        </main>
      </div>
    );
  },
};

// --- No Toggle Button ---
export const NoToggleButton: Story = {
  render: () => (
    <div className="flex h-screen gap-md">
      <Sidebar
        collapsible
        hideToggle
        open={true}
        onOpenChange={() => {}}
        header={<Logo />}
        footer={<UserMenu />}
      >
        <NavItems />
      </Sidebar>
      <main className="flex-1 p-md">
        <p className="text-sm text-muted">
          Toggle button is hidden even though collapsible is true
        </p>
      </main>
    </div>
  ),
};
