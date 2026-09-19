import type { Book, BookPose } from "../types";
import { getBookSize } from "./layout";

function seededNumber(key: string, offset = 0) {
  let value = 0;
  for (let index = 0; index < key.length; index += 1) value = Math.imul(31, value) + key.charCodeAt(index);
  const x = Math.sin(value + offset * 997) * 10000;
  return x - Math.floor(x);
}

export function createTidyLayout(books: Book[], width: number, height: number): Record<string, BookPose> {
  const mobile = width < 680;
  const columns = mobile ? 3 : Math.min(10, Math.ceil(Math.sqrt(books.length * (width / height))));
  const rows = Math.ceil(books.length / columns);
  const gap = mobile ? -10 : 8;
  const maxWidth = getBookSize(books[0], width).width;
  const startX = Math.max(10, (width - (columns * (maxWidth + gap) - gap)) / 2);
  const usableHeight = Math.max(height - (mobile ? 115 : 150), 540);
  const stepY = Math.min(mobile ? 126 : 196, usableHeight / Math.max(rows, 1));

  return Object.fromEntries(books.map((book, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    return [book.id, {
      x: startX + column * (maxWidth + gap),
      y: (mobile ? 80 : 90) + row * stepY,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: mobile ? 0.84 : 0.9,
      layer: index + 1,
    }];
  }));
}

export function createScatterLayout(books: Book[], width: number, height: number, seed: number): Record<string, BookPose> {
  const mobile = width < 680;
  return Object.fromEntries(books.map((book, index) => {
    const size = getBookSize(book, width);
    const a = seededNumber(`${book.id}-${seed}`, 1);
    const b = seededNumber(`${book.id}-${seed}`, 2);
    const c = seededNumber(`${book.id}-${seed}`, 3);
    return [book.id, {
      x: -size.width * 0.25 + a * (width - size.width * 0.5),
      y: (mobile ? 78 : 72) + b * Math.max(height - size.height - (mobile ? 78 : 58), 440),
      rotate: (c - 0.5) * (mobile ? 34 : 42),
      rotateX: (a - 0.5) * 4,
      rotateY: (b - 0.5) * 5,
      scale: 0.87 + c * 0.2,
      layer: index + 1,
    }];
  }));
}

export function createVortexFrame(books: Book[], width: number, height: number, progress: number): Record<string, BookPose> {
  const mobile = width < 680;
  const centerX = width / 2;
  const centerY = height / 2 + (mobile ? 30 : 12);
  const maxRadius = Math.min(width * (mobile ? .48 : .55), height * .43);
  const eased = 1 - Math.pow(1 - Math.min(progress, 1), 3);

  return Object.fromEntries(books.map((book, index) => {
    const size = getBookSize(book, width);
    const lane = index / Math.max(books.length - 1, 1);
    const radius = (45 + lane * maxRadius) * (0.6 + 0.4 * eased);
    const angle = index * 1.08 + eased * Math.PI * (3.5 + lane * 2);
    return [book.id, {
      x: centerX + Math.cos(angle) * radius - size.width / 2,
      y: centerY + Math.sin(angle) * radius * .66 - size.height / 2,
      rotate: angle * 180 / Math.PI + 90,
      rotateX: Math.sin(angle) * 5,
      rotateY: Math.cos(angle) * 7,
      scale: .72 + (1 - lane) * .28,
      layer: index + 1,
    }];
  }));
}
