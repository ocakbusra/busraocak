import { libraryConfig } from "../siteConfig";

export function LibraryHeader() {
  return (
    <header className="library-header">
      <a className="library-title" href="/kitapligim" aria-label="Kitaplığım ana görünümü">
        <strong>Kitap<span className="library-mobile-break"><br /></span>lığım</strong>
        <span>{libraryConfig.ownerName} · kişisel kitaplık</span>
      </a>
      <nav aria-label="Kitaplık navigasyonu">
        <a href="/">ana sayfa</a>
        <a href="#collection">koleksiyon</a>
        <a href="/#about">hakkımda</a>
      </nav>
    </header>
  );
}
