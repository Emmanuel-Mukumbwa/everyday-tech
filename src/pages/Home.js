// src/pages/Home.jsx
import React from 'react';

export default function Home() {
  return (
    <main className="container py-5">
      <h1>App test — if you see this, basic components load OK</h1>
      <p className="text-muted">
        The Home component is rendering. This confirms routing and Navbar/Footer imports are correct.
        If you want the full Hero and product grid restored, I'll paste those next.
      </p>

      <section className="mt-4">
        <h2>Quick checklist</h2>
        <ul>
          <li>Navbar and Footer loaded — OK</li>
          <li>Home exports default component — OK</li>
          <li>Next: restore Hero.jsx and ProductCard.jsx to show the full design</li>
        </ul>
      </section>
    </main>
  );
}
