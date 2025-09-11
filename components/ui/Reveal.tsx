"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

type Props = PropsWithChildren<{
  threshold?: number;
  className?: string;        // extra classes you want on the wrapper
  as?: keyof JSX.IntrinsicElements; // optional element tag
}>;

export default function Reveal({
  children,
  threshold = 0.12,
  className = "",
  as = "div",
}: Props) {
  const Tag = as as any;
  const ref = useRef<HTMLElement | null>(null);
  // SSR default: visible (prevents blank page)
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Respect reduced motion
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) return; // keep it visible, no animations

    // On the client, we can start hidden and animate in
    setShow(false);

    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.unobserve(entry.target);
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={[
        className,
        // smooth, motion-safe transition
        "transition-all duration-500 ease-[cubic-bezier(.22,.9,.25,1)]",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
