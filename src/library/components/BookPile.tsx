import { useEffect, useRef, useState } from "react";
import type { BookPose, LibraryMode } from "../types";
import { books } from "../data/books";
import { createPileLayout } from "../lib/layout";
import { createScatterLayout, createTidyLayout, createVortexFrame } from "../lib/animations";
import { BookObject } from "./BookObject";
import { FilterPanel } from "./FilterPanel";
import { LibraryControls } from "./LibraryControls";

export function BookPile() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [size, setSize] = useState({ width: window.innerWidth, height: Math.max(window.innerHeight, 760) });
  const [activeBook, setActiveBook] = useState<string | null>(null);
  const [flippedBook, setFlippedBook] = useState<string | null>(null);
  const [poses, setPoses] = useState<Record<string, BookPose>>(() => createPileLayout(books, size.width, size.height));
  const [mode, setMode] = useState<LibraryMode>("pile");
  const [seed, setSeed] = useState(1);
  const [shaking, setShaking] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const layerRef = useRef(books.length + 10);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const update = () => {
      const next = { width: surface.clientWidth, height: surface.clientHeight };
      setSize(next);
      setPoses((current) => mode === "tidy" ? createTidyLayout(books, next.width, next.height) : current);
    };
    const observer = new ResizeObserver(update);
    observer.observe(surface);
    update();
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); }, []);

  const lift = (id: string) => {
    layerRef.current += 1;
    setActiveBook(id);
    setPoses((current) => ({ ...current, [id]: { ...current[id], layer: layerRef.current } }));
  };

  const move = (id: string, x: number, y: number) => {
    setMode("pile");
    setPoses((current) => ({ ...current, [id]: { ...current[id], x, y } }));
  };

  const shake = () => {
    const nextSeed = seed + 1;
    setShaking(true);
    setSeed(nextSeed);
    window.setTimeout(() => {
      setPoses(createPileLayout(books, size.width, size.height, nextSeed));
      setMode("pile");
    }, 230);
    window.setTimeout(() => setShaking(false), 980);
  };

  const tidy = () => {
    setMode("tidy");
    setPoses(createTidyLayout(books, size.width, size.height));
  };

  const scatter = () => {
    const nextSeed = seed + 1;
    setSeed(nextSeed);
    setMode("scatter");
    setPoses(createScatterLayout(books, size.width, size.height, nextSeed));
  };

  const vortex = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setMode("vortex");
    const start = performance.now();
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 2600;
    const frame = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setPoses(createVortexFrame(books, size.width, size.height, progress));
      if (progress < 1) animationRef.current = requestAnimationFrame(frame);
    };
    animationRef.current = requestAnimationFrame(frame);
  };

  const share = async () => {
    const data = { title: "Büşra'nın Kitaplığı", text: "Büşra Ocak'ın kişisel kitaplığı", url: window.location.href };
    const canShare = typeof navigator.share === "function";
    try {
      if (canShare) await navigator.share(data);
      else await navigator.clipboard.writeText(window.location.href);
      setNotice(canShare ? "paylaşım hazır" : "bağlantı kopyalandı");
      window.setTimeout(() => setNotice(""), 2200);
    } catch { /* Sharing was cancelled. */ }
  };

  const toggleTag = (tag: string) => setSelectedTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);

  return (
    <div className={`book-pile${shaking ? " is-shaking" : ""}`} id="collection" ref={surfaceRef}>
      <FilterPanel open={filterOpen} selected={selectedTags} onToggle={toggleTag} onClear={() => setSelectedTags([])} />
      {books.map((book) => (
        <BookObject
          key={book.id}
          book={book}
          pose={poses[book.id] ?? createPileLayout([book], size.width, size.height)[book.id]}
          viewportWidth={size.width}
          active={activeBook === book.id}
          flipped={flippedBook === book.id}
          dimmed={selectedTags.length > 0 && !selectedTags.some((tag) => book.tags?.includes(tag))}
          onLift={lift}
          onMove={move}
          onToggleFlip={(id) => setFlippedBook((current) => current === id ? null : id)}
        />
      ))}
      <LibraryControls count={books.length} mode={mode} filterOpen={filterOpen} onShake={shake} onFilter={() => setFilterOpen((open) => !open)} onTidy={tidy} onScatter={scatter} onVortex={vortex} onShare={share} />
      <div className={`library-notice${notice ? " is-visible" : ""}`} role="status">{notice}</div>
    </div>
  );
}
