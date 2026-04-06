import { useState, useEffect } from "react";
import { Badge } from "@shared/ui/Badge";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { Textarea } from "@shared/ui/Textarea";
import { Select } from "@shared/ui/Select";
import { Dialog } from "@shared/ui/Dialog";
import { DataTable } from "@shared/ui/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import type { JobApplication } from "@entities/application/model/types";

export const ComponentShowcase = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-4">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>

        <SubsectionTitle title="Sizes" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-4 items-center">
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

        <SubsectionTitle title="Outline Variant" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-4">
          <Badge outline variant="default">
            Default Outline
          </Badge>
          <Badge outline variant="success">
            Success Outline
          </Badge>
          <Badge outline variant="error">
            Error Outline
          </Badge>
          <Badge outline variant="warning">
            Warning Outline
          </Badge>
          <Badge outline variant="info">
            Info Outline
          </Badge>
        </div>

        <SubsectionTitle title="With Dismiss" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-4">
          <Badge variant="success" dismissable onDismiss={() => console.log("Dismissed")}>
            Dismissible Badge
          </Badge>
          <Badge variant="error" dismissable onDismiss={() => console.log("Dismissed")}>
            Error Dismissible
          </Badge>
          <Badge variant="info" size="sm" dismissable onDismiss={() => console.log("Dismissed")}>
            Small Dismiss
          </Badge>
        </div>

        <SubsectionTitle title="Rounded Variants" />
        <div className="p-6 bg-(--color-muted-bg) rounded-lg mb-6 flex flex-wrap gap-4">
          <Badge rounded={true} variant="success">
            Pill Shape
          </Badge>
          <Badge rounded={false} variant="success">
            Rectangular
          </Badge>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-(--color-border) text-(--color-text-secondary) text-center">
          <p>All components are fully responsive and support theming through design tokens.</p>
        </div>
      </div>
    </div>
  );
};
