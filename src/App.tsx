import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Headphones,
  MoveDown,
  Quote,
} from "lucide-react";
import "./App.css";
import heroBusra from "./assets/hero-busra-new.png";
import signatureBusra from "./assets/signature-busra.png";
import aboutChild from "./assets/about-child.png";
import aboutPortrait from "./assets/about-portrait.jpg";
import mindfulnessBook from "./assets/mindfulness-book.png";
import { SpotifyTrackEmbed } from "./components/SpotifyTrackEmbed";
import { SiteHeader } from "./components/SiteHeader";

const photos = {
  hero: heroBusra,
  portrait: aboutPortrait,
  chair: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=700&q=85",
  book: mindfulnessBook,
  sea: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
  record: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=700&q=85",
};

const posts = [
  {
    number: "01",
    category: "SUBSTACK / KISA YAZI",
    title: "Herkesin Kendini Duymaktan Sağır Olduğu Bir Dünyada Başkasını Dinlemek Hakkında",
    text: "Başkalarını gerçekten dinleyebilmek, önce kendi sesimizi biraz kısmayı gerektiriyor.",
    image: photos.sea,
    url: "https://substack.com/@busraocak/p-205030300?utm_source=profile&utm_medium=reader2",
  },
  {
    number: "02",
    category: "SUBSTACK / KISA YAZI",
    title: "Yapay Zekayı Çocukça Değerlendirmek",
    text: "Yapay zekâya bakarken büyük iddialardan önce basit, çocukça sorular sormak.",
    image: photos.record,
    url: "https://substack.com/@busraocak/p-190194506?utm_source=profile&utm_medium=reader2",
  },
  {
    number: "03",
    category: "SUBSTACK / KISA YAZI",
    title: "Yazmak",
    text: "Düşünceleri bir yerde tutmanın, kendine dönmenin ve kelimelerle biraz daha uzun kalmanın yolları.",
    image: photos.chair,
    url: "https://substack.com/@busraocak/p-193876085?utm_source=profile&utm_medium=reader2",
  },
];

const monthlyTracks = [
  { artist: "Durand Jones & The Indications", title: "Don't You Know", time: "03:20", url: "https://open.spotify.com/track/0jecTSpHjOy5CyqEdfod5c?si=1248e24b9ba0443f" },
  { artist: "Rikas", title: "Last Train to London", time: "02:59", url: "https://open.spotify.com/track/5fewYZz1bCsj72vjSwSxzq?si=98df79669bfa40e6" },
  { artist: "Pale Jay", title: "Quadris De Ouro", time: "03:30", url: "https://open.spotify.com/track/3BB5k0EArimPyCD1VYcFzR?si=df06742e4ee84843" },
  { artist: "Medité", title: "The Times We Had", time: "01:49", url: "https://open.spotify.com/track/4zF8dpzhpxF3g3v780QEUf?si=3728ab1c60dc4eea" },
];

const hermanosTracks = [
  { artist: "Hermanos Gutiérrez", title: "L.a. Venganza", time: "02:51", url: "https://open.spotify.com/track/1B8HAaWutPZTrJOhcztZms?si=7f546f92017b4a18" },
  { artist: "Hermanos Gutiérrez", title: "Los Andes", time: "03:31", url: "https://open.spotify.com/track/3HGlaKMMFsTEaat5TZ9vJF?si=3a82cb4c1ba64c6c" },
];

const starArtists = [
  { number: "01", name: "Hermanos Gutiérrez", note: "yolun, gün batımının ve uzak bir şehrin müziği" },
  { number: "02", name: "Big Thief", note: "çıplak, dürüst ve biraz dağınık" },
  { number: "03", name: "Radiohead", note: "zihnin içinden geçen elektrik" },
  { number: "04", name: "Nick Drake", note: "sessizliğin içindeki en iyi eşlik" },
];

