import { useRef } from "react";
import type { CSSProperties, PointerEvent } from "react";
import type { Book, BookPose } from "../types";
import { getBookSize } from "../lib/layout";

type Props = {
  book: Book;
  pose: BookPose;
  viewportWidth: number;
  active: boolean;
  flipped: boolean;
  dimmed: boolean;
  onLift: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onToggleFlip: (id: string) => void;
};

export function BookObject({ book, pose, viewportWidth, active, flipped, dimmed, onLift, onMove, onToggleFlip }: Props) {
  const pointer = useRef<{ id: number; startX: number; startY: number; poseX: number; poseY: number; moved: boolean } | null>(null);
  const size = getBookSize(book, viewportWidth);
  const style = {
    "--book-x": `${pose.x}px`,
    "--book-y": `${pose.y}px`,
    "--book-rotate": `${pose.rotate}deg`,
    "--book-rx": `${pose.rotateX}deg`,
    "--book-ry": `${pose.rotateY}deg`,
    "--book-scale": pose.scale,
    "--book-width": `${size.width}px`,
    "--book-height": `${size.height}px`,
    zIndex: pose.layer,
  } as CSSProperties;

  const startDrag = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointer.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, poseX: pose.x, poseY: pose.y, moved: false };
    onLift(book.id);
  };

  const drag = (event: PointerEvent<HTMLButtonElement>) => {
    const current = pointer.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.startX;
    const dy = event.clientY - current.startY;
    if (Math.hypot(dx, dy) > 5) current.moved = true;
    if (current.moved) onMove(book.id, current.poseX + dx, current.poseY + dy);
  };

  const finishDrag = (event: PointerEvent<HTMLButtonElement>) => {
    const current = pointer.current;
    if (!current || current.id !== event.pointerId) return;
    if (!current.moved) onToggleFlip(book.id);
    pointer.current = null;
  };

  return (
    <article
      className={`book-object${active ? " is-active" : ""}${flipped ? " is-flipped" : ""}${dimmed ? " is-dimmed" : ""}`}
      style={style}
    >
      <button
        className="book-card"
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={finishDrag}
        onPointerCancel={() => { pointer.current = null; }}
        onDoubleClick={() => { window.location.href = `/book/${book.id}`; }}
        aria-label={`${book.title}, ${book.author}${flipped ? ", arka kapak açık" : ""}`}
        type="button"
      >
        <span className="book-object-inner">
          <span className="book-front">
            <img src={book.cover} alt={`${book.title} — ${book.author} kapak görseli`} draggable="false" loading="lazy" />
          </span>
          <span className="book-back">
            <small>KİTAP NOTU</small>
            <strong>{book.title}</strong>
            <em>{book.author}</em>
            <p>{book.shortOpinion}</p>
          </span>
        </span>
      </button>
      <a className="book-open-link" href={`/book/${book.id}`} aria-label={`${book.title} ayrıntılarını aç`}>ayrıntılar →</a>
    </article>
  );
}
