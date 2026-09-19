import { useState } from "react";
import { Menu, X } from "lucide-react";
import headerLogo from "../assets/logo-busra-ocak.png";

type SiteHeaderProps = {
  active?: "music";
};

export function SiteHeader({ active }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const isSubpage = window.location.pathname !== "/";
  const sectionHref = (hash: string) => `${isSubpage ? "/" : ""}${hash}`;

  return (
    <header className="topbar">
      <a className="wordmark" href={isSubpage ? "/#top" : "#top"} onClick={closeMenu} aria-label="Büşra Ocak ana sayfa">
        <img className="header-logo" src={headerLogo} alt="Büşra Ocak" />
      </a>
      <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
        <a href={sectionHref("#about")} onClick={closeMenu}>hakkımda</a>
        <a href={sectionHref("#journal")} onClick={closeMenu}>YAZILARIM</a>
        <a href={sectionHref("#music")} className={active === "music" ? "is-current" : undefined} onClick={closeMenu}>MÜZİK</a>
        <a href={sectionHref("#shelf")} onClick={closeMenu}>KİTAPLIĞIM</a>
        <a href={sectionHref("#contact")} onClick={closeMenu}>İLETİŞİM</a>
      </nav>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}
