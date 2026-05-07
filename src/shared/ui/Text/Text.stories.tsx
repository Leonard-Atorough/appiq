import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta = {
  title: "Shared/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["p", "span", "div"],
      description: "HTML element to render",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
      description: "Font size variant",
    },
    weight: {
      control: { type: "select" },
      options: ["normal", "semibold"],
      description: "Font weight variant",
    },
    color: {
      control: { type: "select" },
      options: ["default", "muted", "secondary"],
      description: "Text color variant",
    },
    truncate: {
      control: { type: "boolean" },
      description: "Truncate text to single line with ellipsis",
    },
    children: {
      control: { type: "text" },
      description: "Text content",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: "Extra small text (12px)",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small text (14px)",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large text (18px)",
  },
};

export const SemiboldWeight: Story = {
  args: {
    weight: "semibold",
    children: "Semibold text",
  },
};

export const MutedColor: Story = {
  args: {
    color: "muted",
    children: "Muted text color",
  },
};

export const SecondaryColor: Story = {
  args: {
    color: "secondary",
    children: "Secondary text color",
  },
};

export const Truncated: Story = {
  args: {
    truncate: true,
    children:
      "This is a very long text that should be truncated into a single line with an ellipsis at the end",
  },
};

export const AsSpan: Story = {
  args: {
    as: "span",
    children: "This is rendered as a span element",
  },
};

export const AsDiv: Story = {
  args: {
    as: "div",
    children: "This is rendered as a div element",
  },
};

export const CombinedVariants: Story = {
  args: {
    size: "lg",
    weight: "semibold",
    color: "secondary",
    children: "Large, bold, secondary text",
  },
};

export const ResponsiveSize: Story = {
  args: {
    size: { base: "sm", md: "md", lg: "lg" },
    children: "Responsive text: small on mobile, medium on tablet, large on desktop",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Text size changes based on breakpoint: sm on mobile (base), md on tablet (md), lg on desktop (lg).",
      },
    },
  },
};

export const ResponsiveColor: Story = {
  args: {
    color: { base: "muted", lg: "secondary" },
    children: "Responsive color: muted on mobile, secondary on desktop",
  },
  parameters: {
    docs: {
      description: {
        story: "Text color changes based on breakpoint: muted on mobile, secondary on desktop.",
      },
    },
  },
};

export const FormLabel: Story = {
  args: {
    as: "span",
    size: "sm",
    weight: "semibold",
    color: "default",
    children: "Email address",
  },
  parameters: {
    docs: {
      description: {
        story: "Common pattern for form field labels.",
      },
    },
  },
};

export const HelperText: Story = {
  args: {
    as: "span",
    size: "xs",
    color: "muted",
    children: "We'll never share your email with anyone else.",
  },
  parameters: {
    docs: {
      description: {
        story: "Common pattern for form helper text.",
      },
    },
  },
};

export const BodyCopy: Story = {
  args: {
    as: "p",
    size: "md",
    color: "default",
    children:
      "This is a paragraph of body copy. It uses default styling for readability in article and blog post contexts.",
  },
  parameters: {
    docs: {
      description: {
        story: "Typical usage for article and blog post body text.",
      },
    },
  },
};
