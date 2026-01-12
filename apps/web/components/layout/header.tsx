import { HeaderTitle } from '../ui/typography';

interface HeaderProps {
  variant?: 'light' | 'dark';
}

/**
 * Common Header component
 * @param variant - 'light' for Home page, 'dark' for Result page (transparent with white text)
 */
export default function Header({ variant = 'light' }: HeaderProps) {
  const isLight = variant === 'light';

  return (
    <header className="flex h-13 w-full items-center justify-center bg-transparent px-5 py-[17px]">
      <HeaderTitle className={isLight ? 'text-foreground text-name' : 'text-white'}>전승오</HeaderTitle>
    </header>
  );
}
