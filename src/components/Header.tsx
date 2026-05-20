import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../auth";
import { navItems } from "../constants";
import { GlowButton, Logo } from "./ui";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const landingHref = (href: string) => {
    if (!href.startsWith("#")) {
      return href;
    }

    return location.pathname === "/" ? href : `/${href}`;
  };

  const goToAccess = () => {
    setIsOpen(false);
    navigate(user ? "/learn" : "/auth/register");
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="header-shell">
        <Logo />

        <nav className="header-nav">
          {navItems.map((item) => (
            <a key={item.href} href={landingHref(item.href)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          {user ? (
            <Link className="header-login-link" to="/learn">
              Кабинет
            </Link>
          ) : (
            <Link className="header-login-link" to="/auth/login">
              Войти
            </Link>
          )}
          <GlowButton type="button" className="header-cta min-h-12 px-6 text-sm" onClick={goToAccess}>
            <span className="hidden sm:inline">{user ? "Продолжить" : "Регистрация"}</span>
            <span className="sm:hidden">{user ? "Кабинет" : "Доступ"}</span>
          </GlowButton>
          {user ? (
            <button type="button" className="header-logout" onClick={handleLogout}>
              Выйти
            </button>
          ) : null}
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
              href={landingHref(item.href)}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {user ? (
            <Link to="/learn" onClick={() => setIsOpen(false)}>
              Личный кабинет
            </Link>
          ) : (
            <Link to="/auth/login" onClick={() => setIsOpen(false)}>
              Войти
            </Link>
          )}
          <GlowButton type="button" className="mt-2 w-full" onClick={goToAccess}>
            {user ? "Продолжить обучение" : "Зарегистрироваться"}
          </GlowButton>
        </div>
      ) : null}
    </header>
  );
}
