import { useEffect } from "react";
import "./library.css";
import { libraryConfig } from "./siteConfig";
import { BookPile } from "./components/BookPile";
import { SiteHeader } from "../components/SiteHeader";

export function LibraryPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Kitaplığım — Büşra Ocak";
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="library-page">
      <SiteHeader active="library" />
      <p className="library-intro">{libraryConfig.introText}</p>
      <BookPile />
    </main>
  );
}
