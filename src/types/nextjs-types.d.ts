// This file provides type declarations for Next.js and React
import React from "react";

declare module "react" {
  export = React;
  export as namespace React;
}

declare module "next/link" {
  import React from "react";

  export interface LinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
  }

  const Link: React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
  export default Link;
}

declare module "next/image" {
  import React from "react";

  export interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    quality?: number;
    priority?: boolean;
    placeholder?: "blur" | "empty";
    style?: React.CSSProperties;
    className?: string;
    onLoadingComplete?: (result: {
      naturalWidth: number;
      naturalHeight: number;
    }) => void;
    onLoad?: (event: Event) => void;
    onError?: (error: Error) => void;
    loading?: "lazy" | "eager";
    blurDataURL?: string;
  }

  const Image: React.FC<ImageProps>;
  export default Image;
}

declare module "next/navigation" {
  export function useRouter(): {
    push: (url: string, options?: any) => Promise<boolean>;
    replace: (url: string, options?: any) => Promise<boolean>;
    back: () => void;
    forward: () => void;
    refresh: () => void;
    prefetch: (url: string) => Promise<void>;
  };

  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module "framer-motion" {
  export interface AnimatePresenceProps {
    children?: React.ReactNode;
    custom?: any;
    initial?: boolean;
    onExitComplete?: () => void;
    exitBeforeEnter?: boolean;
    mode?: "sync" | "wait" | "popLayout";
  }

  export const AnimatePresence: React.FC<AnimatePresenceProps>;

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    whileHover?: any;
    whileTap?: any;
    whileFocus?: any;
    whileDrag?: any;
    whileInView?: any;
    drag?: boolean | "x" | "y";
    dragConstraints?: any;
    dragControls?: any;
    dragListener?: boolean;
    dragElastic?: number | boolean;
    dragMomentum?: boolean;
    layout?: boolean | "position" | "size";
    layoutId?: string;
  }

  export const motion: {
    div: React.ForwardRefExoticComponent<
      MotionProps & React.HTMLAttributes<HTMLDivElement>
    >;
    span: React.ForwardRefExoticComponent<
      MotionProps & React.HTMLAttributes<HTMLSpanElement>
    >;
    button: React.ForwardRefExoticComponent<
      MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>
    >;
    a: React.ForwardRefExoticComponent<
      MotionProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
    >;
    ul: React.ForwardRefExoticComponent<
      MotionProps & React.HTMLAttributes<HTMLUListElement>
    >;
    li: React.ForwardRefExoticComponent<
      MotionProps & React.HTMLAttributes<HTMLLIElement>
    >;
    header: React.ForwardRefExoticComponent<
      MotionProps & React.HTMLAttributes<HTMLElement>
    >;
    nav: React.ForwardRefExoticComponent<
      MotionProps & React.HTMLAttributes<HTMLElement>
    >;
  };

  export function useInView(
    ref: React.RefObject<HTMLElement>,
    options?: {
      root?: Element | null;
      margin?: string;
      amount?: "some" | "all" | number;
      once?: boolean;
    }
  ): boolean;
}
