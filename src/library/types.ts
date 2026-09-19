export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  width?: number;
  height?: number;
  tags?: string[];
  description?: string;
  shortOpinion?: string;
  year?: number;
  rating?: number;
  featured?: boolean;
};

export type BookPose = {
  x: number;
  y: number;
  rotate: number;
  rotateX: number;
  rotateY: number;
  scale: number;
  layer: number;
};

export type LibraryMode = "pile" | "tidy" | "scatter" | "vortex";
