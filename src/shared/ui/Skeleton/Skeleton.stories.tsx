import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Skeleton,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonField,
  SkeletonIcon,
  SkeletonImage,
  SkeletonTableRow,
  SkeletonText,
} from "./index";

const meta: Meta = { title: "Shared/Skeleton" };
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <Skeleton /> };

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Text Skeleton</h3>
        <SkeletonText />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Avatar Skeleton</h3>
        <SkeletonAvatar />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Image Skeleton</h3>
        <SkeletonImage aspectRatio="video" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Icon Skeleton</h3>
        <SkeletonIcon />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Text Sizes</h3>
        <div className="space-y-2">
          <SkeletonText size="xs" width="60px" />
          <SkeletonText size="sm" width="100px" />
          <SkeletonText size="md" width="150px" />
          <SkeletonText size="lg" width="200px" />
          <SkeletonText size="xl" width="250px" />
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Avatar Sizes</h3>
        <div className="flex gap-4">
          <SkeletonAvatar size="xs" />
          <SkeletonAvatar size="sm" />
          <SkeletonAvatar size="md" />
          <SkeletonAvatar size="lg" />
          <SkeletonAvatar size="xl" />
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Icon Sizes</h3>
        <div className="flex gap-4">
          <SkeletonIcon size="xs" />
          <SkeletonIcon size="sm" />
          <SkeletonIcon size="md" />
          <SkeletonIcon size="lg" />
          <SkeletonIcon size="xl" />
        </div>
      </div>
    </div>
  ),
};

export const AvatarShapes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Circle (default)</h3>
        <SkeletonAvatar shape="circle" size="lg" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Square</h3>
        <SkeletonAvatar shape="square" size="lg" />
      </div>
    </div>
  ),
};

export const ImageAspectRatios: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Square (1:1)</h3>
        <SkeletonImage aspectRatio="square" width="200px" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Video (16:9)</h3>
        <SkeletonImage aspectRatio="video" width="100%" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Landscape (4:3)</h3>
        <SkeletonImage aspectRatio="landscape" width="100%" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Portrait (3:2)</h3>
        <SkeletonImage aspectRatio="portrait" width="200px" />
      </div>
    </div>
  ),
};

export const AnimationToggle: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Animated (default)</h3>
        <SkeletonText animated={true} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Static (animated=false)</h3>
        <SkeletonText animated={false} />
      </div>
    </div>
  ),
};

export const ComposedCard: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Basic Card (3 lines)</h3>
        <SkeletonCard />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Card with Header</h3>
        <SkeletonCard withHeader />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Card with Header & Footer</h3>
        <SkeletonCard withHeader withFooter />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Card with Many Lines</h3>
        <SkeletonCard lines={5} withHeader />
      </div>
    </div>
  ),
};

export const ComposedTableRow: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">4 Columns</h3>
        <SkeletonTableRow columns={4} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Variable Column Sizes</h3>
        <SkeletonTableRow columns={["sm", "md", "lg", "md"]} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Multiple Rows</h3>
        <div className="space-y-2 rounded-lg border border-base p-4">
          <SkeletonTableRow columns={4} />
          <SkeletonTableRow columns={4} />
          <SkeletonTableRow columns={4} />
        </div>
      </div>
    </div>
  ),
};

export const ComposedField: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Basic Field (label + input)</h3>
        <SkeletonField />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Field with Helper Text</h3>
        <SkeletonField withHelper />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Input Only</h3>
        <SkeletonField withLabel={false} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-base">Multiple Fields</h3>
        <div className="space-y-4 rounded-lg border border-base bg-(--color-surface) p-4">
          <SkeletonField />
          <SkeletonField withHelper />
          <SkeletonField />
        </div>
      </div>
    </div>
  ),
};

export const ReducedMotionDemo: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="rounded-lg border border-base bg-(--color-muted-bg) p-4">
        <p className="mb-2 text-sm text-(--color-text-secondary)">
          To see the reduced motion effect, enable "Prefers reduced motion" in your browser's
          accessibility settings or set media query via DevTools.
        </p>
        <p className="text-xs text-(--color-text-muted)">
          In browsers: Preferences → Accessibility → "Reduce motion"
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-base">
          Skeletons (respect prefers-reduced-motion)
        </h3>
        <div className="space-y-3 rounded-lg border border-base bg-(--color-surface) p-4">
          <SkeletonText />
          <SkeletonText width="80%" />
          <div className="flex gap-2">
            <SkeletonAvatar />
            <SkeletonText width="60%" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ConditionalRendering: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(true);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setIsLoading(!isLoading)}
          className="rounded-md bg-(--color-primary) px-4 py-2 text-white hover:bg-(--color-primary-hover)"
        >
          {isLoading ? "Load Content" : "Show Skeleton"}
        </button>

        <div className="rounded-lg border border-base bg-(--color-surface) p-4">
          {isLoading ? (
            <SkeletonCard withHeader lines={3} />
          ) : (
            <div className="space-y-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=225&fit=crop"
                alt="Example"
                className="w-full rounded-md"
              />
              <h3 className="text-lg font-semibold text-base">Real Content Loaded</h3>
              <p className="text-(--color-text-secondary)">
                This replaces the skeleton when data is ready. Click the button to toggle between
                loading and loaded states.
              </p>
              <p className="text-(--color-text-muted)">
                Additional content visible here after loading completes.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
};
