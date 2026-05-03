import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MetricsPanel } from "./MetricsPanel";

describe("MetricsPanel", () => {
  it("renders loading skeletons when loading is true", () => {
    render(
      <MetricsPanel
        loading={true}
        metrics={{
          totalApplications: 0,
          applicationsThisMonth: 0,
          interviewsScheduled: 0,
          offersReceived: 0,
          rejectionRate: 0,
        }}
      />,
    );

    const skeletons = document.querySelectorAll(".bg-skeleton");
    expect(skeletons).toHaveLength(5);
  });

  it("renders metric cards with correct labels and values", () => {
    const metrics = {
      totalApplications: 10,
      applicationsThisMonth: 3,
      interviewsScheduled: 2,
      offersReceived: 4,
      rejectionRate: 20,
    };
    const { getByText } = render(<MetricsPanel loading={false} metrics={metrics} />);
    expect(getByText("Total Applications")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
    expect(getByText("Applications This Month")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("Interviews Scheduled")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("Offers Received")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("Rejection Rate")).toBeInTheDocument();
    expect(getByText("20.0%")).toBeInTheDocument();
  });

  it("renders singular labels when each metric equals 1", () => {
    const metrics = {
      totalApplications: 1,
      applicationsThisMonth: 1,
      interviewsScheduled: 1,
      offersReceived: 1,
      rejectionRate: 1,
    };
    const { getByText } = render(<MetricsPanel loading={false} metrics={metrics} />);
    expect(getByText("Total Application")).toBeInTheDocument();
    expect(getByText("Application This Month")).toBeInTheDocument();
    expect(getByText("Interview Scheduled")).toBeInTheDocument();
    expect(getByText("Offer Received")).toBeInTheDocument();
    expect(getByText("Rejection Rate")).toBeInTheDocument();
  });
});
