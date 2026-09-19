import { useEffect } from "react";
import "./library.css";
import { libraryConfig } from "./siteConfig";
import { LibraryHeader } from "./components/LibraryHeader";
import { BookPile } from "./components/BookPile";

export function LibraryPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Kitaplığım — Büşra Ocak";
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="library-page">
      <LibraryHeader />
      <p className="library-intro">{libraryConfig.introText}</p>
      <BookPile />
    </main>
  );
}
