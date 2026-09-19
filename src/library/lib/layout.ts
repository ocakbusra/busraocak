import type { Book, BookPose } from "../types";

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return () => {
    result += 0x6d2b79f5;
    let next = result;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function getBookSize(book: Book, viewportWidth: number) {
  const ratio = (book.height ?? 1000) / (book.width ?? 700);
  const mobile = viewportWidth < 680;
  const width = mobile ? 126 : 170;
  return { width, height: Math.min(width * ratio, mobile ? 190 : 224) };
}

export function createPileLayout(books: Book[], width: number, height: number, seed = 1): Record<string, BookPose> {
  const mobile = width < 680;
  const columns = mobile ? 3 : Math.max(6, Math.ceil(Math.sqrt(books.length * (width / Math.max(height, 1)))));
  const rows = Math.ceil(books.length / columns);
  const usableHeight = Math.max(height - (mobile ? 112 : 126), 520);
  const stepX = (width + (mobile ? 40 : 70)) / columns;
  const stepY = usableHeight / Math.max(rows, 1);

  return Object.fromEntries(books.map((book, index) => {
    const random = hash(`${book.id}-${seed}`);
    const size = getBookSize(book, width);
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = column * stepX - size.width * 0.24 + (random() - 0.5) * stepX * 0.82;
    const y = (mobile ? 68 : 76) + row * stepY - size.height * 0.12 + (random() - 0.5) * stepY * 0.8;
    return [book.id, {
      x,
      y,
      rotate: (random() - 0.5) * (mobile ? 23 : 31),
      rotateX: (random() - 0.5) * 3.2,
      rotateY: (random() - 0.5) * 4,
      scale: 0.9 + random() * 0.18,
      layer: index + 1,
    }];
  }));
}
