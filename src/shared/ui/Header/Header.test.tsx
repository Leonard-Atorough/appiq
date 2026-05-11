import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header} from "../Header";

describe("Header", () => {
  describe("semantic heading levels", () => {
    it.each<[number, string, string]>([
      [1, "h1", "Title"],
      [2, "h2", "Subtitle"],
      [3, "h3", "Section"],
      [4, "h4", "Subsection"],
      [5, "h5", "Minor heading"],
      [6, "h6", "Smallest"],
    ])("renders $tag when level=$level", (level, tag, text) => {
      const { container } = render(<Header level={level as 1 | 2 | 3 | 4 | 5 | 6}>{text}</Header>);
      expect(container.querySelector(tag)).toHaveTextContent(text);
    });
  });

  describe("default size matching level", () => {
    it.each<[number, string]>([
      [1, "text-3xl"],
      [2, "text-2xl"],
      [3, "text-xl"],
    ])("applies correct size class for level $level", (level, sizeClass) => {
      const { container } = render(<Header level={level as 1 | 2 | 3}>Title</Header>);
      const tagName = `h${level}`;
      expect(container.querySelector(tagName)).toHaveClass(sizeClass);
    });
  });

  describe("custom size prop", () => {
    it.each<[number, string, string, string]>([
      [2, "h1", "h2", "text-3xl"],
      [3, "h2", "h3", "text-2xl"],
      [1, "h3", "h1", "text-xl"],
    ])(
      "allows $semanticTag to be styled as $visualSize",
      (level, visualSize, semanticTag, expectedClass) => {
        const { container } = render(
          <Header level={level as 1 | 2 | 3} size={visualSize as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"}>
            Styled
          </Header>,
        );
        const element = container.querySelector(semanticTag);
        expect(element).toHaveClass(expectedClass);
      },
    );
  });

  describe("weight variants", () => {
    it.each<[string | undefined, string]>([
      [undefined, "font-semibold"],
      ["bold", "font-bold"],
    ])("applies weight=%s correctly", (weight, expectedClass) => {
      const { container } = render(
        <Header level={1} weight={weight as "semibold" | "bold"}>
          Title
        </Header>,
      );
      expect(container.querySelector("h1")).toHaveClass(expectedClass);
    });
  });

  describe("color variants", () => {
    it.each<[string | undefined, string]>([
      [undefined, "text-primary"],
      ["secondary", "text-secondary"],
    ])("applies color=%s correctly", (color, expectedClass) => {
      const { container } = render(
        <Header level={1} color={color as "default" | "secondary"}>
          Title
        </Header>,
      );
      expect(container.querySelector("h1")).toHaveClass(expectedClass);
    });
  });

  describe("combination of variants", () => {
    it("applies multiple variant classes together", () => {
      const { container } = render(
        <Header level={1} size="h2" weight="bold" color="secondary">
          Complex heading
        </Header>,
      );
      const element = container.querySelector("h1");
      expect(element).toHaveClass("text-2xl"); // h2 size
      expect(element).toHaveClass("font-bold");
      expect(element).toHaveClass("text-secondary");
    });
  });

  describe("className merging", () => {
    it("merges custom className with variant classes", () => {
      const { container } = render(
        <Header level={1} className="custom-class">
          Title
        </Header>,
      );
      const element = container.querySelector("h1");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("text-3xl"); // default h1 size
    });

    it("allows custom className to override variant classes", () => {
      const { container } = render(
        <Header level={1} className="text-purple-600">
          Custom color
        </Header>,
      );
      const element = container.querySelector("h1");
      expect(element).toHaveClass("text-purple-600");
    });
  });

  describe("HTML attributes", () => {
    it("forwards HTML attributes", () => {
      const { container } = render(
        <Header level={1} data-testid="main-title" id="page-title">
          Title
        </Header>,
      );
      const element = container.querySelector("h1");
      expect(element).toHaveAttribute("data-testid", "main-title");
      expect(element).toHaveAttribute("id", "page-title");
    });
  });

  describe("children", () => {
    it("renders text children", () => {
      const { container } = render(<Header level={1}>Simple title</Header>);
      expect(container.querySelector("h1")).toHaveTextContent("Simple title");
    });

    it("renders React element children", () => {
      const { container } = render(
        <Header level={1}>
          <span>Span</span> and <em>emphasized</em>
        </Header>,
      );
      const element = container.querySelector("h1");
      expect(element?.querySelector("span")).toHaveTextContent("Span");
      expect(element?.querySelector("em")).toHaveTextContent("emphasized");
    });
  });
});
