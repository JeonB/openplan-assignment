import { type ReactNode } from 'react';
import { cn } from '../../lib/utils/cn';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label' | 'a';
}

interface LinkTypographyProps extends TypographyProps {
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * Header title text (15px, medium)
 * 사용: Header 컴포넌트의 이름
 */
export function HeaderTitle({ children, className, as: Component = 'h1' }: TypographyProps) {
  return <Component className={cn('text-base leading-5 font-medium', className)}>{children}</Component>;
}

/**
 * Display text (28px mobile / 32px desktop, semibold)
 * 사용: 홈 페이지 인사말
 */
export function DisplayText({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component
      className={cn(
        'text-[28px] leading-[1.4] font-semibold tracking-[-0.48px] md:tracking-[-0.56px] xl:text-[32px]',
        className,
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Body text (15px, medium)
 * 사용: Info Cards의 label
 */
export function BodyText({ children, className, as: Component = 'span' }: TypographyProps) {
  return (
    <Component className={cn('text-base leading-[1.37] font-medium tracking-[-0.02em]', className)}>
      {children}
    </Component>
  );
}

/**
 * Body text with opacity (15px, medium, 50% opacity)
 * 사용: Info Cards의 value
 */
export function BodyTextMuted({ children, className, as: Component = 'span' }: TypographyProps) {
  return (
    <Component className={cn('text-base leading-[1.37] font-medium tracking-[-0.02em] opacity-50', className)}>
      {children}
    </Component>
  );
}

/**
 * Link text (15px, medium, 50% opacity, underline)
 * 사용: Info Cards의 URL links
 */
export function LinkText({ children, className, href, target, rel, as: Component = 'a' }: LinkTypographyProps) {
  return (
    <Component
      className={cn(
        'text-base leading-[1.37] font-medium tracking-[-0.02em] break-all underline opacity-50',
        className,
      )}
      {...(href && { href })}
      {...(target && { target })}
      {...(rel && { rel })}
    >
      {children}
    </Component>
  );
}

/**
 * Generic Typography component with variant prop
 */
interface GenericTypographyProps extends TypographyProps {
  variant?: 'header' | 'display' | 'body' | 'bodyMuted' | 'link';
}

export function Typography({ variant = 'body', children, className, as }: GenericTypographyProps) {
  switch (variant) {
    case 'header':
      return (
        <HeaderTitle className={className} as={as}>
          {children}
        </HeaderTitle>
      );
    case 'display':
      return (
        <DisplayText className={className} as={as}>
          {children}
        </DisplayText>
      );
    case 'body':
      return (
        <BodyText className={className} as={as}>
          {children}
        </BodyText>
      );
    case 'bodyMuted':
      return (
        <BodyTextMuted className={className} as={as}>
          {children}
        </BodyTextMuted>
      );
    case 'link':
      return (
        <LinkText className={className} as={as}>
          {children}
        </LinkText>
      );
    default:
      return (
        <BodyText className={className} as={as}>
          {children}
        </BodyText>
      );
  }
}
