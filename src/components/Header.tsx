import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../constants";
import { GlowButton, Logo } from "./ui";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-shell">
        <Logo />

        <nav className="header-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <GlowButton href="#access" className="header-cta min-h-12 px-6 text-sm">
            <span className="hidden sm:inline">Получить доступ</span>
            <span className="sm:hidden">Доступ</span>
          </GlowButton>
          <button
            className="menu-button"
            type="button"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <GlowButton href="#access" className="mt-2 w-full">
            Получить доступ
          </GlowButton>
        </div>
      ) : null}
    </header>
  );
}
