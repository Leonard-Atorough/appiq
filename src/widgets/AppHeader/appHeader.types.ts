export interface AppHeaderProps {
  /** End slot for actions (theme toggle, user menu, etc.) */
  menuEnd?: React.ReactNode;
  className?: string;
  /** Whether the mobile menu is open */
  isMenuOpen?: boolean;
  /** Callback for when the menu button is clicked */
  onMenuOpen?: (open: boolean) => void;
}
