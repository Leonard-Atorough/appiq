import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = { title: "Shared/Textarea", component: Textarea };
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-md ">
      <Textarea variant="primary" label="Primary" placeholder="Primary variant…" />
      <Textarea variant="secondary" label="Secondary" placeholder="Secondary variant…" />
      <Textarea variant="outline" label="Outline" placeholder="Outline variant…" />
      <Textarea variant="ghost" label="Ghost" placeholder="Ghost variant…" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Textarea size="sm" label="Small" placeholder="Small…" />
      <Textarea size="md" label="Medium" placeholder="Medium…" />
      <Textarea size="lg" label="Large" placeholder="Large…" />
    </div>
  ),
};

export const AutoGrow: Story = {
  render: () => (
    <div className="">
      <Textarea
        label="Auto-grow (min 2, max 6 rows)"
        placeholder="Start typing to see it grow…"
        autoGrow
        minRows={2}
        maxRows={6}
      />
    </div>
  ),
};

export const CharacterCount: Story = {
  render: () => (
    <div className="">
      <Textarea
        label="Cover letter"
        placeholder="Write your cover letter…"
        showCharacterCount
        maxLength={500}
      />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => <Textarea label="Notes" placeholder="Full width textarea…" full />,
};
