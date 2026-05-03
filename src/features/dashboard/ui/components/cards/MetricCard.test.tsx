import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MetricCard } from "./MetricCard";

describe("MetricCard", () => {
  it("renders the label", () => {
    const { getByText } = render(<MetricCard label="Total Applications" value={10} icon={null} />);
    expect(getByText("Total Applications")).toBeInTheDocument();
  });

  it("renders a numeric value", () => {
    const { getByText } = render(<MetricCard label="Total Applications" value={42} icon={null} />);
    expect(getByText("42")).toBeInTheDocument();
  });

  it("renders a string value", () => {
    const { getByText } = render(<MetricCard label="Rejection Rate" value="12.5%" icon={null} />);
    expect(getByText("12.5%")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    const { getByTestId } = render(
      <MetricCard
        label="Total Applications"
        value={10}
        icon={<span data-testid="metric-icon" />}
      />,
    );
    expect(getByTestId("metric-icon")).toBeInTheDocument();
  });
});
