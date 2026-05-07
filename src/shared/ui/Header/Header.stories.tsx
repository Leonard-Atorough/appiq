import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

const meta = {
  title: "Shared/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
      description: "Semantic heading level (h1-h6)",
    },
    size: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Visual heading size (can differ from level)",
    },
    weight: {
      control: { type: "select" },
      options: ["semibold", "bold"],
      description: "Font weight variant",
    },
    color: {
      control: { type: "select" },
      options: ["default", "secondary"],
      description: "Text color variant",
    },
    children: {
      control: { type: "text" },
      description: "Heading content",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Level1: Story = {
  args: {
    level: 1,
    children: "Main Page Title",
  },
};

export const Level2: Story = {
  args: {
    level: 2,
    children: "Section Heading",
  },
};

export const Level3: Story = {
  args: {
    level: 3,
    children: "Subsection Heading",
  },
};

export const Level4: Story = {
  args: {
    level: 4,
    children: "Level 4 Heading",
  },
};

export const Level5: Story = {
  args: {
    level: 5,
    children: "Level 5 Heading",
  },
};

export const Level6: Story = {
  args: {
    level: 6,
    children: "Level 6 Heading",
  },
};

export const BoldWeight: Story = {
  args: {
    level: 1,
    weight: "bold",
    children: "Bold Heading",
  },
};

export const SecondaryColor: Story = {
  args: {
    level: 1,
    color: "secondary",
    children: "Secondary Color Heading",
  },
};

export const SemanticVsVisual: Story = {
  args: {
    level: 2,
    size: "h1",
    children: "Semantic h2, Visual h1 Size",
  },
  parameters: {
    docs: {
      description: {
        story:
          "This renders as an `<h2>` element (semantic structure) but is styled with h1 sizing (visual presentation). Useful when design calls for a large heading that isn't the primary page title.",
      },
    },
  },
};

export const ResponsiveSize: Story = {
  args: {
    level: 1,
    size: { base: "h2", md: "h1" },
    children: "Responsive Heading Size",
  },
  parameters: {
    docs: {
      description: {
        story: "Heading size changes based on breakpoint: h2 on mobile, h1 on desktop.",
      },
    },
  },
};

export const ResponsiveColor: Story = {
  args: {
    level: 1,
    color: { base: "secondary", lg: "default" },
    children: "Responsive Heading Color",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Heading color changes based on breakpoint: secondary on mobile, default on desktop.",
      },
    },
  },
};

export const AllCombined: Story = {
  args: {
    level: 1,
    size: { base: "h2", md: "h1" },
    weight: "bold",
    color: "secondary",
    children: "Fully Responsive Heading with All Variants",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete example using responsive sizing, custom weight, and color. Demonstrates the full flexibility of the component.",
      },
    },
  },
};

export const CustomClassName: Story = {
  args: {
    level: 1,
    className: "text-purple-600",
    children: "Custom Color via className",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom className can override or extend variant styling. Here we apply a custom color that wins the CSS cascade.",
      },
    },
  },
};

export const PageStructureExample: Story = {
  args: {
    level: 1,
    children: "Full Page Example",
  },
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Header level={1}>Main Page Title</Header>
      <p className="text-base">Introductory paragraph explaining the content below.</p>

      <Header level={2}>First Section</Header>
      <p className="text-base">
        Section content goes here. This demonstrates proper semantic heading structure.
      </p>

      <Header level={3}>Subsection 3.1</Header>
      <p className="text-base">Subsection content with proper hierarchy maintained.</p>

      <Header level={3}>Subsection 3.2</Header>
      <p className="text-base">Another subsection at the same level.</p>

      <Header level={2}>Second Section</Header>
      <p className="text-base">Back to a level 2 heading to show section grouping.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of proper semantic heading structure throughout a page.",
      },
    },
  },
};
