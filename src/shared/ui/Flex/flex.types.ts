import React from "react";
import type { ResponsiveValue } from "@/shared/lib";
import type { FlexVariants } from "./flex.variants";

// Base variant value types
type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type FlexGap = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
type FlexPadding = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
type FlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
type FlexAlign = "start" | "end" | "center" | "baseline" | "stretch";
type FlexWrap = boolean;

export interface FlexProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    Omit<
      FlexVariants,
      "direction" | "gap" | "padding" | "paddingX" | "paddingY" | "justify" | "align" | "wrap"
    > {
  children?: React.ReactNode;
  direction?: ResponsiveValue<FlexDirection>;
  gap?: ResponsiveValue<FlexGap>;
  padding?: ResponsiveValue<FlexPadding>;
  paddingX?: ResponsiveValue<FlexPadding>;
  paddingY?: ResponsiveValue<FlexPadding>;
  justify?: ResponsiveValue<FlexJustify>;
  align?: ResponsiveValue<FlexAlign>;
  wrap?: ResponsiveValue<FlexWrap>;
}
