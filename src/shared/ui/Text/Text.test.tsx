import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Text } from "../Text";

describe("Text", () => {
  describe("rendering", () => {
    it.each<[string, string, string]>([
      ["p", "default", "Hello"],
      ["span", "span", "Hello"],
      ["div", "div", "Hello"],
    ])("renders as $desc when as=$element", (selector, _desc, text) => {
      const { container } = render(<Text as={selector as "p" | "span" | "div"}>{text}</Text>);
      expect(container.querySelector(selector)).toHaveTextContent(text);
    });
  });

  describe("size variants", () => {
    it.each<[string, string]>([
      ["xs", "text-xs"],
      ["sm", "text-sm"],
      ["md", "text-base"],
      ["lg", "text-lg"],
    ])("applies size=$size with class $class", (size, className) => {
      const { container } = render(<Text size={size as "xs" | "sm" | "md" | "lg"}>{size} text</Text>);
      expect(container.querySelector("p")).toHaveClass(className);
    });
  });

  describe("weight variants", () => {
    it.each<[string | undefined, string]>([
      [undefined, "font-normal"],
      ["semibold", "font-semibold"],
    ])("applies weight=%s correctly", (weight, expectedClass) => {
      const { container } = render(<Text weight={weight as "normal" | "semibold"}>Text</Text>);
      expect(container.querySelector("p")).toHaveClass(expectedClass);
    });
  });

  describe("color variants", () => {
    it.each<[string | undefined, string]>([
      [undefined, "text-foreground"],
      ["muted", "text-muted"],
      ["secondary", "text-secondary"],
    ])("applies color=%s correctly", (color, expectedClass) => {
      const { container } = render(<Text color={color as "default" | "muted" | "secondary"}>Text</Text>);
      expect(container.querySelector("p")).toHaveClass(expectedClass);
    });
  });

  describe("truncate", () => {
    it.each<[boolean | undefined, boolean]>([
      [undefined, false],
      [true, true],
    ])("truncate=%s applies class: %s", (truncate, shouldHaveClass) => {
      const { container } = render(<Text truncate={truncate}>Text</Text>);
      const element = container.querySelector("p");
      if (shouldHaveClass) {
        expect(element).toHaveClass("truncate");
      } else {
        expect(element).not.toHaveClass("truncate");
      }
    });
  });

  describe("combination of variants", () => {
    it("applies multiple variant classes", () => {
      const { container } = render(
        <Text size="lg" weight="semibold" color="secondary">
          Complex text
        </Text>,
      );
      const element = container.querySelector("p");
      expect(element).toHaveClass("text-lg");
      expect(element).toHaveClass("font-semibold");
      expect(element).toHaveClass("text-secondary");
    });
  });

  describe("className merging", () => {
    it("merges custom className with variant classes", () => {
      const { container } = render(<Text className="custom-class">Text with custom class</Text>);
      const element = container.querySelector("p");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("text-base"); // default size
    });

    it("allows custom className to override variant classes", () => {
      const { container } = render(
        <Text size="sm" className="text-lg">
          Override text
        </Text>,
      );
      const element = container.querySelector("p");
      // Both classes present, but text-lg comes last so it wins in cascade
      expect(element).toHaveClass("text-lg");
    });
  });

  describe("HTML attributes", () => {
    it("forwards HTML attributes", () => {
      const { container } = render(
        <Text data-testid="custom-text" id="text-1" title="tooltip">
          Text with attributes
        </Text>,
      );
      const element = container.querySelector("p");
      expect(element).toHaveAttribute("data-testid", "custom-text");
      expect(element).toHaveAttribute("id", "text-1");
      expect(element).toHaveAttribute("title", "tooltip");
    });
  });

  describe("children", () => {
    it("renders text children", () => {
      const { container } = render(<Text>Simple text</Text>);
      expect(container.querySelector("p")).toHaveTextContent("Simple text");
    });

    it("renders React element children", () => {
      const { container } = render(
        <Text>
          <strong>Bold</strong> and <em>italic</em>
        </Text>,
      );
      const element = container.querySelector("p");
      expect(element?.querySelector("strong")).toHaveTextContent("Bold");
      expect(element?.querySelector("em")).toHaveTextContent("italic");
    });
  });
});
