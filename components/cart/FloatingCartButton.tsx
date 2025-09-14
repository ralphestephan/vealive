"use client";

import { useEffect, useRef, useState } from "react";
import CartButton from "./CartButton";
import { useCart } from "./CartContext";

type Props = {
  anchor: string;            // CSS selector for the section to “live inside”
  topOffset?: number;        // px offset from top (below your header)
};

export default function FloatingCartButton({ anchor, topOffset = 64 }: Props) {
  const { isOpen } = useCart(); // assumes your CartContext exposes isOpen
  const [visible, setVisible] = useState(false);
  const observed = useRef<Element | null>(null);

  useEffect(() => {
    const el = document.querySelector(anchor);
    observed.current = el;
    if (!el || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        threshold: 0, // show when any part of the grid is on screen
        root: null,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [anchor]);

  // hide if cart drawer is open or anchor not found
  if (!visible || isOpen) return null;

  return (
    <div
      className="md:hidden fixed right-4 z-[60]"
      style={{ top: `calc(env(safe-area-inset-top, 0px) + ${topOffset}px)` }}
      aria-hidden={!visible}
    >
      <CartButton />
    </div>
  );
}
