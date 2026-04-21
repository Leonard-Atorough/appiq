import { useState, useEffect } from "react";
import { Badge } from "@shared/ui/Badge";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { Textarea } from "@shared/ui/Textarea";
import { Select } from "@shared/ui/Select";
import { Dialog } from "@shared/ui/Dialog";
import { DataTable } from "@shared/ui/DataTable";
import { Toast } from "@shared/ui/Toast";
import type { ToastProps } from "@shared/ui/Toast";
import { Dropdown } from "@shared/ui/Dropdown";
import { EmptyState } from "@shared/ui/EmptyState";
import { Icon } from "@shared/ui/Icon";
import { Popover } from "@shared/ui/Popover";
import type { ColumnDef } from "@tanstack/react-table";
import type { JobApplication } from "@entities/application/model/types";

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-bold mt-8 mb-4 text-(--color-text)">{title}</h2>
);

const SubsectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-lg font-semibold mt-6 mb-3 text-(--color-text-secondary)">{title}</h3>
);

const ComponentGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 p-6 bg-(--color-muted-bg) rounded-lg">
    {children}
  </div>
);

const ComponentItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`flex flex-col gap-3 p-4 bg-(--color-surface) border border-(--color-border) rounded-lg ${className}`}
  >
    {children}
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm font-medium text-(--color-text-secondary)">{children}</span>
);

function ControlledPopoverExample() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-md">
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Open externally
      </Button>
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={(props) => (
          <Button variant="ghost" size="sm" {...props}>
            Trigger (controlled)
          </Button>
        )}
      >
        <div className="flex flex-col gap-sm">
          <p className="text-sm text-(--color-text)">Controlled by parent state.</p>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </Popover>
      <span className="text-sm text-secondary">
        Panel is: <strong>{open ? "open" : "closed"}</strong>
      </span>
    </div>
  );
}

