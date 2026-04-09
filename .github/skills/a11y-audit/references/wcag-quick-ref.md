# WCAG quick reference

This is a condensed version of the WCAG 2.1 guidelines, focused on key points for quick reference during audits. For full details, refer to the official WCAG documentation.

## Example: Modal Dialog

```tsx
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus the dialog when it opens
    dialogRef.current?.focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-surface rounded-lg shadow-lg
          p-6 max-w-md w-full
          focus:outline-2 focus:outline-(--color-primary)
        `}
      >
        <h2 id="modal-title" className="text-xl font-bold">
          {title}
        </h2>
        {children}
      </div>
    </>
  );
}
```

## Key WCAG Principles

### Perceivable

- **1.1 Text Alternatives**: Provide text alternatives for non-text content
- **1.3 Adaptable**: Create content that can be presented in different ways
- **1.4 Distinguishable**: Make it easier to see and hear content

### Operable

- **2.1 Keyboard Accessible**: All functionality available via keyboard
- **2.2 Enough Time**: Provide users time to read and use content
- **2.4 Navigable**: Help users navigate and find content

### Understandable

- **3.1 Readable**: Make text readable and understandable
- **3.2 Predictable**: Make pages appear and operate predictably
- **3.3 Input Assistance**: Help users avoid and correct mistakes

### Robust

- **4.1 Compatible**: Maximize compatibility with current and future technologies

## Quick Audit Checklist

- [ ] Images have descriptive alt text
- [ ] Color is not the only way to convey information
- [ ] All interactive elements are keyboard accessible
- [ ] Form labels are properly associated with inputs
- [ ] Focus indicators are visible
- [ ] Headings are used correctly and in order
- [ ] Links have descriptive text
- [ ] Videos have captions and transcripts
- [ ] Content is resilient to text sizing
- [ ] ARIA roles and attributes are used correctly (when needed)

## Example: Status Badge

```tsx
interface Application {
  title: string;
  company: string;
  status: "pending" | "interview" | "offer" | "rejected";
  notes?: string;
}

function ApplicationCard({ application }: { application: Application }) {
  const statusColors = {
    pending: "bg-warning",
    interview: "bg-primary-500",
    offer: "bg-success",
    rejected: "bg-error",
  };

  return (
    <div className="p-4 border border-base rounded-lg bg-surface">
      <h3 className="text-lg font-semibold">
        {application.title} at {application.company}
      </h3>
      <span
        className={`
            inline-block px-2 py-1 mt-2 text-sm font-medium rounded
            ${statusColors[application.status]} text-white
            `}
      >
        {application.status}
      </span>
    </div>
  );
}
```

## Example: Form Input with Label

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, required, ...props }: InputProps) {
  const inputId = id || `input-${Math.random()}`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-semibold text-(--color-text)">
        {label}
        {required && <span className="text-error">*</span>}
      </label>

      <input
        id={inputId}
        className={`
          px-3 py-2 rounded border-2
          focus:outline-none focus:border-(--color-primary)
          ${error ? "border-error" : "border-base"}
        `}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />

      {error && (
        <span id={`${inputId}-error`} className="text-xs text-(--color-error)" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
```

# For more examples and detailed explanations, refer to the full WCAG documentation and the accessible patterns reference.
