import { render, screen } from "@testing-library/react";
import { useApplications } from "@/features/applications/data/useApplications";
import { useApplicationActions } from "@/features/applications/data/useApplicationActions";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { ApplicationsKanbanView } from "./ApplicationsKanbanView";
import type { JobApplication } from "@/entities";

vi.mock("@/features/applications/data/useApplications");
vi.mock("@/features/applications/data/useApplicationActions");

describe("ApplicationsKanbanView", () => {
  const mockCallbacks = {
    onEditApplication: vi.fn(),
    onNavigateToApplication: vi.fn(),
  };

  function getUseApplicationsMock({
    applications = [] as JobApplication[],
    loading = false,
    error = null as Error | null,
  } = {}) {
    return {
      applications,
      loading,
      error,
    };
  }

  function getUseApplicationActionsMock() {
    const mockExecute = vi.fn();
    const asyncState = {
      loading: false,
      status: "idle" as const,
      error: null as Error | null,
      data: undefined,
      execute: mockExecute,
    };
    return {
      createAsync: asyncState,
      updateAsync: asyncState,
      deleteAsync: asyncState,
      moveAsync: asyncState,
    };
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ━━━━━ RENDERING & STATE TESTS ━━━━━

  describe("Loading State", () => {
    it("should render skeleton loaders while data is loading", () => {
      vi.mocked(useApplications).mockReturnValue(getUseApplicationsMock({ loading: true }));
      vi.mocked(useApplicationActions).mockReturnValue(getUseApplicationActionsMock());

      render(
        <ApplicationsKanbanView
          onEditApplication={mockCallbacks.onEditApplication}
          onNavigateToApplication={mockCallbacks.onNavigateToApplication}
        />,
      );

      const loadingContainer = screen.getByTestId("kanban-loading");
      expect(loadingContainer).toBeInTheDocument();

      // Verify skeletons are in the loading container
      const skeletons = loadingContainer.querySelectorAll("div");
      expect(skeletons.length).toBeGreaterThan(0);

      // Should not render the main kanban layout
      expect(screen.queryByText("Saved")).not.toBeInTheDocument();
    });
    it("should render 5 skeleton columns during loading", () => {
      vi.mocked(useApplications).mockReturnValue(getUseApplicationsMock({ loading: true }));
      vi.mocked(useApplicationActions).mockReturnValue(getUseApplicationActionsMock());

      render(
        <ApplicationsKanbanView
          onEditApplication={mockCallbacks.onEditApplication}
          onNavigateToApplication={mockCallbacks.onNavigateToApplication}
        />,
      );

      // Each column renders 3 skeletons, so 5 columns × 3 = 15 total
      const loadingContainer = screen.getByTestId("kanban-loading");
      const columnDivs = loadingContainer.querySelectorAll(":scope > div");
      expect(columnDivs).toHaveLength(5); // 5 columns

      // Verify each column has 3 skeleton elements
      columnDivs.forEach((columnDiv) => {
        const skeletonsInColumn = columnDiv.querySelectorAll("div[class*='h-']");
        expect(skeletonsInColumn.length).toBeGreaterThanOrEqual(3);
      });
    });
  });

  describe("Error State", () => {
    it("should display error message when fetch fails", () => {
      const errorMessage = "Failed to load applications";
      vi.mocked(useApplications).mockReturnValue(
        getUseApplicationsMock({ error: new Error(errorMessage) }),
      );
      vi.mocked(useApplicationActions).mockReturnValue(getUseApplicationActionsMock());

      render(
        <ApplicationsKanbanView
          onEditApplication={mockCallbacks.onEditApplication}
          onNavigateToApplication={mockCallbacks.onNavigateToApplication}
        />,
      );

      const errorContainer = screen.getByText("Error loading applications");
      expect(errorContainer).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should display 'Drop here' placeholder when no applications exist", () => {
      vi.mocked(useApplications).mockReturnValue(getUseApplicationsMock({ applications: [] }));
      vi.mocked(useApplicationActions).mockReturnValue(getUseApplicationActionsMock());

      render(
        <ApplicationsKanbanView
          onEditApplication={mockCallbacks.onEditApplication}
          onNavigateToApplication={mockCallbacks.onNavigateToApplication}
        />,
      );

      const dropHerePlaceholder = screen.getAllByText(/drop here/i);
      expect(dropHerePlaceholder.length).toBeGreaterThan(0);
    });
    it("should show all columns with 0 count badges", () => {
      vi.mocked(useApplications).mockReturnValue(getUseApplicationsMock({ applications: [] }));
      vi.mocked(useApplicationActions).mockReturnValue(getUseApplicationActionsMock());

      render(
        <ApplicationsKanbanView
          onEditApplication={mockCallbacks.onEditApplication}
          onNavigateToApplication={mockCallbacks.onNavigateToApplication}
        />,
      );

      const dropHerePlaceholder = screen.getAllByText(/drop here/i);
      expect(dropHerePlaceholder.length).toBeGreaterThan(0);
    });
    it("should show all columns with 0 count badges", () => {
      vi.mocked(useApplications).mockReturnValue(getUseApplicationsMock({ applications: [] }));
      vi.mocked(useApplicationActions).mockReturnValue(getUseApplicationActionsMock());

      render(
        <ApplicationsKanbanView
          onEditApplication={mockCallbacks.onEditApplication}
          onNavigateToApplication={mockCallbacks.onNavigateToApplication}
        />,
      );

      const countBadges = screen.getAllByText("0");
      expect(countBadges.length).toBeGreaterThan(0);
    });
  });

  describe("Data Population", () => {
    it("should render correct number of applications in each status column", () => {
      const mockApplications: JobApplication[] = [
        {
          id: "1",
          position: "Software Engineer",
          company: "Tech Co",
          status: "saved",
          dateApplied: new Date().toISOString(),
        },
        {
          id: "2",
          position: "Product Manager",
          company: "Biz Inc",
          status: "applied",
          dateApplied: new Date().toISOString(),
        },
        {
          id: "3",
          position: "Designer",
          company: "Design LLC",
          status: "applied",
          dateApplied: new Date().toISOString(),
        },
        {
          id: "4",
          position: "Data Scientist",
          company: "Data Corp",
          status: "interviewing",
          dateApplied: new Date().toISOString(),
        },
      ];
      vi.mocked(useApplications).mockReturnValue(
        getUseApplicationsMock({ applications: mockApplications }),
      );
      vi.mocked(useApplicationActions).mockReturnValue(getUseApplicationActionsMock());

      render(
        <ApplicationsKanbanView
          onEditApplication={mockCallbacks.onEditApplication}
          onNavigateToApplication={mockCallbacks.onNavigateToApplication}
        />,
      );

      // Query each column by its header text (semantic approach)
      const savedColumn = screen.getByText("Saved").closest("div[class*='flex-col']");
      const appliedColumn = screen.getByText("Applied").closest("div[class*='flex-col']");
      const interviewingColumn = screen.getByText("Interviewing").closest("div[class*='flex-col']");
      const offerColumn = screen.getByText("Offer").closest("div[class*='flex-col']");
      const rejectedColumn = screen.getByText("Rejected").closest("div[class*='flex-col']");

      // Verify each column has the correct ApplicationCard count
      const savedCards = savedColumn?.querySelectorAll("[data-testid='application-card']");
      const appliedCards = appliedColumn?.querySelectorAll("[data-testid='application-card']");
      const interviewingCards = interviewingColumn?.querySelectorAll(
        "[data-testid='application-card']",
      );
      const offerCards = offerColumn?.querySelectorAll("[data-testid='application-card']");
      const rejectedCards = rejectedColumn?.querySelectorAll("[data-testid='application-card']");

      expect(savedCards).toHaveLength(1);
      expect(appliedCards).toHaveLength(2);
      expect(interviewingCards).toHaveLength(1);
      expect(offerCards).toHaveLength(0);
      expect(rejectedCards).toHaveLength(0);
    });
    it("should render ApplicationCard for each application with correct props", () => {
      const mockApplications: JobApplication[] = [
        {
          id: "1",
          position: "Software Engineer",
          company: "Tech Co",
          status: "saved",
          dateApplied: new Date().toISOString(),
        },
      ];
      vi.mocked(useApplications).mockReturnValue(
        getUseApplicationsMock({ applications: mockApplications }),
      );
      vi.mocked(useApplicationActions).mockReturnValue(getUseApplicationActionsMock());

      render(
        <ApplicationsKanbanView
          onEditApplication={mockCallbacks.onEditApplication}
          onNavigateToApplication={mockCallbacks.onNavigateToApplication}
        />,
      );

      // Verify ApplicationCard is rendered for the application
      const applicationCard = screen.getByTestId("application-card");
      expect(applicationCard).toBeInTheDocument();
      expect(applicationCard).toHaveTextContent("Software Engineer");
      expect(applicationCard).toHaveTextContent("Tech Co");
    });
    it("should update card count when applications list changes", () => {
      const initialApplications: JobApplication[] = [
        {
          id: "1",
          position: "Software Engineer",
          company: "Tech Co",
          status: "saved",
          dateApplied: new Date().toISOString(),
        },
      ];
      vi.mocked(useApplications).mockReturnValue(
        getUseApplicationsMock({ applications: initialApplications }),
      );
      vi.mocked(useApplicationActions).mockReturnValue(getUseApplicationActionsMock());

      const { rerender } = render(
        <ApplicationsKanbanView
          onEditApplication={mockCallbacks.onEditApplication}
          onNavigateToApplication={mockCallbacks.onNavigateToApplication}
        />,
      );

      let savedColumn = screen.getByText("Saved").closest("div[class*='flex-col']");
      let savedCards = savedColumn?.querySelectorAll("[data-testid='application-card']");
      expect(savedCards).toHaveLength(1);

      // Update applications list with 2 applications
      const updatedApplications: JobApplication[] = [
        ...initialApplications,
        {
          id: "2",
          position: "Product Manager",
          company: "Biz Inc",
          status: "saved",
          dateApplied: new Date().toISOString(),
        },
      ];
      vi.mocked(useApplications).mockReturnValue(
        getUseApplicationsMock({ applications: updatedApplications }),
      );

      rerender(
        <ApplicationsKanbanView
          onEditApplication={mockCallbacks.onEditApplication}
          onNavigateToApplication={mockCallbacks.onNavigateToApplication}
        />,
      );

      // Verify count updated
      savedColumn = screen.getByText("Saved").closest("div[class*='flex-col']");
      savedCards = savedColumn?.querySelectorAll("[data-testid='application-card']");
      expect(savedCards).toHaveLength(2);
    });
  });

  describe("Column Headers", () => {
    it("should render all 5 status columns with correct labels");
    it("should display correct badge variant for each column status");
  });

  // ━━━━━ INTERACTIONS & CALLBACKS ━━━━━

  describe("Drag & Drop", () => {
    it("should call moveAsync when application is dropped on a column");
    it("should pass correct applicationId and new status to moveAsync");
    it("should update UI after successful move");
    it("should handle move errors gracefully");
  });

  describe("Card Actions", () => {
    it("should call onEditApplication when edit action triggered on card");
    it("should call onNavigateToApplication when card clicked");
    it("should call deleteAsync when delete action triggered from card");
  });

  // ━━━━━ EDGE CASES ━━━━━

  describe("Edge Cases", () => {
    it("should handle empty array of applications");
    it("should handle applications with missing optional fields");
    it("should not crash if a status column has no applications");
  });
});
