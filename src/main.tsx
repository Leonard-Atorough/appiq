import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Button } from "@shared/ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div
        id="button-showcase"
        className="flex mt-4 flex-wrap gap-4"
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
    </>
  </StrictMode>,
);