const archiveMonths = [
  {
    month: "Ağustos 2026",
    note: "geceye karışan şarkılar",
    tracks: [
      { artist: "Hermanos Gutiérrez", title: "Mesa Redonda", time: "02:55", url: "https://open.spotify.com/track/4MyceticLjPfqzkjzgFSgq?si=8d029d8a8bef43c1" },
      { artist: "Big Thief", title: "Change", time: "04:44", url: "https://open.spotify.com/track/3HFBqhotJeEKHJzMEW31jZ" },
      { artist: "Radiohead", title: "Weird Fishes / Arpeggi", time: "05:18", url: "https://open.spotify.com/track/0hOxNpxQZywAGQ0yaPfpod" },
    ],
  },
  {
    month: "Temmuz 2026",
    note: "yavaşlayan günlere eşlik edenler",
    tracks: [
      { artist: "Nick Drake", title: "Pink Moon", time: "02:04", url: "https://open.spotify.com/track/16qzGrIMWoxerw2gnW0zuv" },
      { artist: "FKA twigs", title: "Cellophane", time: "03:24", url: "https://open.spotify.com/track/3VwZqgfrM3xb1usuLprkTu" },
    ],
  },
];

function MusicPage() {
  const [needleOn, setNeedleOn] = useState(false);

  const placeNeedle = () => setNeedleOn(true);

  return (
    <main className="music-page-shell">
      <SiteHeader active="music" />

      <section className="music-page-hero">
        <div className="music-page-heading">
          <p className="hero-kicker"><span className="red-dot" /> KİŞİSEL ARŞİV / MÜZİK</p>
          <h1>müzik<br /><i>odası.</i></h1>
          <p>Dinlediğim, dönüp dolaşıp bulduğum ve bazı günleri hatırlatan şarkıların küçük arşivi.</p>
        </div>
        <button className={needleOn ? "vinyl-player is-playing" : "vinyl-player"} onClick={placeNeedle} aria-label="Eylül seçkisini sayfa içinde dinle">
          <span className="vinyl-disc"><span className="vinyl-label">B.O.</span></span>
          <span className="vinyl-needle"><span className="needle-arm" /><span className="needle-head" /></span>
          <span className="vinyl-caption">iğneyi tak / eylül seçkisini aç</span>
        </button>
      </section>
      <section className="music-page-section music-stars">
        <div className="music-page-section-top"><span className="section-label"><span className="red-line" /> 01 / YILDIZLAR</span><span className="section-meta">sınırlı sayıda / her zaman</span></div>
        <div className="music-section-title-row">
          <h2>dinlemeyi en<br /><i>sevdiklerim.</i></h2>
          <p>Hayatımın farklı dönemlerine eşlik eden, her dönüşte başka bir yerini duyduğum sanatçılar.</p>
        </div>
        <div className="artist-grid">
          {starArtists.map((artist) => (
            <article className="artist-card" key={artist.number}>
              <span>{artist.number}</span>
              <h3>{artist.name}</h3>
              <p>{artist.note}</p>
              <i>★</i>
            </article>
          ))}
        </div>
      </section>

      <section className="music-page-section music-monthly" id="music-monthly">
        <div className="music-page-section-top"><span className="section-label"><span className="red-line" /> 02 / BU AYIN YILDIZLARI</span><span className="section-meta">eylül 2026</span></div>
        <div className="music-monthly-layout">
          <div>
            <h2>bu ay<br /><i>neleri dinliyordum?</i></h2>
            <p>Ayın içinden seçip sakladığım dört parça. İğneyi yerleştirdiğinde ilk şarkı başlar; gerisini listeden seçebilirsin.</p>
          </div>
          <div className="spotify-track-list music-page-track-list">
            {monthlyTracks.map((track, index) => (
              <article className="spotify-track-card" key={track.title}>
                <div className="spotify-track-card-meta"><span>0{index + 1}</span><strong>{track.title}</strong><small>{track.artist} / {track.time}</small></div>
                <SpotifyTrackEmbed track={track} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="music-page-section music-archive">
        <div className="music-page-section-top"><span className="section-label"><span className="red-line" /> 03 / ARŞİV</span><span className="section-meta">geçmiş aylar</span></div>
        <div className="archive-heading"><h2>geçmişte<br /><i>ne vardı?</i></h2><p>Her ay değişen ama hiçbir zaman tamamen kaybolmayan küçük listeler.</p></div>
        <div className="archive-list">
          {archiveMonths.map((archive) => (
            <article className="archive-month" key={archive.month}>
              <div className="archive-month-heading"><h3>{archive.month}</h3><p>{archive.note}</p></div>
              <div className="archive-tracks">
                {archive.tracks.map((track, index) => (
                  <article className="archive-embed-track" key={track.title}>
                    <div className="archive-track-meta"><span>{String(index + 1).padStart(2, "0")}</span><strong>{track.title}</strong><em>{track.artist}</em><small>{track.time}</small></div>
                    <SpotifyTrackEmbed track={track} />
                  </article>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="music-page-footer"><a href="#top">ana sayfaya dön <ArrowUpRight size={15} /></a><span>müzik, yolun diğer adı.</span></footer>
    </main>
  );
}

function SoundtrackFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) {
        if (!video.src) {
          video.src = "/videos/vinyl.mp4";
          video.load();
        }
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { rootMargin: "180px" });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="soundtrack-video-bg" aria-hidden="true">
      <video ref={videoRef} muted loop playsInline preload="none" />
    </div>
  );
}

function App() {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (currentHash && currentHash !== "#music") {
      requestAnimationFrame(() => document.getElementById(currentHash.slice(1))?.scrollIntoView());
    }
  }, [currentHash]);

  if (currentHash === "#music" || currentHash.startsWith("#music-")) return <MusicPage />;

  return (
    <main className="site-shell">
      <SiteHeader />

      <div id="top" className="hero-section">
        <div className="hero-kicker"><span className="red-dot" /> kişisel arşiv / no. 001</div>
        <div className="hero-editorial">
          <div className="hero-portrait">
            <img src={photos.hero} alt="Siyah beyaz yol manzarası" />
            <span className="image-caption">bir yerlerde<br />burayla başka bir yer arasında — 2026</span>
          </div>
          <div className="hero-editorial-copy">
            <p className="hero-mini-label">Merhaba,</p>
            <h1>ben<br /><em>Büşra</em></h1>
            <p className="hero-lead">Kaybolup gitmesini istemediklerime burada küçük bir yer açıyorum.</p>
            <p className="hero-body">Altı çizilmiş cümleler, tekrar tekrar dinlenen şarkılar ve günün içinden akılda kalan küçük anlar. Hepsi burada, biraz daha uzun kalsın diye.</p>
            <img className="hero-signature-image" src={signatureBusra} alt="Büşra Ocak imzası" />
          </div>
        </div>
        <div className="hero-side-note"><span>keşfetmek için kaydır</span><MoveDown size={16} /></div>
      </div>

      <section className="manifesto section-line" id="about">
        <div className="section-heading-row">
          <div className="section-label"><span className="red-line" /> 02 / HAKKIMDA</div>
          <span className="section-meta">birkaç satır kendimden / 2026</span>
        </div>
        <div className="about-intro">
          <div className="about-title">
            <span className="about-number">01</span>
            <h2>Bazı şeyler<br /><i>pek de<br />değişmedi.</i></h2>
          </div>
          <div className="about-copy">
            <p>1998’in sonbaharında doğdum. Meraklıydım. Başıma buyruk. Biraz korkusuz. Yıllar geçti. Ben biraz değiştim. Bunlar pek değil.</p>
            <p>Hayatı okuyarak, yazarak ve dinleyerek anlamlandırmaya çalışıyorum. Öğrenmekten, bir şeyler üretmekten ve öğrendiklerimi başkalarıyla paylaşmaktan hiç sıkılmıyorum.</p>
            <a href="#journal" className="text-link">daha fazlası <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="about-gallery">
          <div className="about-gallery-main"><img src={photos.portrait} alt="Siyah beyaz portre" /><span>25.</span></div>
          <div className="about-gallery-middle"><span className="vertical-text">Dünden / Bugüne</span><span className="about-gallery-mark">/ 02</span></div>
          <div className="about-gallery-small"><img src={aboutChild} alt="Çocukluk fotoğrafı" /><span>7.</span></div>
        </div>
      </section>

      <section className="journal section-line" id="journal">
        <div className="section-heading-row">
          <div className="section-label"><span className="red-line" /> 03 / SON NOTLAR</div>
          <span className="section-meta">kısa yazılar / 2026</span>
        </div>
        <div className="journal-heading">
          <h2>son<br /><i>notlar</i></h2>
          <p>Üzerinde düşündüğüm şeyler, öğrendiklerim ve yazmaya gerekli gördüklerim.</p>
        </div>
        <div className="post-list">
          {posts.map((post) => (
            <article className="post-card" key={post.number}>
              <div className="post-number">{post.number}</div>
              <div className="post-image"><img src={post.image} alt="" /></div>
              <div className="post-content">
                <p className="eyebrow">{post.category}</p>
                <h3>{post.title}</h3>
                <p>{post.text}</p>
                <a href={post.url} className="text-link" target="_blank" rel="noreferrer">yazıyı oku <ArrowUpRight size={15} /></a>
              </div>
            </article>
          ))}
        </div>
        <a href="#contact" className="outline-button">tüm notları gör <ArrowUpRight size={16} /></a>
      </section>

      <section className="soundtrack section-line" id="soundtrack">
        <SoundtrackFilm />
        <div className="section-heading-row">
          <div className="section-label"><span className="red-line" /> 04 / MÜZİK</div>
          <span className="section-meta">
            YOLUN MÜZİĞİ
          </span>
        </div>
        <div className="soundtrack-layout">
          <div className="soundtrack-copy">
            <span className="headphone-icon"><Headphones size={25} /></span>
            <h2>yolun<br /><i>müziği.</i></h2>
            <p>Hayatın kendisi bir yolculuk ve bu yolculuk müziksiz nasıl da katlanılmaz olurdu...</p>
            <p>Yürüdüğüm yolun bir müziği olsaydı bunu kesinlikle Hermanos Gutiérrez yapardı.</p>
          </div>
          <div className="spotify-track-list">
            {hermanosTracks.map((track, index) => (
              <article className="spotify-track-card" key={track.title}>
                <div className="spotify-track-card-meta"><span>0{index + 1}</span><strong>{track.title}</strong><small>{track.artist} / {track.time}</small></div>
                <SpotifyTrackEmbed track={track} />
              </article>
            ))}
            <a className="monthly-note-link" href="#music-monthly">Her mevsimin, her ayın bir müziği oluyor. Bu ayın seçkisini görmek için tıkla. <ArrowUpRight size={14} /></a>
          </div>
        </div>
      </section>

      <section className="shelf section-line" id="shelf">
        <div className="section-label"><span className="red-line" /> 05 / KİTAPLIK</div>
        <div className="shelf-grid">
          <div className="shelf-image"><img src={photos.book} alt="Masada açık bir kitap" /><span>şu an<br />okuyorum</span></div>
          <div className="quote-block">
            <Quote size={32} strokeWidth={1.2} />
            <blockquote>“Der ki korkma...<br />Korkma!<br />Sev, hisset, bırak yaşam elinden tutsun.<br />Bırak yaşam seninle gerçekleşsin.”</blockquote>
            <p>— Danny Penman, J. Mark G. Williams, Mindfulness</p>
          </div>
          <div className="shelf-side"><span className="vertical-text">saklamaya değer cümleler</span><span className="big-book-number">17</span></div>
        </div>
      </section>

      <footer className="footer section-line" id="contact">
        <div className="footer-top"><div className="section-label"><span className="red-line" /> 06 / İLETİŞİM</div><span className="section-meta">HABERLEŞELİM?</span></div>
        <div className="footer-main">
          <h2>merhaba<br /><i>de.</i></h2>
          <div className="footer-contact"><p>Yeni notlar, listeler ve küçük gözlemler — ara sıra gelen kutuna uğrar.</p><a href="mailto:busraocak@proton.me" className="email-link">busraocak@proton.me <ArrowUpRight size={18} /></a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Büşra Ocak</span><span>SEVGİ İLE ÜRETİLDİ</span><a href="#top">başa dön ↑</a><div className="socials"><a href="https://www.instagram.com/busraocakb" target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></svg></a><a href="https://x.com/ocakbusrab" target="_blank" rel="noreferrer" aria-label="X"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-6.5L6.2 22H3.1l7.3-8.4L2.8 2h6.4l4.5 6 5.2-6zm-1.1 18h1.7L8.3 3.9H6.5L17.8 20z" /></svg></a></div></div>
      </footer>
    </main>
  );
}

export default App;
