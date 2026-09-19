export type SpotifyTrack = {
  artist: string;
  title: string;
  time: string;
  url: string;
};

const embedShareIds: Record<string, string> = {
  "Don't You Know": "68cebb8600204fe2",
  "The Times We Had": "482d5cc2f48f473f",
  "Quadris De Ouro": "8ec9f9a8a5d24275",
  "Last Train to London": "84ebcb86d0c94a4c",
};

const getSpotifyTrackId = (url: string) => url.match(/track\/([^?]+)/)?.[1] ?? null;

export function SpotifyTrackEmbed({ track }: { track: SpotifyTrack }) {
  const trackId = getSpotifyTrackId(track.url);
  const shareId = embedShareIds[track.title] ?? null;

  if (!trackId) return null;

  return (
    <iframe
      data-testid={`spotify-embed-${trackId}`}
      className="spotify-track-embed"
      style={{ borderRadius: "12px" }}
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0${shareId ? `&si=${shareId}` : ""}`}
      width="100%"
      height="152"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="eager"
      title={`${track.artist} - ${track.title} Spotify oynatıcı`}
    />
  );
}
