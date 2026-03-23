import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Button } from "@shared/ui";
import { Dialog } from "@shared/ui/Dialog";
import { Select } from "@shared/ui/Select";
import { Input } from "@shared/ui";
import { useState } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div
        id="button-showcase"
        className="mt-4 inline-block space-x-2 space-y-2 bg-gray-100 p-4 rounded-lg"
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="primary" size="sm">
          Small
        </Button>
        <Button variant="primary" size="lg">
          Large
        </Button>
        <Button variant="primary" full>
          Full Width
        </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </div>
      <div id="dialog-showcase" className="mt-4">
        <Button variant="primary" onClick={() => setDialogOpen(true)}>
          Open Dialog
        </Button>
        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Dialog Title"
          description="Dialog description"
        >
          <p>This is the content of the dialog.</p>
        </Dialog>
      </div>
      <div id="select-showcase" className="mt-4">
        <Select>
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </div>
      <div id="input-showcase" className="mt-4 flex flex-col space-y-4">
        <Input placeholder="Enter text here" />
        <Input placeholder="Disabled input" disabled className="mt-2" />
        <Input placeholder="Error state" state="error" className="mt-2" />
        <Input placeholder="start and end adornments" startAdornment="S" endAdornment="E" wrapperClassName="flex items-center mt-2 relative w-100" className="w-100" />
      </div>
    </div>
  );
}
