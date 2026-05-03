import { describe, expect, it, vi } from "vitest";
import { AddApplicationForm } from "./AddApplicationForm";
import { render, screen } from "@testing-library/react";
import type {
  ApplicationJobType,
  ApplicationLocationType,
  ApplicationStatus,
} from "@/entities/application/model/types";
import userEvent from "@testing-library/user-event";

describe("AddApplicationForm", () => {
  it("renders with empty fields when no data is provided", () => {
    render(
      <AddApplicationForm
        open={true}
        onOpenChange={() => {}}
        onCreateApplication={() => {}}
        onUpdateApplication={() => {}}
        data={null}
      />,
    );

    expect(screen.getByLabelText("Company")).toHaveValue("");
    expect(screen.getByLabelText("Position")).toHaveValue("");
    expect(screen.getByLabelText("Status")).toHaveValue("saved");
    expect(screen.getByLabelText("Location")).toHaveValue("");
    expect(screen.getByLabelText("Working Style")).toHaveValue("");
    expect(screen.getByLabelText("Job type")).toHaveValue("");
    expect(screen.getByLabelText("Salary min")).toHaveValue(null);
    expect(screen.getByLabelText("Salary max")).toHaveValue(null);
    expect(screen.getByLabelText("Notes")).toHaveValue("");
  });

  it("renders with pre-filled data when editing an application", () => {
    const applicationData = {
      company: "Acme Corp",
      position: "Senior Engineer",
      status: "interviewing" as ApplicationStatus,
      location: "New York",
      workingStyle: "hybrid" as ApplicationLocationType,
      jobType: "full-time" as ApplicationJobType,
      salaryMin: 90000,
      salaryMax: 120000,
      notes: "Had a great interview!",
    };
    render(
      <AddApplicationForm
        open={true}
        onOpenChange={() => {}}
        onCreateApplication={() => {}}
        onUpdateApplication={() => {}}
        data={{ id: "1", dateApplied: new Date().toISOString(), ...applicationData }}
      />,
    );

    expect(screen.getByLabelText("Company")).toHaveValue("Acme Corp");
    expect(screen.getByLabelText("Position")).toHaveValue("Senior Engineer");
    expect(screen.getByLabelText("Status")).toHaveValue("interviewing");
    expect(screen.getByLabelText("Location")).toHaveValue("New York");
    expect(screen.getByLabelText("Working Style")).toHaveValue("hybrid");
    expect(screen.getByLabelText("Job type")).toHaveValue("full-time");
    expect(screen.getByLabelText("Salary min")).toHaveValue(90000);
    expect(screen.getByLabelText("Salary max")).toHaveValue(120000);
    expect(screen.getByLabelText("Notes")).toHaveValue("Had a great interview!");
  });

  it("renders status, location, working style, and job type options correctly", () => {
    render(
      <AddApplicationForm
        open={true}
        onOpenChange={() => {}}
        onCreateApplication={() => {}}
        onUpdateApplication={() => {}}
        data={null}
      />,
    );
    // Check status options
    expect(screen.getByLabelText("Status")).toHaveValue("saved");
    expect(screen.getByLabelText("Status")).toHaveTextContent("Saved");
    expect(screen.getByLabelText("Status")).toHaveTextContent("Applied");
    expect(screen.getByLabelText("Status")).toHaveTextContent("Interviewing");
    expect(screen.getByLabelText("Status")).toHaveTextContent("Offer");
    expect(screen.getByLabelText("Status")).toHaveTextContent("Rejected");
    // Check location options
    expect(screen.getByLabelText("Location")).toHaveValue("");
    // Check working style options
    expect(screen.getByLabelText("Working Style")).toHaveValue("");
    expect(screen.getByLabelText("Working Style")).toHaveTextContent("Remote");
    expect(screen.getByLabelText("Working Style")).toHaveTextContent("On-site");
    expect(screen.getByLabelText("Working Style")).toHaveTextContent("Hybrid");
    // Check job type options
    expect(screen.getByLabelText("Job type")).toHaveValue("");
    expect(screen.getByLabelText("Job type")).toHaveTextContent("Full-time");
    expect(screen.getByLabelText("Job type")).toHaveTextContent("Part-time");
    expect(screen.getByLabelText("Job type")).toHaveTextContent("Contract");
    expect(screen.getByLabelText("Job type")).toHaveTextContent("Internship");
  });

  it("calls onCreateApplication with correct data when creating a new application", async () => {
    const mockCreate = vi.fn();
    const user = userEvent.setup();
    render(
      <AddApplicationForm
        open={true}
        onOpenChange={() => {}}
        onCreateApplication={mockCreate}
        onUpdateApplication={() => {}}
        data={null}
      />,
    );
    await user.type(screen.getByLabelText("Company"), "Acme Corp");
    await user.type(screen.getByLabelText("Position"), "Senior Engineer");
    await user.selectOptions(screen.getByLabelText("Status"), "applied");
    await user.type(screen.getByLabelText("Location"), "New York");
    await user.selectOptions(screen.getByLabelText("Working Style"), "hybrid");
    await user.selectOptions(screen.getByLabelText("Job type"), "full-time");
    await user.type(screen.getByLabelText("Salary min"), "90000");
    await user.type(screen.getByLabelText("Salary max"), "120000");
    await user.type(screen.getByLabelText("Notes"), "Had a great interview!");
    await user.click(screen.getByRole("button", { name: /create/i }));
    expect(mockCreate).toHaveBeenCalledWith({
      company: "Acme Corp",
      position: "Senior Engineer",
      status: "applied",
      location: "New York",
      workingStyle: "hybrid",
      jobType: "full-time",
      salaryMin: 90000,
      salaryMax: 120000,
      notes: "Had a great interview!",
      dateApplied: expect.any(String),
    });
  });

  it("calls onUpdateApplication with correct data when editing an existing application", async () => {
    const mockUpdate = vi.fn();
    const user = userEvent.setup();
    const existingData = {
      id: "1",
      company: "Acme Corp",
      position: "Senior Engineer",
      status: "applied" as ApplicationStatus,
      location: "New York",
      workingStyle: "hybrid" as ApplicationLocationType,
      jobType: "full-time" as ApplicationJobType,
      salaryMin: 90000,
      salaryMax: 120000,
      notes: "Had a great interview!",
      dateApplied: new Date().toISOString(),
    };
    render(
      <AddApplicationForm
        open={true}
        onOpenChange={() => {}}
        onCreateApplication={() => {}}
        onUpdateApplication={mockUpdate}
        data={existingData}
      />,
    );
    await user.clear(screen.getByLabelText("Position"));
    await user.type(screen.getByLabelText("Position"), "Lead Engineer");
    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(mockUpdate).toHaveBeenCalledWith({
      company: "Acme Corp",
      position: "Lead Engineer",
      status: "applied",
      location: "New York",
      workingStyle: "hybrid",
      jobType: "full-time",
      salaryMin: 90000,
      salaryMax: 120000,
      notes: "Had a great interview!",
    });
  });

  it("disables submit button when required fields are empty", async () => {
    const user = userEvent.setup();
    render(
      <AddApplicationForm
        open={true}
        onOpenChange={() => {}}
        onCreateApplication={() => {}}
        onUpdateApplication={() => {}}
        data={null}
      />,
    );
    const submitButton = screen.getByRole("button", { name: /create/i });
    expect(submitButton).toBeDisabled();
    await user.type(screen.getByLabelText("Company"), "Acme Corp");
    expect(submitButton).toBeDisabled();
    await user.type(screen.getByLabelText("Position"), "Senior Engineer");
    expect(submitButton).toBeEnabled();
  });
});
