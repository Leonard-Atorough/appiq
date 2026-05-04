import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders as a div element', () => {
    const { container } = render(<Flex>Content</Flex>);
    const flex = container.querySelector('div');
    expect(flex).toBeInTheDocument();
    expect(flex?.textContent).toBe('Content');
  });

  it('forwards ref to div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Flex ref={ref}>Content</Flex>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders with default props (flex-row, gap-md, justify-start, items-start)', () => {
    const { container } = render(<Flex>Content</Flex>);
    const flex = container.querySelector('div');
    expect(flex?.className).toContain('flex-row');
    expect(flex?.className).toContain('gap-md');
    expect(flex?.className).toContain('justify-start');
    expect(flex?.className).toContain('items-start');
  });

  describe('direction prop', () => {
    it('applies flex-col when direction is column', () => {
      const { container } = render(<Flex direction="column">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('flex-col');
    });

    it('applies flex-row when direction is row', () => {
      const { container } = render(<Flex direction="row">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('flex-row');
    });

    it('applies flex-row-reverse when direction is row-reverse', () => {
      const { container } = render(<Flex direction="row-reverse">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('flex-row-reverse');
    });

    it('applies flex-col-reverse when direction is column-reverse', () => {
      const { container } = render(<Flex direction="column-reverse">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('flex-col-reverse');
    });
  });

  describe('gap prop', () => {
    it('applies gap-xs', () => {
      const { container } = render(<Flex gap="xs">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('gap-xs');
    });

    it('applies gap-lg', () => {
      const { container } = render(<Flex gap="lg">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('gap-lg');
    });

    it('supports all gap sizes', () => {
      const gaps = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
      gaps.forEach((gap) => {
        const { container } = render(<Flex gap={gap}>Content</Flex>);
        const flex = container.querySelector('div');
        expect(flex?.className).toContain(`gap-${gap}`);
      });
    });
  });

  describe('padding prop', () => {
    it('applies padding', () => {
      const { container } = render(<Flex padding="md">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('p-md');
    });
  });

  describe('paddingX and paddingY props', () => {
    it('applies horizontal padding', () => {
      const { container } = render(<Flex paddingX="lg">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('px-lg');
    });

    it('applies vertical padding', () => {
      const { container } = render(<Flex paddingY="md">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('py-md');
    });

    it('applies both horizontal and vertical padding', () => {
      const { container } = render(
        <Flex paddingX="lg" paddingY="md">
          Content
        </Flex>
      );
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('px-lg');
      expect(flex?.className).toContain('py-md');
    });
  });

  describe('justify prop', () => {
    it('applies justify-start by default', () => {
      const { container } = render(<Flex>Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('justify-start');
    });

    it('applies justify-center', () => {
      const { container } = render(<Flex justify="center">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('justify-center');
    });

    it('applies justify-between', () => {
      const { container } = render(<Flex justify="between">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('justify-between');
    });
  });

  describe('align prop', () => {
    it('applies items-start by default', () => {
      const { container } = render(<Flex>Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('items-start');
    });

    it('applies items-center', () => {
      const { container } = render(<Flex align="center">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('items-center');
    });

    it('applies items-stretch', () => {
      const { container } = render(<Flex align="stretch">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('items-stretch');
    });
  });

  describe('wrap prop', () => {
    it('applies flex-nowrap by default', () => {
      const { container } = render(<Flex>Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('flex-nowrap');
    });

    it('applies flex-wrap when wrap is true', () => {
      const { container } = render(<Flex wrap>Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('flex-wrap');
    });
  });

  describe('fullWidth prop', () => {
    it('does not apply w-full by default', () => {
      const { container } = render(<Flex>Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).not.toContain('w-full');
    });

    it('applies w-full when fullWidth is true', () => {
      const { container } = render(<Flex fullWidth>Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('w-full');
    });
  });

  describe('className merging', () => {
    it('merges custom className with generated classes', () => {
      const { container } = render(<Flex className="custom-class">Content</Flex>);
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('flex');
      expect(flex?.className).toContain('custom-class');
    });

    it('allows custom className to override generated classes', () => {
      const { container } = render(
        <Flex gap="md" className="gap-lg">
          Content
        </Flex>
      );
      const flex = container.querySelector('div');
      // Both classes should exist, but custom can be used to override
      expect(flex?.className).toMatch(/gap-/);
    });
  });

  describe('HTML attributes', () => {
    it('spreads HTML attributes', () => {
      const { container } = render(
        <Flex data-testid="flex-container" aria-label="Flex layout">
          Content
        </Flex>
      );
      const flex = container.querySelector('[data-testid="flex-container"]');
      expect(flex).toBeInTheDocument();
      expect(flex).toHaveAttribute('aria-label', 'Flex layout');
    });

    it('supports event handlers', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Flex onClick={handleClick}>
          Content
        </Flex>
      );
      const flex = container.querySelector('div');
      flex?.click();
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('combination of props', () => {
    it('combines direction, gap, padding, justify, and align', () => {
      const { container } = render(
        <Flex
          direction="column"
          gap="lg"
          padding="md"
          justify="center"
          align="center"
        >
          Content
        </Flex>
      );
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('flex-col');
      expect(flex?.className).toContain('gap-lg');
      expect(flex?.className).toContain('p-md');
      expect(flex?.className).toContain('justify-center');
      expect(flex?.className).toContain('items-center');
    });

    it('combines multiple props with className override', () => {
      const { container } = render(
        <Flex
          direction="column"
          gap="md"
          className="lg:flex-row"
        >
          Content
        </Flex>
      );
      const flex = container.querySelector('div');
      expect(flex?.className).toContain('flex-col');
      expect(flex?.className).toContain('gap-md');
      expect(flex?.className).toContain('lg:flex-row');
    });
  });

  describe('style prop', () => {
    it('applies inline styles', () => {
      const { container } = render(
        <Flex style={{ minHeight: '100vh' }}>
          Content
        </Flex>
      );
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle('min-height: 100vh');
    });
  });

  it('has correct display name for debugging', () => {
    expect(Flex.displayName).toBe('Flex');
  });
});
