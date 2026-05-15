import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../constants";
import { GlowButton, Logo } from "./ui";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const openAccessModal = () => {
    setIsOpen(false);
    window.dispatchEvent(new Event("migtorg:open-access-modal"));
  };

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
          <GlowButton type="button" className="header-cta min-h-12 px-6 text-sm" onClick={openAccessModal}>
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
          <GlowButton type="button" className="mt-2 w-full" onClick={openAccessModal}>
            Получить доступ
          </GlowButton>
        </div>
      ) : null}
    </header>
  );
}
