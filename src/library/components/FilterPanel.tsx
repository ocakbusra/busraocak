import { books } from "../data/books";

type Props = {
  open: boolean;
  selected: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
};

export function FilterPanel({ open, selected, onToggle, onClear }: Props) {
  const tags = [...new Set(books.flatMap((book) => book.tags ?? []))]
    .map((tag) => ({ tag, count: books.filter((book) => book.tags?.includes(tag)).length }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "tr"));

  return (
    <section className={`filter-panel${open ? " is-open" : ""}`} aria-label="Kitap etiketleri" aria-hidden={!open}>
      {tags.map(({ tag, count }) => (
        <button className={selected.includes(tag) ? "is-selected" : ""} key={tag} type="button" onClick={() => onToggle(tag)}>
          {tag} <span>({count})</span>
        </button>
      ))}
      <button className="filter-clear" type="button" onClick={onClear}>temizle</button>
    </section>
  );
}
