import type { MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const reveal = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export function Reveal({
  children,
  delay = 0,
  className = ""
}: PropsWithChildren<{ delay?: number; className?: string }>) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.28, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionEyebrow({ children, pill = false }: PropsWithChildren<{ pill?: boolean }>) {
  if (pill) {
    return (
      <div className="section-eyebrow section-eyebrow-pill">
        <span />
        {children}
      </div>
    );
  }

  return (
    <p className="section-eyebrow">
      <span /> {children}
    </p>
  );
}

type GlowButtonProps = PropsWithChildren<{
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

export function GlowButton({
  href,
  variant = "primary",
  className = "",
  children,
  ...buttonProps
}: GlowButtonProps) {
  const classes = [
    "button",
    variant === "primary" ? "button-primary" : "",
    variant === "secondary" ? "button-secondary" : "",
    variant === "outline" ? "button-outline" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
  as = "div"
}: PropsWithChildren<{ className?: string; as?: "article" | "div" }>) {
  const Tag = as;

  return (
    <Tag className={`card ${className}`}>
      {children}
    </Tag>
  );
}

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <a href="#top" aria-label="MIG TORG PRO" className={`logo ${small ? "logo-small" : ""}`}>
      <span className="logo-mig">MIG</span>
      <span className="logo-torg">TORG<span className="logo-dot">•</span></span>
      <span className="logo-pro">PRO</span>
    </a>
  );
}

export function MetricCard({
  Icon,
  label,
  value,
  caption,
  tone = "green",
  className = ""
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  caption?: string;
  tone?: "green" | "red";
  className?: string;
}) {
  return (
    <div className={`metric-card ${tone === "green" ? "metric-green" : "metric-red"} ${className}`}>
      <div className="flex items-start gap-4">
        <Icon className="mt-1 h-7 w-7 shrink-0" />
        <div>
          <p>{label}</p>
          <strong>{value}</strong>
          {caption ? <span>{caption}</span> : null}
        </div>
      </div>
    </div>
  );
}

export function MiniGraph() {
  return (
    <svg className="mini-graph" viewBox="0 0 108 42" aria-hidden="true">
      <path
        d="M3 34 C 12 31, 16 22, 25 25 S 37 30, 45 20 S 57 26, 65 17 S 77 18, 86 8 S 95 13, 105 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconBox({
  Icon,
  tone = "red",
  children
}: {
  Icon?: LucideIcon;
  tone?: "red" | "green";
  children?: ReactNode;
}) {
  return (
    <span className={`icon-box ${tone === "green" ? "icon-green" : "icon-red"}`}>
      {Icon ? <Icon className="h-7 w-7" /> : children}
    </span>
  );
}
