import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavMenu } from "./NavMenu";
import { RouteProvider } from "@app/providers/RouteProvider";

const meta: Meta<typeof NavMenu> = {
  title: "Shared/Navbar/NavMenu",
  component: NavMenu,
  decorators: [
    (Story) => (
      <RouteProvider>
        <div className="flex items-center p-lg bg-surface border-b border-border">
          <Story />
        </div>
      </RouteProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavMenu>;

const defaultItems = [
  { id: "dashboard", href: "/", label: "Dashboard" },
  { id: "applications", href: "/applications", label: "Applications" },
  { id: "jobs", href: "/jobs", label: "Jobs" },
  { id: "settings", href: "/settings", label: "Settings" },
];

/**
 * # NavMenu
 *
 * Horizontal navigation link list. Reads `currentRoute` from `RouteContext` to
 * apply `aria-current="page"` and active styles automatically.
 *
 * Click a link to see the active state change.
 */
export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

/**
 * Items with leading icons.
 */
export const WithIcons: Story = {
  args: {
    items: [
      {
        id: "dashboard",
        href: "/",
        label: "Dashboard",
        icon: <span aria-hidden="true">📊</span>,
      },
      {
        id: "applications",
        href: "/applications",
        label: "Applications",
        icon: <span aria-hidden="true">📋</span>,
      },
      {
        id: "jobs",
        href: "/jobs",
        label: "Jobs",
        icon: <span aria-hidden="true">💼</span>,
      },
    ],
  },
};

/**
 * Demonstrates swapping in a custom `onNavigate` handler — the pattern to use
 * when upgrading to react-router-dom or TanStack Router.
 */
export const CustomNavigate: Story = {
  args: {
    items: defaultItems,
    onNavigate: (href) => alert(`Navigate to: ${href}`),
  },
};

/**
 * A single item — edge case for minimal navbars.
 */
export const SingleItem: Story = {
  args: {
    items: [{ id: "home", href: "/", label: "Home" }],
  },
};
