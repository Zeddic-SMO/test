import { useEffect, useState } from 'react'
import './App.css'

const notes = [
  {
    n: 'I',
    title: 'One idea, once a week',
    body: 'A single essay every Sunday at sunrise. No feeds, no threads, no catching up.',
  },
  {
    n: 'II',
    title: 'Written slowly',
    body: 'Every letter is drafted by hand over seven days, then edited down to what matters.',
  },
  {
    n: 'III',
    title: 'Read in five minutes',
    body: 'Short enough for a cup of coffee. Long enough to stay with you until Monday.',
  },
]

// Angle of the sundial's shadow: midnight points down, noon points up.
function shadowAngle(date) {
  const minutes = date.getHours() * 60 + date.getMinutes()
  return (minutes / 1440) * 360 + 180
}

function Sundial() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <figure className="sundial" aria-label={`A sundial showing ${time}`}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <circle className="dial-face" cx="100" cy="100" r="92" />
        {Array.from({ length: 24 }, (_, i) => (
          <line
            key={i}
            className={i % 6 === 0 ? 'tick tick-major' : 'tick'}
            x1="100"
            y1="14"
            x2="100"
            y2={i % 6 === 0 ? 26 : 20}
            transform={`rotate(${i * 15} 100 100)`}
          />
        ))}
        <g
          className="shadow"
          style={{ transform: `rotate(${shadowAngle(now)}deg)` }}
        >
          <path d="M100 100 L96 30 Q100 22 104 30 Z" />
        </g>
        <circle className="sun" cx="100" cy="100" r="9" />
      </svg>
      <figcaption>{time} where you are</figcaption>
    </figure>
  )
}

function SignupForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <p className="signup-done" role="status">
        Thank you. Your first letter arrives Sunday at sunrise.
      </p>
    )
  }

  return (
    <form
      className="signup"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <label htmlFor="email" className="visually-hidden">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  )
}

function App() {
  return (
    <div className="page">
      <header className="nav">
        <a href="#" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          Daylight
        </a>
        <a href="#subscribe" className="nav-link">
          Subscribe
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">A weekly letter · Est. 2026</p>
            <h1>
              Slow thoughts
              <br />
              for <em>quick</em> mornings.
            </h1>
            <p className="lede">
              Daylight is a short letter that arrives once a week, at sunrise.
              One idea, written slowly, for people who would rather think than
              scroll.
            </p>
            <div id="subscribe">
              <SignupForm />
              <p className="fineprint">Free. Unsubscribe anytime.</p>
            </div>
          </div>
          <Sundial />
        </section>

        <section className="notes" aria-label="How it works">
          {notes.map((note) => (
            <article key={note.n} className="note">
              <span className="numeral">{note.n}</span>
              <h2>{note.title}</h2>
              <p>{note.body}</p>
            </article>
          ))}
        </section>

        <blockquote className="quote">
          <p>
            “The only newsletter I open before my coffee gets cold.”
          </p>
          <footer>— A reader, somewhere at dawn</footer>
        </blockquote>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Daylight</span>
        <span>Written by hand. Sent by sunrise.</span>
      </footer>
    </div>
  )
}

export default App