export const ComponentShowcase = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  type QueuedToast = Omit<ToastProps, "onDismiss"> & { toastKey: number };
  const [toasts, setToasts] = useState<QueuedToast[]>([]);
  const [toastCounter, setToastCounter] = useState(0);
  const [inputSmall, setInputSmall] = useState("");
  const [inputMedium, setInputMedium] = useState("");
  const [inputLarge, setInputLarge] = useState("");
  const [inputDefault, setInputDefault] = useState("");
  const [inputError, setInputError] = useState("");
  const [textareaPrimary, setTextareaPrimary] = useState("");
  const [textareaSecondary, setTextareaSecondary] = useState("");
  const [textareaOutline, setTextareaOutline] = useState("");
  const [textareaGhost, setTextareaGhost] = useState("");
  const [textareaAutoGrow, setTextareaAutoGrow] = useState("");
  const [textareaCharCount, setTextareaCharCount] = useState("");
  const [textareaSmall, setTextareaSmall] = useState("");
  const [textareaMedium, setTextareaMedium] = useState("");
  const [textareaLarge, setTextareaLarge] = useState("");
  const [selectedValue, setSelectedValue] = useState("option1");
  const [loadingButtons, setLoadingButtons] = useState<Set<string>>(new Set());
  const simulateLoading = (id: string, ms = 2000) => {
    setLoadingButtons((prev) => new Set([...prev, id]));
    setTimeout(
      () =>
        setLoadingButtons((prev) => {
          const n = new Set(prev);
          n.delete(id);
          return n;
        }),
      ms,
    );
  };
  const [dismissedBadges, setDismissedBadges] = useState<Set<string>>(new Set());
  const dismissBadge = (id: string) => setDismissedBadges((prev) => new Set([...prev, id]));
  const resetAllBadges = () => setDismissedBadges(new Set());
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("showcase-dark-mode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const sampleApplications: JobApplication[] = [
    {
      id: "1",
      company: "Acme Corp",
      position: "Senior Frontend Engineer",
      status: "interviewing",
      dateApplied: "2025-03-15",
      salaryMin: 120000,
      salaryMax: 150000,
      location: "remote",
      jobType: "full-time",
    },
    {
      id: "2",
      company: "TechStart Inc",
      position: "React Developer",
      status: "applied",
      dateApplied: "2025-03-10",
      salaryMin: 100000,
      salaryMax: 130000,
      location: "hybrid",
      jobType: "full-time",
    },
    {
      id: "3",
      company: "Design Labs",
      position: "Full Stack Engineer",
      status: "rejected",
      dateApplied: "2025-02-28",
      salaryMin: 110000,
      salaryMax: 140000,
      location: "on-site",
      jobType: "full-time",
    },
    {
      id: "4",
      company: "StartupXYZ",
      position: "JavaScript Engineer",
      status: "offer",
      dateApplied: "2025-03-05",
      salaryMin: 95000,
      salaryMax: 125000,
      location: "remote",
      jobType: "full-time",
    },
    {
      id: "5",
      company: "Web Innovations",
      position: "UI Developer",
      status: "applied",
      dateApplied: "2025-03-20",
      salaryMin: 90000,
      salaryMax: 115000,
      location: "remote",
      jobType: "part-time",
    },
  ];

  const columns: ColumnDef<JobApplication>[] = [
    {
      id: "company",
      header: "Company",
      cell: (info) => info.getValue(),
      accessorKey: "company",
    },
    {
      id: "position",
      header: "Position",
      cell: (info) => info.getValue(),
      accessorKey: "position",
    },
    {
      id: "status",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() as string;
        const statusColors: Record<string, string> = {
          applied: "text-(--color-info)",
          interviewing: "text-(--color-warning)",
          offer: "text-(--color-success)",
          rejected: "text-(--color-error)",
        };
        return <span className={statusColors[status] || ""}>{status}</span>;
      },
      accessorKey: "status",
    },
    {
      id: "dateApplied",
      header: "Date Applied",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
      accessorKey: "dateApplied",
    },
    {
      id: "salary",
      header: "Salary Range",
      cell: (info) => {
        const row = info.row.original;
        if (row.salaryMin && row.salaryMax) {
          return `$${(row.salaryMin / 1000).toFixed(0)}k - $${(row.salaryMax / 1000).toFixed(0)}k`;
        }
        return "-";
      },
    },
    {
      id: "location",
      header: "Location",
      cell: (info) => info.getValue() || "-",
      accessorKey: "location",
    },
  ];

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("showcase-dark-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const addToast = (props: Omit<ToastProps, "onDismiss">) => {
    const key = toastCounter + 1;
    setToastCounter(key);
    setToasts((prev) => [...prev, { ...props, toastKey: key }]);
  };

  const dismissToast = (key: number) => {
    setToasts((prev) => prev.filter((t) => t.toastKey !== key));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-(--color-bg) p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-(--color-text) mb-2">Component Showcase</h1>
            <p className="text-(--color-text-secondary) text-lg">
              A visual reference for all available UI components and their variants
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? "🌙 Dark" : "☀️ Light"}
          </Button>
        </div>

        {/* Button Component */}
        <SectionTitle title="Button" />

        <SubsectionTitle title="Variants" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Primary</Label>
            <Button variant="primary">Primary Button</Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Secondary</Label>
            <Button variant="secondary">Secondary Button</Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Outline</Label>
            <Button variant="outline">Outline Button</Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Ghost</Label>
            <Button variant="ghost">Ghost Button</Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Link</Label>
            <Button variant="link">Link Button</Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Disabled</Label>
            <Button disabled>Disabled Button</Button>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Sizes" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Small</Label>
            <Button size="sm">Small Button</Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Medium</Label>
            <Button size="md">Medium Button</Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Large</Label>
            <Button size="lg">Large Button</Button>
          </ComponentItem>
          <ComponentItem className="col-span-full">
            <Label>Full Width</Label>
            <Button full>Full Width Button</Button>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Color Combinations" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Primary + Small</Label>
            <Button variant="primary" size="sm">
              Primary SM
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Secondary + Large</Label>
            <Button variant="secondary" size="lg">
              Secondary LG
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Outline + Medium</Label>
            <Button variant="outline" size="md">
              Outline MD
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Ghost + Small</Label>
            <Button variant="ghost" size="sm">
              Ghost SM
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Link + Large</Label>
            <Button variant="link" size="lg">
              Link LG
            </Button>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Loading State" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Primary (click to trigger)</Label>
            <Button
              variant="primary"
              loading={loadingButtons.has("load-primary")}
              onClick={() => simulateLoading("load-primary")}
            >
              Save Changes
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Secondary</Label>
            <Button
              variant="secondary"
              loading={loadingButtons.has("load-secondary")}
              onClick={() => simulateLoading("load-secondary")}
            >
              Sync Data
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Outline</Label>
            <Button
              variant="outline"
              loading={loadingButtons.has("load-outline")}
              onClick={() => simulateLoading("load-outline")}
            >
              Export
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Ghost</Label>
            <Button
              variant="ghost"
              loading={loadingButtons.has("load-ghost")}
              onClick={() => simulateLoading("load-ghost")}
            >
              Refresh
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Small</Label>
            <Button
              size="sm"
              loading={loadingButtons.has("load-sm")}
              onClick={() => simulateLoading("load-sm")}
            >
              Submit
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Large</Label>
            <Button
              size="lg"
              loading={loadingButtons.has("load-lg")}
              onClick={() => simulateLoading("load-lg", 3000)}
            >
              Processing
            </Button>
          </ComponentItem>
          <ComponentItem className="col-span-full">
            <Label>Full Width</Label>
            <Button
              full
              loading={loadingButtons.has("load-full")}
              onClick={() => simulateLoading("load-full", 2500)}
            >
              Submitting Application
            </Button>
          </ComponentItem>
        </ComponentGrid>

        {/* Input Component */}
        <SectionTitle title="Input" />

        <SubsectionTitle title="Sizes" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Small</Label>
            <Input
              size="sm"
              placeholder="Small input"
              value={inputSmall}
              onChange={(e) => setInputSmall(e.target.value)}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Medium</Label>
            <Input
              size="md"
              placeholder="Medium input"
              value={inputMedium}
              onChange={(e) => setInputMedium(e.target.value)}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Large</Label>
            <Input
              size="lg"
              placeholder="Large input"
              value={inputLarge}
              onChange={(e) => setInputLarge(e.target.value)}
            />
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="States" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Default</Label>
            <Input
              state="default"
              placeholder="Default state"
              value={inputDefault}
              onChange={(e) => setInputDefault(e.target.value)}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Error</Label>
            <Input
              state="error"
              placeholder="Error state"
              value={inputError}
              onChange={(e) => setInputError(e.target.value)}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Disabled</Label>
            <Input disabled placeholder="Disabled input" />
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="With Label" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Default</Label>
            <Input label="Email address" placeholder="you@example.com" />
          </ComponentItem>
          <ComponentItem>
            <Label>Error state</Label>
            <Input label="Username" state="error" placeholder="Enter username" />
          </ComponentItem>
          <ComponentItem>
            <Label>Disabled</Label>
            <Input label="Read-only field" disabled placeholder="Cannot edit" />
          </ComponentItem>
        </ComponentGrid>

        {/* Textarea Component */}
        <SectionTitle title="Textarea" />

        <SubsectionTitle title="Variants" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Primary</Label>
            <Textarea
              variant="primary"
              placeholder="Primary textarea"
              value={textareaPrimary}
              onChange={(e) => setTextareaPrimary(e.target.value)}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Secondary</Label>
            <Textarea
              variant="secondary"
              placeholder="Secondary textarea"
              value={textareaSecondary}
              onChange={(e) => setTextareaSecondary(e.target.value)}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Outline</Label>
            <Textarea
              variant="outline"
              placeholder="Outline textarea"
              value={textareaOutline}
              onChange={(e) => setTextareaOutline(e.target.value)}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Ghost</Label>
            <Textarea
              variant="ghost"
              placeholder="Ghost textarea"
              value={textareaGhost}
              onChange={(e) => setTextareaGhost(e.target.value)}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Auto-Grow</Label>
            <Textarea
              variant="primary"
              placeholder="This textarea will grow as you type..."
              autoGrow
              value={textareaAutoGrow}
              onChange={(e) => setTextareaAutoGrow(e.target.value)}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>With Character Count</Label>
            <Textarea
              variant="primary"
              placeholder="Type something..."
              showCharacterCount
              value={textareaCharCount}
              onChange={(e) => setTextareaCharCount(e.target.value)}
            />
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Sizes" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Small</Label>
            <Textarea
              size="sm"
              placeholder="Small textarea"
              value={textareaSmall}
              onChange={(e) => setTextareaSmall(e.target.value)}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Medium</Label>
            <Textarea
              size="md"
              placeholder="Medium textarea"
              value={textareaMedium}
              onChange={(e) => setTextareaMedium(e.target.value)}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Large</Label>
            <Textarea
              size="lg"
              placeholder="Large textarea"
              value={textareaLarge}
              onChange={(e) => setTextareaLarge(e.target.value)}
            />
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="With Label" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Primary</Label>
            <Textarea label="Cover letter" placeholder="Tell us about yourself..." />
          </ComponentItem>
          <ComponentItem>
            <Label>With character count</Label>
            <Textarea
              label="Notes"
              placeholder="Add any notes..."
              showCharacterCount
              maxLength={200}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Auto-grow</Label>
            <Textarea label="Description" placeholder="Grows as you type..." autoGrow />
          </ComponentItem>
        </ComponentGrid>

        {/* Select Component */}
        <SectionTitle title="Select" />

        <SubsectionTitle title="Sizes" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Small</Label>
            <Select
              size="sm"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </ComponentItem>
          <ComponentItem>
            <Label>Medium</Label>
            <Select
              size="md"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </ComponentItem>
          <ComponentItem>
            <Label>Large</Label>
            <Select
              size="lg"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="States" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Default</Label>
            <Select
              state="default"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </ComponentItem>
          <ComponentItem>
            <Label>Error</Label>
            <Select
              state="error"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </ComponentItem>
          <ComponentItem>
            <Label>Disabled</Label>
            <Select disabled>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="With Label" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Default</Label>
            <Select label="Job type">
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </Select>
          </ComponentItem>
          <ComponentItem>
            <Label>Error state</Label>
            <Select label="Status" state="error">
              <option value="">Select status...</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
            </Select>
          </ComponentItem>
          <ComponentItem>
            <Label>Disabled</Label>
            <Select label="Location" disabled>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </Select>
          </ComponentItem>
        </ComponentGrid>

        {/* Dialog Component */}
        <SectionTitle title="Dialog" />

        <SubsectionTitle title="Interactive Example" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6">
          <Button variant="primary" onClick={() => setDialogOpen(true)}>
            Open Dialog
          </Button>

          <Dialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Sample Dialog"
            description="This is a modal dialog component that can be used for confirmations, forms, or other interactive content."
            size="md"
            buttonRow={
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setDialogOpen(false)}>
                  Confirm
                </Button>
              </div>
            }
          >
            <div className="space-y-4">
              <p className="text-(--color-text)">
                You can place any content here - forms, confirmations, or custom UI.
              </p>
              <Input placeholder="Example input field" />
              <Textarea placeholder="Example textarea field" />
            </div>
          </Dialog>
        </div>

        <SubsectionTitle title="Popover Example" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6">
          <Button variant="outline" onClick={() => setPopoverOpen(true)}>
            Open Popover
          </Button>
          <Dialog
            open={popoverOpen}
            onOpenChange={setPopoverOpen}
            title="Sample Popover"
            description="This is a non-modal popover example. Click outside to close."
            size="sm"
            modal={false}
          >
            <p className="text-(--color-text)">
              This is a popover. It doesn't block interaction with the rest of the page.
            </p>
          </Dialog>
        </div>

        {/* DataTable Component */}
        <SectionTitle title="DataTable" />

        <SubsectionTitle title="Job Applications" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 overflow-x-auto">
          <DataTable
            data={sampleApplications}
            columns={columns}
            size="md"
            variant="default"
            rowStyle={{ hoverable: true }}
            sortable
            stickyHeader={false}
          />
        </div>

        <SubsectionTitle title="Compact Variant" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 overflow-x-auto">
          <DataTable
            data={sampleApplications}
            columns={columns}
            size="sm"
            variant="compact"
            rowStyle={{ hoverable: true }}
            sortable
            stickyHeader={false}
          />
        </div>

        {/* Badge Component */}
        <SectionTitle title="Badge" />

        <SubsectionTitle title="Variants" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-sm items-center">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>

        <SubsectionTitle title="Sizes" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-sm items-center">
          <Badge size="sm" variant="info">
            Small
          </Badge>
          <Badge size="md" variant="info">
            Medium
          </Badge>
          <Badge size="lg" variant="info">
            Large
          </Badge>
        </div>

        <SubsectionTitle title="Outline" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-sm items-center">
          <Badge outline variant="default">
            Default
          </Badge>
          <Badge outline variant="success">
            Success
          </Badge>
          <Badge outline variant="error">
            Error
          </Badge>
          <Badge outline variant="warning">
            Warning
          </Badge>
          <Badge outline variant="info">
            Info
          </Badge>
        </div>

        <SubsectionTitle title="Pill vs Rectangular" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-sm items-center">
          <Badge rounded variant="success">
            Pill
          </Badge>
          <Badge rounded={false} variant="success">
            Rectangular
          </Badge>
          <Badge outline rounded variant="info">
            Outline Pill
          </Badge>
          <Badge outline rounded={false} variant="info">
            Outline Rect
          </Badge>
        </div>

        <SubsectionTitle title="With Icon" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-sm items-center">
          <Badge variant="success" icon={<span aria-hidden="true">✓</span>}>
            Verified
          </Badge>
          <Badge variant="error" icon={<span aria-hidden="true">✕</span>}>
            Failed
          </Badge>
          <Badge variant="warning" icon={<span aria-hidden="true">⚠</span>}>
            Review
          </Badge>
          <Badge variant="info" icon={<span aria-hidden="true">ℹ</span>}>
            Note
          </Badge>
        </div>

        <SubsectionTitle title="Dismissable" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-sm items-center">
          {!dismissedBadges.has("d-success") && (
            <Badge variant="success" dismissable onDismiss={() => dismissBadge("d-success")}>
              Saved
            </Badge>
          )}
          {!dismissedBadges.has("d-error") && (
            <Badge variant="error" dismissable onDismiss={() => dismissBadge("d-error")}>
              Error
            </Badge>
          )}
          {!dismissedBadges.has("d-warning") && (
            <Badge variant="warning" dismissable onDismiss={() => dismissBadge("d-warning")}>
              Warning
            </Badge>
          )}
          {!dismissedBadges.has("d-info") && (
            <Badge variant="info" size="sm" dismissable onDismiss={() => dismissBadge("d-info")}>
              Info (small)
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={resetAllBadges}>
            Reset
          </Button>
        </div>

        <SubsectionTitle title="With Actions" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-sm items-center">
          <Badge variant="warning" actions={[{ label: "Undo", onClick: () => alert("Undone!") }]}>
            Archived
          </Badge>
          <Badge
            variant="info"
            actions={[
              { label: "View", onClick: () => alert("View clicked") },
              { label: "Dismiss", onClick: () => alert("Dismiss clicked") },
            ]}
          >
            2 new messages
          </Badge>
          <Badge
            variant="success"
            dismissable
            onDismiss={() => alert("Dismissed")}
            actions={[{ label: "Details", onClick: () => alert("Details") }]}
          >
            Offer received
          </Badge>
        </div>

        {/* ============================================================ */}
        {/* Toast */}
        {/* ============================================================ */}
        <SectionTitle title="Toast" />

        <SubsectionTitle title="Variants" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Default</Label>
            <Button
              variant="outline"
              onClick={() =>
                addToast({ title: "Default toast", description: "This is a default notification." })
              }
            >
              Show Default
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Success</Label>
            <Button
              variant="outline"
              onClick={() =>
                addToast({
                  variant: "success",
                  title: "Saved successfully",
                  description: "Your changes have been saved.",
                })
              }
            >
              Show Success
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Error</Label>
            <Button
              variant="outline"
              onClick={() =>
                addToast({
                  variant: "error",
                  title: "Something went wrong",
                  description: "Please try again later.",
                })
              }
            >
              Show Error
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Warning</Label>
            <Button
              variant="outline"
              onClick={() =>
                addToast({
                  variant: "warning",
                  title: "Heads up",
                  description: "This action cannot be undone.",
                })
              }
            >
              Show Warning
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>Info</Label>
            <Button
              variant="outline"
              onClick={() =>
                addToast({
                  variant: "info",
                  title: "New update available",
                  description: "Refresh the page to get the latest version.",
                })
              }
            >
              Show Info
            </Button>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="With Action" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Action Button</Label>
            <Button
              variant="outline"
              onClick={() =>
                addToast({
                  variant: "info",
                  title: "Application archived",
                  description: "The application has been moved to your archive.",
                  action: { label: "Undo", onClick: () => alert("Undone!") },
                })
              }
            >
              Show With Action
            </Button>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="No Auto-Dismiss" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Persistent (duration=0)</Label>
            <Button
              variant="outline"
              onClick={() =>
                addToast({
                  variant: "warning",
                  title: "Action required",
                  description: "This toast will stay until you dismiss it.",
                  duration: 0,
                })
              }
            >
              Show Persistent
            </Button>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Timer Bar" />
        <ComponentGrid>
          <ComponentItem>
            <Label>3 seconds</Label>
            <Button
              variant="outline"
              onClick={() =>
                addToast({
                  variant: "info",
                  title: "Quick notification",
                  description: "Dismisses in 3 seconds.",
                  duration: 3000,
                })
              }
            >
              3s Timer
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>10 seconds</Label>
            <Button
              variant="outline"
              onClick={() =>
                addToast({
                  variant: "success",
                  title: "Changes saved",
                  description: "Auto-dismisses in 10 seconds.",
                  duration: 10000,
                })
              }
            >
              10s Timer
            </Button>
          </ComponentItem>
          <ComponentItem>
            <Label>With action + timer</Label>
            <Button
              variant="outline"
              onClick={() =>
                addToast({
                  variant: "warning",
                  title: "Deleting in 8s",
                  description: "This will be permanent.",
                  duration: 8000,
                  action: { label: "Cancel", onClick: () => alert("Cancelled!") },
                })
              }
            >
              8s + Cancel
            </Button>
          </ComponentItem>
        </ComponentGrid>

        {/* ============================================================ */}
        {/* Dropdown */}
        {/* ============================================================ */}
        <SectionTitle title="Dropdown" />

        <SubsectionTitle title="Trigger icons" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Kebab (default) — vertical ⋮</Label>
            <div className="flex items-center gap-sm">
              <span className="text-sm text-(--color-text-secondary)">trigger="kebab"</span>
              <Dropdown
                trigger="kebab"
                triggerLabel="Kebab trigger"
                items={[
                  { label: "Edit", onClick: () => alert("Edit") },
                  { label: "Archive", onClick: () => alert("Archive") },
                  { label: "Delete", onClick: () => alert("Delete"), variant: "danger" },
                ]}
              />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Meatball — horizontal ···</Label>
            <div className="flex items-center gap-sm">
              <span className="text-sm text-(--color-text-secondary)">trigger="meatball"</span>
              <Dropdown
                trigger="meatball"
                triggerLabel="Meatball trigger"
                items={[
                  { label: "Edit", onClick: () => alert("Edit") },
                  { label: "Archive", onClick: () => alert("Archive") },
                  { label: "Delete", onClick: () => alert("Delete"), variant: "danger" },
                ]}
              />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Bento 3×3 grid</Label>
            <div className="flex items-center gap-sm">
              <span className="text-sm text-(--color-text-secondary)">trigger="bento"</span>
              <Dropdown
                trigger="bento"
                triggerLabel="Bento trigger"
                items={[
                  { label: "Edit", onClick: () => alert("Edit") },
                  { label: "Archive", onClick: () => alert("Archive") },
                  { label: "Delete", onClick: () => alert("Delete"), variant: "danger" },
                ]}
              />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Doner — tapered stack</Label>
            <div className="flex items-center gap-sm">
              <span className="text-sm text-(--color-text-secondary)">trigger="doner"</span>
              <Dropdown
                trigger="doner"
                triggerLabel="Doner trigger"
                items={[
                  { label: "Edit", onClick: () => alert("Edit") },
                  { label: "Archive", onClick: () => alert("Archive") },
                  { label: "Delete", onClick: () => alert("Delete"), variant: "danger" },
                ]}
              />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Hamburger — equal lines</Label>
            <div className="flex items-center gap-sm">
              <span className="text-sm text-(--color-text-secondary)">trigger="hamburger"</span>
              <Dropdown
                trigger="hamburger"
                triggerLabel="Hamburger trigger"
                items={[
                  { label: "Edit", onClick: () => alert("Edit") },
                  { label: "Archive", onClick: () => alert("Archive") },
                  { label: "Delete", onClick: () => alert("Delete"), variant: "danger" },
                ]}
              />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Custom React node trigger</Label>
            <Dropdown
              align="start"
              triggerLabel="Custom trigger"
              trigger={
                <span className="text-sm px-sm py-xs border border-base rounded-md">Actions ▾</span>
              }
              items={[
                { label: "Edit", onClick: () => alert("Edit") },
                { label: "Archive", onClick: () => alert("Archive") },
                { label: "Delete", onClick: () => alert("Delete"), variant: "danger" },
              ]}
            />
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Item variants" />
        <ComponentGrid>
          <ComponentItem>
            <Label>With icons</Label>
            <Dropdown
              triggerLabel="Row actions with icons"
              trigger="bento"
              items={[
                {
                  label: "Edit",
                  icon: <span aria-hidden="true">✏️</span>,
                  onClick: () => alert("Edit"),
                },
                {
                  label: "Share",
                  icon: <span aria-hidden="true">🔗</span>,
                  onClick: () => alert("Share"),
                },
                {
                  label: "Archive",
                  icon: <span aria-hidden="true">📦</span>,
                  onClick: () => alert("Archive"),
                },
                {
                  label: "Delete",
                  icon: <span aria-hidden="true">🗑️</span>,
                  onClick: () => alert("Delete"),
                  variant: "danger",
                },
              ]}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Disabled item</Label>
            <Dropdown
              triggerLabel="Row actions (disabled item)"
              items={[
                { label: "Edit", onClick: () => alert("Edit") },
                { label: "Share", onClick: () => alert("Share"), disabled: true },
                { label: "Delete", onClick: () => alert("Delete"), variant: "danger" },
              ]}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Disabled trigger</Label>
            <Dropdown
              disabled
              triggerLabel="Disabled dropdown"
              items={[
                { label: "Edit", onClick: () => {} },
                { label: "Delete", onClick: () => {}, variant: "danger" },
              ]}
            />
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Alignment" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6">
          <p className="text-sm text-(--color-text-secondary) mb-md">
            Open each menu to see how the panel anchors to each side of its trigger.
          </p>
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-xs items-start">
              <span className="text-xs font-medium text-(--color-text-muted)">align="start"</span>
              <Dropdown
                align="start"
                triggerLabel="Start aligned"
                items={[
                  { label: "Edit", onClick: () => alert("Edit") },
                  { label: "Archive", onClick: () => alert("Archive") },
                  { label: "Delete", onClick: () => alert("Delete"), variant: "danger" },
                ]}
              />
            </div>
            <div className="flex flex-col gap-xs items-end">
              <span className="text-xs font-medium text-(--color-text-muted)">
                align="end" (default)
              </span>
              <Dropdown
                align="end"
                triggerLabel="End aligned"
                items={[
                  { label: "Edit", onClick: () => alert("Edit") },
                  { label: "Archive", onClick: () => alert("Archive") },
                  { label: "Delete", onClick: () => alert("Delete"), variant: "danger" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* EmptyState Component */}
        <SectionTitle title="EmptyState" />

        <SubsectionTitle title="Default (No Applications)" />
        <ComponentGrid>
          <ComponentItem className="col-span-full">
            <Label>Default — with CTA</Label>
            <EmptyState
              action={{ label: "Add Application", onClick: () => alert("Add Application") }}
            />
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Custom Content" />
        <ComponentGrid>
          <ComponentItem>
            <Label>No action</Label>
            <EmptyState
              title="No saved jobs"
              description="Browse job boards and save positions you're interested in."
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Muted variant</Label>
            <EmptyState
              variant="muted"
              title="No results found"
              description="Try adjusting your search filters."
            />
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Sizes" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Small</Label>
            <EmptyState
              size="sm"
              title="No applications yet"
              description="Add your first application."
              action={{ label: "Add", onClick: () => alert("Add") }}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Medium (default)</Label>
            <EmptyState
              size="md"
              title="No applications yet"
              description="Track your job search from application to offer."
              action={{ label: "Add Application", onClick: () => alert("Add") }}
            />
          </ComponentItem>
          <ComponentItem>
            <Label>Large</Label>
            <EmptyState
              size="lg"
              title="No applications yet"
              description="Track your job search from application to offer. Add your first application to get started."
              action={{ label: "Add Application", onClick: () => alert("Add") }}
            />
          </ComponentItem>
        </ComponentGrid>

        {/* Icon Component */}
        <SectionTitle title="Icon" />

        <SubsectionTitle title="Sizes" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Extra Small (xs)</Label>
            <div className="flex items-center gap-md">
              <Icon name="kebab" size="xs" />
              <Icon name="check-circle" size="xs" variant="success" />
              <Icon name="x-circle" size="xs" variant="error" />
              <Icon name="bell" size="xs" />
              <Icon name="briefcase" size="xs" variant="warning" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Small (sm)</Label>
            <div className="flex items-center gap-md">
              <Icon name="kebab" size="sm" />
              <Icon name="check-circle" size="sm" variant="success" />
              <Icon name="x-circle" size="sm" variant="error" />
              <Icon name="bell" size="sm" />
              <Icon name="briefcase" size="sm" variant="warning" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Medium (md) — default</Label>
            <div className="flex items-center gap-md">
              <Icon name="kebab" size="md" />
              <Icon name="check-circle" size="md" variant="success" />
              <Icon name="x-circle" size="md" variant="error" />
              <Icon name="bell" size="md" />
              <Icon name="briefcase" size="md" variant="warning" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Large (lg)</Label>
            <div className="flex items-center gap-md">
              <Icon name="kebab" size="lg" />
              <Icon name="check-circle" size="lg" variant="success" />
              <Icon name="x-circle" size="lg" variant="error" />
              <Icon name="bell" size="lg" />
              <Icon name="briefcase" size="lg" variant="warning" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Extra Large (xl)</Label>
            <div className="flex items-center gap-md">
              <Icon name="kebab" size="xl" />
              <Icon name="check-circle" size="xl" variant="success" />
              <Icon name="x-circle" size="xl" variant="error" />
              <Icon name="bell" size="xl" />
              <Icon name="briefcase" size="xl" variant="warning" />
            </div>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Color Variants" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Default</Label>
            <div className="flex items-center gap-md">
              <Icon name="briefcase" variant="default" />
              <Icon name="bell" variant="default" />
              <Icon name="hamburger" variant="default" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Muted</Label>
            <div className="flex items-center gap-md">
              <Icon name="briefcase" variant="muted" />
              <Icon name="bell" variant="muted" />
              <Icon name="hamburger" variant="muted" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Success</Label>
            <div className="flex items-center gap-md">
              <Icon name="check-circle" variant="success" />
              <Icon name="briefcase" variant="success" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Error</Label>
            <div className="flex items-center gap-md">
              <Icon name="x-circle" variant="error" />
              <Icon name="x" variant="error" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Warning</Label>
            <div className="flex items-center gap-md">
              <Icon name="alert-triangle" variant="warning" />
              <Icon name="briefcase" variant="warning" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Info</Label>
            <div className="flex items-center gap-md">
              <Icon name="info" variant="info" />
              <Icon name="bell" variant="info" />
            </div>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Navigation Icons" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Kebab Menu (⋮)</Label>
            <div className="flex items-center gap-md">
              <Icon name="kebab" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Meatball Menu (⋯)</Label>
            <div className="flex items-center gap-md">
              <Icon name="meatball" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Bento Menu (3×3 Grid)</Label>
            <div className="flex items-center gap-md">
              <Icon name="bento" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Doner Menu</Label>
            <div className="flex items-center gap-md">
              <Icon name="doner" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Hamburger Menu</Label>
            <div className="flex items-center gap-md">
              <Icon name="hamburger" />
            </div>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Status Icons" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Success Check</Label>
            <div className="flex items-center gap-md">
              <Icon name="check-circle" variant="success" size="lg" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Error X</Label>
            <div className="flex items-center gap-md">
              <Icon name="x-circle" variant="error" size="lg" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Warning Triangle</Label>
            <div className="flex items-center gap-md">
              <Icon name="alert-triangle" variant="warning" size="lg" />
            </div>
          </ComponentItem>
          <ComponentItem>
            <Label>Info Circle</Label>
            <div className="flex items-center gap-md">
              <Icon name="info" variant="info" size="lg" />
            </div>
          </ComponentItem>
        </ComponentGrid>

        {/* Popover Component */}
        <SectionTitle title="Popover" />

        <SubsectionTitle title="Default (click)" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Bottom start (default)</Label>
            <Popover
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  Open popover
                </Button>
              )}
              side="bottom"
              align="start"
            >
              <p className="text-sm text-(--color-text)">
                This is a simple popover with freeform content.
              </p>
            </Popover>
          </ComponentItem>
          <ComponentItem>
            <Label>With action</Label>
            <Popover
              trigger={(props) => (
                <Button variant="primary" size="sm" {...props}>
                  Show options
                </Button>
              )}
              side="bottom"
              align="start"
            >
              <div className="flex flex-col gap-sm">
                <p className="text-sm font-semibold text-(--color-text)">Quick actions</p>
                <Button variant="ghost" size="sm" full>
                  Edit application
                </Button>
                <Button variant="ghost" size="sm" full>
                  Archive
                </Button>
                <Button variant="ghost" size="sm" full>
                  Delete
                </Button>
              </div>
            </Popover>
          </ComponentItem>
          <ComponentItem>
            <Label>Rich content</Label>
            <Popover
              trigger={(props) => (
                <Button variant="secondary" size="sm" {...props}>
                  Job details
                </Button>
              )}
              side="bottom"
              align="start"
              size="lg"
            >
              <div className="flex flex-col gap-sm">
                <p className="text-sm font-semibold text-(--color-text)">
                  Senior Frontend Engineer
                </p>
                <p className="text-sm text-secondary">Acme Corp · Remote · $120k–$150k</p>
                <div className="flex gap-xs pt-xs">
                  <span className="text-xs px-sm py-xs bg-muted rounded-full text-secondary">
                    React
                  </span>
                  <span className="text-xs px-sm py-xs bg-muted rounded-full text-secondary">
                    TypeScript
                  </span>
                  <span className="text-xs px-sm py-xs bg-muted rounded-full text-secondary">
                    Node.js
                  </span>
                </div>
              </div>
            </Popover>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Sizes" />
        <ComponentGrid>
          <ComponentItem>
            <Label>Small</Label>
            <Popover
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  sm
                </Button>
              )}
              size="sm"
            >
              <p className="text-sm text-(--color-text)">Small panel</p>
            </Popover>
          </ComponentItem>
          <ComponentItem>
            <Label>Medium (default)</Label>
            <Popover
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  md
                </Button>
              )}
              size="md"
            >
              <p className="text-sm text-(--color-text)">Medium panel</p>
            </Popover>
          </ComponentItem>
          <ComponentItem>
            <Label>Large</Label>
            <Popover
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  lg
                </Button>
              )}
              size="lg"
            >
              <p className="text-sm text-(--color-text)">Large panel with more breathing room</p>
            </Popover>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Placement — side" />
        <ComponentGrid>
          <ComponentItem>
            <Label>bottom (default)</Label>
            <Popover
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  Bottom
                </Button>
              )}
              side="bottom"
            >
              <p className="text-sm text-(--color-text)">Opens below</p>
            </Popover>
          </ComponentItem>
          <ComponentItem>
            <Label>top</Label>
            <Popover
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  Top
                </Button>
              )}
              side="top"
            >
              <p className="text-sm text-(--color-text)">Opens above</p>
            </Popover>
          </ComponentItem>
          <ComponentItem>
            <Label>right</Label>
            <Popover
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  Right
                </Button>
              )}
              side="right"
            >
              <p className="text-sm text-(--color-text)">Opens to the right</p>
            </Popover>
          </ComponentItem>
          <ComponentItem>
            <Label>left</Label>
            <Popover
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  Left
                </Button>
              )}
              side="left"
            >
              <p className="text-sm text-(--color-text)">Opens to the left</p>
            </Popover>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Placement — align" />
        <ComponentGrid>
          <ComponentItem>
            <Label>start (default)</Label>
            <Popover
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  Start
                </Button>
              )}
              align="start"
            >
              <p className="text-sm text-(--color-text)">Aligned to start</p>
            </Popover>
          </ComponentItem>
          <ComponentItem>
            <Label>center</Label>
            <Popover
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  Center
                </Button>
              )}
              align="center"
            >
              <p className="text-sm text-(--color-text)">Aligned to center</p>
            </Popover>
          </ComponentItem>
          <ComponentItem>
            <Label>end</Label>
            <Popover
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  End
                </Button>
              )}
              align="end"
            >
              <p className="text-sm text-(--color-text)">Aligned to end</p>
            </Popover>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Interaction modes" />
        <ComponentGrid>
          <ComponentItem>
            <Label>click (default)</Label>
            <Popover
              openOn="click"
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  Click me
                </Button>
              )}
            >
              <p className="text-sm text-(--color-text)">Opened by click</p>
            </Popover>
          </ComponentItem>
          <ComponentItem>
            <Label>hover</Label>
            <Popover
              openOn="hover"
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  Hover me
                </Button>
              )}
            >
              <p className="text-sm text-(--color-text)">Opened by hover</p>
            </Popover>
          </ComponentItem>
          <ComponentItem>
            <Label>focus</Label>
            <Popover
              openOn="focus"
              trigger={(props) => (
                <Button variant="outline" size="sm" {...props}>
                  Focus me
                </Button>
              )}
            >
              <p className="text-sm text-(--color-text)">Opened by focus (Tab to this button)</p>
            </Popover>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Modal mode" />
        <ComponentGrid>
          <ComponentItem className="col-span-full">
            <Label>modal=true — backdrop + focus trap</Label>
            <Popover
              modal
              trigger={(props) => (
                <Button variant="primary" size="sm" {...props}>
                  Open modal popover
                </Button>
              )}
              size="md"
            >
              <div className="flex flex-col gap-md">
                <p className="text-sm font-semibold text-(--color-text)">Confirm action</p>
                <p className="text-sm text-secondary">
                  This popover traps focus and blocks background interaction.
                </p>
                <div className="flex gap-sm justify-end">
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm">
                    Confirm
                  </Button>
                </div>
              </div>
            </Popover>
          </ComponentItem>
        </ComponentGrid>

        <SubsectionTitle title="Controlled state" />
        <ComponentGrid>
          <ComponentItem className="col-span-full">
            <Label>Controlled open/close from parent</Label>
            <ControlledPopoverExample />
          </ComponentItem>
        </ComponentGrid>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-(--color-border) text-(--color-text-secondary) text-center">
          <p>All components are fully responsive and support theming through design tokens.</p>
        </div>
      </div>

      {/* Toast Stack */}
      <div className="fixed bottom-md right-md z-50 flex flex-col gap-sm w-80">
        {toasts.map((t) => (
          <Toast
            key={t.toastKey}
            variant={t.variant}
            title={t.title}
            description={t.description}
            action={t.action}
            duration={t.duration}
            onDismiss={() => dismissToast(t.toastKey)}
          />
        ))}
      </div>
    </div>
  );
};
