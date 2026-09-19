import { useEffect } from "react";
import "./library.css";
import { books } from "./data/books";

export function BookDetailPage({ id }: { id: string }) {
  const book = books.find((item) => item.id === id);
  useEffect(() => {
    const previous = document.title;
    document.title = book ? `${book.title} — Kitaplığım` : "Kitap bulunamadı — Kitaplığım";
    return () => { document.title = previous; };
  }, [book]);
  if (!book) {
    return <main className="book-detail-page"><a href="/kitapligim">← kitaplığa dön</a><h1>Bu kitap henüz rafta değil.</h1></main>;
  }

  return (
    <main className="book-detail-page">
      <header><a href="/kitapligim">← kitaplığa dön</a><span>{book.year}</span></header>
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
