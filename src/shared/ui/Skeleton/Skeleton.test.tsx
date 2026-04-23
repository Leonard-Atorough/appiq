import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

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

describe("Skeleton Components", () => {
  describe("Skeleton (base)", () => {
    it("renders as a div with aria-hidden", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveAttribute("aria-hidden", "true");
    });

    it("applies variant and size classes", () => {
      const { container } = render(<Skeleton variant="avatar" size="xl" />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("h-10");
      expect(skeleton?.className).toContain("w-40");
    });

    it("applies shimmer animation by default", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("animate-pulse");
    });

    it("disables shimmer when animated={false}", () => {
      const { container } = render(<Skeleton animated={false} />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).not.toContain("animate-pulse");
    });

    it("applies custom className", () => {
      const { container } = render(
        <Skeleton className="custom-class" />,
      );
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("custom-class");
    });

    it("forwards ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Skeleton ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("SkeletonText", () => {
    it("renders as a div with aria-hidden", () => {
      const { container } = render(<SkeletonText />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveAttribute("aria-hidden", "true");
    });

    it("applies height based on size prop", () => {
      const { container } = render(<SkeletonText size="lg" />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("h-8");
    });

    it("respects custom width", () => {
      const { container } = render(<SkeletonText width="80%" />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveStyle({ width: "80%" });
    });

    it("respects custom height prop", () => {
      const { container } = render(<SkeletonText height={16} />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveStyle({ height: "16px" });
    });

    it("applies shimmer animation by default", () => {
      const { container } = render(<SkeletonText />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("animate-pulse");
    });

    it("disables shimmer when animated={false}", () => {
      const { container } = render(<SkeletonText animated={false} />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).not.toContain("animate-pulse");
    });
  });

  describe("SkeletonAvatar", () => {
    it("renders as a div with aria-hidden", () => {
      const { container } = render(<SkeletonAvatar />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveAttribute("aria-hidden", "true");
    });

    it("applies size and shape classes", () => {
      const { container } = render(<SkeletonAvatar size="lg" shape="square" />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("h-12");
      expect(skeleton?.className).toContain("w-12");
      expect(skeleton?.className).toContain("rounded-md");
    });

    it("applies circle shape", () => {
      const { container } = render(<SkeletonAvatar shape="circle" />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("rounded-full");
    });

    it("applies shimmer animation by default", () => {
      const { container } = render(<SkeletonAvatar />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("animate-pulse");
    });

    it("forwards ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<SkeletonAvatar ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("SkeletonImage", () => {
    it("renders as a div with aria-hidden", () => {
      const { container } = render(<SkeletonImage />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveAttribute("aria-hidden", "true");
    });

    it("applies aspect ratio class", () => {
      const { container } = render(<SkeletonImage aspectRatio="square" />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("aspect-square");
    });

    it("applies different aspect ratios", () => {
      const { rerender, container } = render(
        <SkeletonImage aspectRatio="video" />,
      );
      expect(container.querySelector("div")?.className).toContain("aspect-video");

      rerender(<SkeletonImage aspectRatio="landscape" />);
      expect(container.querySelector("div")?.className).toContain("aspect-[4/3]");

      rerender(<SkeletonImage aspectRatio="portrait" />);
      expect(container.querySelector("div")?.className).toContain("aspect-[3/2]");
    });

    it("respects custom width", () => {
      const { container } = render(<SkeletonImage width="200px" />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveStyle({ width: "200px" });
    });

    it("applies shimmer animation by default", () => {
      const { container } = render(<SkeletonImage />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("animate-pulse");
    });
  });

  describe("SkeletonIcon", () => {
    it("renders as a div with aria-hidden", () => {
      const { container } = render(<SkeletonIcon />);
      const skeleton = container.querySelector("div");
      expect(skeleton).toHaveAttribute("aria-hidden", "true");
    });

    it("applies size classes", () => {
      const { container } = render(<SkeletonIcon size="lg" />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("h-8");
      expect(skeleton?.className).toContain("w-8");
    });

    it("applies shimmer animation by default", () => {
      const { container } = render(<SkeletonIcon />);
      const skeleton = container.querySelector("div");
      expect(skeleton?.className).toContain("animate-pulse");
    });

    it("forwards ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<SkeletonIcon ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("SkeletonCard", () => {
    it("renders default structure with lines", () => {
      const { container } = render(<SkeletonCard />);
      const card = container.querySelector("div");
      expect(card?.className).toContain("rounded-lg");
      expect(card?.className).toContain("border");

      // Should have 3 lines of text by default
      const textSkeletons = container.querySelectorAll("div > div:last-child > div");
      expect(textSkeletons.length).toBeGreaterThan(0);
    });

    it("renders with header when specified", () => {
      const { container } = render(<SkeletonCard withHeader />);
      const elements = container.querySelectorAll("div");
      // Should have more elements due to image
      expect(elements.length).toBeGreaterThan(3);
    });

    it("renders with footer when specified", () => {
      const { container } = render(<SkeletonCard withFooter />);
      const elements = container.querySelectorAll("div");
      expect(elements.length).toBeGreaterThan(3);
    });

    it("respects lines prop", () => {
      const { container } = render(<SkeletonCard lines={5} />);
      const card = container.querySelector(".space-y-2");
      const lines = card?.querySelectorAll("div");
      expect(lines?.length).toBe(5);
    });

    it("renders custom children when provided", () => {
      render(
        <SkeletonCard>
          <div data-testid="custom-skeleton">Custom Content</div>
        </SkeletonCard>,
      );
      expect(screen.getByTestId("custom-skeleton")).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<SkeletonCard ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("respects animated prop", () => {
      const { container } = render(
        <SkeletonCard animated={false} />,
      );
      const skeletonElements = container.querySelectorAll("[aria-hidden='true']");
      skeletonElements.forEach((element) => {
        expect(element.className).not.toContain("animate-pulse");
      });
    });
  });

  describe("SkeletonTableRow", () => {
    it("renders row with specified column count", () => {
      const { container } = render(<SkeletonTableRow columns={4} />);
      const row = container.querySelector(".flex");
      expect(row?.className).toContain("gap-md");
    });

    it("renders columns with correct size distribution", () => {
      const { container } = render(
        <SkeletonTableRow columns={["sm", "md", "lg"]} />,
      );
      const cells = container.querySelectorAll(".flex-1");
      expect(cells.length).toBe(3);
    });

    it("respects gap prop", () => {
      const { container } = render(<SkeletonTableRow gap="lg" />);
      const row = container.querySelector(".flex");
      expect(row?.className).toContain("gap-lg");
    });

    it("renders row with aria-hidden on cells", () => {
      const { container } = render(<SkeletonTableRow columns={2} />);
      const skeletons = container.querySelectorAll("[aria-hidden='true']");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("forwards ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<SkeletonTableRow ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("SkeletonField", () => {
    it("renders label when withLabel={true}", () => {
      const { container } = render(<SkeletonField withLabel />);
      const elements = container.querySelectorAll("[aria-hidden='true']");
      expect(elements.length).toBeGreaterThanOrEqual(2); // label + input
    });

    it("renders input skeleton", () => {
      const { container } = render(<SkeletonField />);
      const elements = container.querySelectorAll("[aria-hidden='true']");
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });

    it("renders helper text when withHelper={true}", () => {
      const { container } = render(<SkeletonField withHelper />);
      const elements = container.querySelectorAll("[aria-hidden='true']");
      expect(elements.length).toBeGreaterThanOrEqual(3); // label + input + helper
    });

    it("renders without label when withLabel={false}", () => {
      const { container } = render(<SkeletonField withLabel={false} />);
      const elements = container.querySelectorAll("[aria-hidden='true']");
      expect(elements.length).toBe(1); // only input
    });

    it("forwards ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<SkeletonField ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("respects animated prop", () => {
      const { container } = render(
        <SkeletonField animated={false} />,
      );
      const skeletonElements = container.querySelectorAll("[aria-hidden='true']");
      skeletonElements.forEach((element) => {
        expect(element.className).not.toContain("animate-pulse");
      });
    });
  });
});
