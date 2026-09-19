import type { LibraryMode } from "../types";

type Props = {
  count: number;
  mode: LibraryMode;
  filterOpen: boolean;
  onShake: () => void;
  onFilter: () => void;
  onTidy: () => void;
  onScatter: () => void;
  onVortex: () => void;
  onShare: () => void;
};

export function LibraryControls({ count, mode, filterOpen, onShake, onFilter, onTidy, onScatter, onVortex, onShare }: Props) {
  const controls = [
    ["∿", "Salla", onShake, false],
    ["○", "Filtrele", onFilter, filterOpen],
    ["▦", "Düzenle", onTidy, mode === "tidy"],
    ["✣", "Dağıt", onScatter, mode === "scatter"],
    ["◉", "Vorteks", onVortex, mode === "vortex"],
    ["▣", "Paylaş", onShare, false],
  ] as const;

  return (
    <div className="library-controls" aria-label="Kitaplık kontrolleri">
      <span className="library-count"><strong>{count}</strong> kitap</span>
      {controls.map(([icon, label, action, selected]) => (
        <button className={selected ? "is-selected" : ""} type="button" key={label} aria-label={label} onClick={action}>
          <span aria-hidden="true">{icon}</span><em>{label}</em>
        </button>
      ))}
      <a href="#collection">göz at →</a>
    </div>
  );
}
