import { useEffect } from "react";
import "./library.css";
import { books } from "./data/books";
import { SiteHeader } from "../components/SiteHeader";

export function BookDetailPage({ id }: { id: string }) {
  const book = books.find((item) => item.id === id);
  useEffect(() => {
    const previous = document.title;
    document.title = book ? `${book.title} — Kitaplığım` : "Kitap bulunamadı — Kitaplığım";
    return () => { document.title = previous; };
  }, [book]);
  if (!book) {
    return <main className="book-detail-page"><SiteHeader active="library" /><h1>Bu kitap henüz rafta değil.</h1><a href="/kitapligim">← kitaplığa dön</a></main>;
  }

  return (
    <main className="book-detail-page">
      <SiteHeader active="library" />
      <div className="book-detail-topline"><a href="/kitapligim">← kitaplığa dön</a><span>{book.year}</span></div>
      <div className="book-detail-layout">
        <figure><img src={book.cover} alt={`${book.title} kapağı`} /></figure>
        <article>
          <p>{book.tags?.join(" · ")}</p>
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <blockquote>{book.shortOpinion}</blockquote>
          {book.description && <p>{book.description}</p>}
          <div className="book-detail-rating" aria-label={`${book.rating ?? 0} üzerinden 5 puan`}>{"●".repeat(book.rating ?? 0)}{"○".repeat(5 - (book.rating ?? 0))}</div>
        </article>
      </div>
    </main>
  );
}
