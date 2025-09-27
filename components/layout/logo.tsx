import Link from "next/link";
import { m } from "framer-motion";

export const Logo = () => (
  <m.div
    className="flex items-center gap-3"
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
  >
    <Link
      href="#top"
      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-accent/50"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),rgba(16,185,129,0.15))]" />
      <span className="relative text-lg font-bold tracking-tight text-white group-hover:text-accent">
        AM
      </span>
    </Link>
    <div className="hidden flex-col leading-tight text-sm text-white/80 md:flex">
      <span className="text-[0.65rem] uppercase tracking-[0.45em] text-[rgba(226,232,240,0.6)]">
        Arman Maurya
      </span>
      <span className="text-xs text-[rgba(226,232,240,0.8)]">
        Creative Frontend Engineer
      </span>
    </div>
  </m.div>
);
