export interface AppShellProps {
  header?: React.ReactNode;
  nav?: React.ReactNode;
  children: React.ReactNode;
  /** Whether the mobile menu is open */
  isMenuOpen?: boolean;
  /** Callback when menu state changes */
  onMenuOpenChange?: (open: boolean) => void;
}
