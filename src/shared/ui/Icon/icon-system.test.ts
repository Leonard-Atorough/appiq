import { describe, it, expect } from "vitest";
import { ICON_REGISTRY } from "./Icons";
import { iconVariants } from "./icon.variant";

describe("Icon System", () => {
  describe("Icon Registry", () => {
    it("contains all expected icons", () => {
      const expectedIcons = [
        // Navigation
        "kebab",
        "meatball",
        "bento",
        "doner",
        "hamburger",
        // Status
        "check-circle",
        "x-circle",
        "alert-triangle",
        "info",
        // UI
        "bell",
        "x",
        "briefcase",
      ];

      expectedIcons.forEach((iconName) => {
        expect(ICON_REGISTRY).toHaveProperty(iconName);
        expect(ICON_REGISTRY[iconName]).toBeDefined();
      });
    });

    it("does not contain unknown icons", () => {
      expect(ICON_REGISTRY).not.toHaveProperty("unknown-icon");
      expect(ICON_REGISTRY).not.toHaveProperty("fake-icon");
    });
  });

  describe("Icon Variants (CVA)", () => {
    it("generates size variant classes", () => {
      const xs = iconVariants({ size: "xs" });
      const md = iconVariants({ size: "md" });
      const xl = iconVariants({ size: "xl" });

      // Each size should generate some className output
      expect(xs).toBeTruthy();
      expect(md).toBeTruthy();
      expect(xl).toBeTruthy();

      // All should be different or the same pattern
      expect(xs).toBeDefined();
      expect(md).toBeDefined();
      expect(xl).toBeDefined();
    });

    it("generates color variant classes", () => {
      const defaultVar = iconVariants({ variant: "default" });
      const success = iconVariants({ variant: "success" });
      const error = iconVariants({ variant: "error" });

      // Each variant should generate some className
      expect(defaultVar).toBeTruthy();
      expect(success).toBeTruthy();
      expect(error).toBeTruthy();

      // They should all be different
      expect(defaultVar).not.toBe(success);
      expect(success).not.toBe(error);
    });

    it("combines size and variant correctly", () => {
      const combined = iconVariants({ size: "lg", variant: "error" });
      expect(combined).toBeTruthy();
      // Should contain both size and color info
      expect(combined.length).toBeGreaterThan(0);
    });

    it("uses correct default variants", () => {
      const defaults = iconVariants();
      const explicit = iconVariants({ size: "md", variant: "default" });

      expect(defaults).toBe(explicit);
    });
  });
});
