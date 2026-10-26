import { useState, useEffect, Fragment } from "react";
import { COLORS, TRACKS, VIDEOS, ARTISTS, SERVICES, EVENTS, NAV } from "./data.js";
import LOGO from "./assets/logo.jpg";
import FULL from "./assets/full.jpg";

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Embed = ({ id }) => (
  <iframe
    src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
    title="Video player"
    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
    allowFullScreen
  />
);

function Nav() {
  const [s, setS] = useState(false);
  const [o, setO] = useState(false);
  useEffect(() => {
    const f = () => setS(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <nav className={s ? "s" : ""}>
      <div className="wrap nv">
        <a href="#top" aria-label="Revolution Records home">
          <img className="logo" src={LOGO} alt="Revolution Records logo" />
        </a>
        <div className={"links" + (o ? " open" : "")} onClick={() => setO(false)}>
          {NAV.map((n) => <a key={n} href={"#" + n.toLowerCase()}>{n}</a>)}
        </div>
        <button className="burger" aria-label="Menu" onClick={() => setO(!o)}>{o ? "✕" : "☰"}</button>
      </div>
    </nav>
  );
}

function Hero() {
  const words = "Sound is a revolution.".split(" ");
  const g = ["Afrobeats", "R&B", "Hip-Hop", "Soul", "Electronic", "Alt-Pop", "Gospel", "Rock"];
  const strip = [...g, ...g, ...g, ...g].map((x, i) => <span key={i}>{x}<i>✦</i></span>);
  return (
    <header className="hero" id="top">
      <div className="glow" />
      <img className="logo mark" src={LOGO} alt="Revolution Records lion emblem" />
      <h1>
        {words.map((w, i) => (
          <span key={i} className={i === 3 ? "gold" : ""} style={{ animationDelay: 0.5 + i * 0.15 + "s", marginRight: "0.25em" }}>{w}</span>
        ))}
      </h1>
      <p>Revolution Records is an independent label home to artists who refuse to sound like anyone else.</p>
      <div className="cta">
        <a className="btn fill" href="#music">Listen now</a>
        <a className="btn" href="#videos">Watch videos</a>
      </div>
      <div className="marq" aria-hidden="true"><div>{strip}{strip}</div></div>
    </header>
  );
}

function Music() {
  const [cur, setCur] = useState(0);
  const [play, setPlay] = useState(false);
  const t = TRACKS[cur];
  return (
    <section id="music">
      <div className="wrap">
        <div className="head rv">
          <h2>Latest <span className="gold">music</span></h2>
          <p>Press play. Every track streams right here on the site.</p>
        </div>
        <div className="pl rv">
          <div className="screen">
            {play ? <Embed key={t.id} id={t.id} /> : (
              <button className="facade" onClick={() => setPlay(true)} aria-label={"Play " + t.t}>
                <span className="play">▶</span><small>{t.a}</small><h3>{t.t}</h3>
              </button>
            )}
          </div>
          <div className="list">
            {TRACKS.map((x, i) => (
              <button key={i} className={"row" + (i === cur ? " on" : "")} onClick={() => { setCur(i); setPlay(true); }}>
                <span className="cov" style={{ background: COLORS[i] }}>{x.t[0]}</span>
                <span><b>{x.t}</b><small>{x.a}</small></span>
                {i === cur && play ? <span className="eq"><i /><i /><i /></span> : <em>{x.d}</em>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Videos() {
  const [v, setV] = useState(null);
  useEffect(() => {
    if (!v) return;
    const f = (e) => e.key === "Escape" && setV(null);
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [v]);
  return (
    <section id="videos" style={{ background: "linear-gradient(#000,#0c0905,#000)" }}>
      <div className="wrap">
        <div className="head rv">
          <h2>Music <span className="gold">videos</span></h2>
          <p>Official videos, live sessions and behind-the-scenes from the roster.</p>
        </div>
        <div className="vg">
          {VIDEOS.map((x, i) => (
            <button key={i} className="vc rv" style={{ transitionDelay: (i % 3) * 0.1 + "s" }} onClick={() => setV(x)}>
              <div className="vt" style={{ background: `linear-gradient(${120 + i * 25}deg,${COLORS[i]},#1a1208 80%)` }}>
                <span className="play">▶</span>
              </div>
              <div className="m"><h3>{x.t}</h3><small>{x.a} · {x.v}</small></div>
            </button>
          ))}
        </div>
      </div>
      {v && (
        <div className="modal" onClick={() => setV(null)}>
          <div className="mb" onClick={(e) => e.stopPropagation()}>
            <button className="x" onClick={() => setV(null)}>Close</button>
            <div className="screen"><Embed id={v.id} /></div>
          </div>
        </div>
      )}
    </section>
  );
}

function Artists() {
  return (
    <section id="artists">
      <div className="wrap">
        <div className="head rv">
          <h2>The <span className="gold">roster</span></h2>
          <p>Four voices, one standard. More signings announced soon.</p>
        </div>
        <div className="ag">
          {ARTISTS.map((a, i) => (
            <div key={i} className="ac rv" style={{ transitionDelay: i * 0.1 + "s", background: `linear-gradient(160deg,${COLORS[i]}55,#000 70%)` }}>
              <div className="big" style={{ color: COLORS[i] }}>{a.i}</div>
              <small>{a.g}</small><h3>{a.n}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ background: "#070502" }}>
      <div className="wrap ab">
        <div className="rv">
          <h2>Built by artists,<br />for <span className="gold">artists.</span></h2>
          <p style={{ marginTop: 24 }}>Revolution Records was started to give musicians what the big machine rarely does: ownership, honest deals and a team that believes in the work. We sign artists with a point of view and back them from the first demo to the world stage.</p>
          <div className="stats">
            <div><b>50+</b><span>Releases</span></div>
            <div><b>12M</b><span>Streams</span></div>
            <div><b>4</b><span>Signed artists</span></div>
          </div>
        </div>
        <div className="rv" style={{ textAlign: "center" }}>
          <img className="logo" src={FULL} alt="Revolution Records" style={{ width: "min(420px,90%)", margin: "auto" }} />
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="head rv">
          <h2>What we <span className="gold">do</span></h2>
          <p>Everything an artist needs under one roof.</p>
        </div>
        <div className="sg">
          {SERVICES.map((s, i) => (
            <div key={i} className="sv rv" style={{ transitionDelay: (i % 3) * 0.1 + "s" }}><h3>{s[0]}</h3><p>{s[1]}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head rv"><h2>Upcoming <span className="gold">events</span></h2></div>
        <div className="rv">
          {EVENTS.map((e, i) => (
            <div key={i} className="ev"><span className="d">{e[0]}</span><b>{e[1]}</b><small>{e[2]}</small></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{ background: "#070502" }}>
      <div className="wrap ct">
        <div className="rv">
          <h2>Join the <span className="gold">revolution</span></h2>
          <p style={{ color: "var(--mute)", marginTop: 20 }}>Send us your demo, book an artist or talk partnerships. We read everything.</p>
          <p style={{ color: "var(--mute)" }}>demos@revolutionrecords.com<br />bookings@revolutionrecords.com</p>
        </div>
        <form className="rv" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? <h3 style={{ color: "var(--gold2)" }}>Message received. Thank you!</h3> : (
            <>
              <input required placeholder="Your name" aria-label="Name" />
              <input required type="email" placeholder="Email" aria-label="Email" />
              <select aria-label="Topic"><option>Demo submission</option><option>Booking</option><option>Press</option><option>Other</option></select>
              <textarea rows="4" placeholder="Link to your music or your message" aria-label="Message" />
              <button className="btn fill" type="submit">Send message</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <img className="logo" src={FULL} alt="Revolution Records" />
        <div className="soc"><a href="#top">Instagram</a><a href="#top">YouTube</a><a href="#top">Spotify</a><a href="#top">TikTok</a></div>
        © {new Date().getFullYear()} Revolution Records. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <Fragment>
      <Nav /><Hero /><Music /><Videos /><Artists /><About /><Services /><Events /><Contact /><Footer />
    </Fragment>
  );
}
