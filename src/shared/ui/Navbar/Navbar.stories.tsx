import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Shared/Navbar",
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

/**
 * # Navbar
 *
 * Layout primitive for top navigation. Provides configurable slots for title, menu, menuIcon, and end actions.
 *
 * Consumer controls responsive behavior—Navbar is a pure layout component with no built-in breakpoint logic.
 */
export const Default: Story = {
  args: {
    title: "AppIQ",
    menu: (
      <div className="flex gap-lg">
        <a href="/" className="text-sm hover:text-primary">
          Dashboard
        </a>
        <a href="/applications" className="text-sm hover:text-primary">
          Applications
        </a>
        <a href="/jobs" className="text-sm hover:text-primary">
          Jobs
        </a>
      </div>
    ),
    menuEnd: (
      <div className="flex gap-md items-center">
        <button className="px-md py-sm text-sm border border-border rounded hover:bg-muted">
          Settings
        </button>
        <button className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
          JD
        </button>
      </div>
    ),
    position: "sticky",
    size: "md",
  },
};

export const WithMenuIcon: Story = {
  args: {
    ...Default.args,
    menuIcon: (
      <button className="flex items-center justify-center w-8 h-8 hover:bg-muted rounded">
        ☰
      </button>
    ),
  },
};

export const MobileView: Story = {
  args: {
    title: "AppIQ",
    menuIcon: (
      <button className="flex items-center justify-center w-8 h-8 hover:bg-muted rounded">
        ☰
      </button>
    ),
    menu: null, // Hidden on mobile
    menuEnd: (
      <button className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
        JD
      </button>
    ),
    position: "sticky",
    size: "md",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "AppIQ",
    position: "sticky",
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-0">
      <Navbar
        title="Small"
        menu={<a href="/">Home</a>}
        menuEnd={<button>Profile</button>}
        position="static"
        size="sm"
      />
      <Navbar
        title="Medium"
        menu={<a href="/">Home</a>}
        menuEnd={<button>Profile</button>}
        position="static"
        size="md"
      />
      <Navbar
        title="Large"
        menu={<a href="/">Home</a>}
        menuEnd={<button>Profile</button>}
        position="static"
        size="lg"
      />
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="space-y-0">
      <Navbar title="Static" menu={<a href="/">Home</a>} position="static" size="md" />
      <Navbar
        title="Sticky (scroll to see)"
        menu={<a href="/">Home</a>}
        position="sticky"
        size="md"
      />
      <div className="h-96 bg-muted p-lg">Scroll content here</div>
    </div>
  ),
};

export const FixedPositioned: Story = {
  args: {
    title: "AppIQ",
    menu: (
      <div className="flex gap-lg">
        <a href="/">Dashboard</a>
        <a href="/applications">Applications</a>
      </div>
    ),
    position: "fixed",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div className="pt-20">
        {Story()}
        <div className="p-lg">
          <p className="text-sm text-muted-foreground">
            The navbar is fixed at the top. Scroll to see it stay in place.
          </p>
          <div className="space-y-md mt-lg">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded p-md">
                Content block {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
};
