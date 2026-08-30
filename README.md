# THE NEXT CHAPTER — Kauaʻi Hawaii Retreat

Statische Premium-Landingpage für das Retreat „THE NEXT CHAPTER" auf Kauaʻi,
4.–7. Januar 2027. Reines HTML/CSS/JS ohne externe Frameworks, gebaut für
GitHub Pages.

## Struktur

- `index.html` — die Landingpage
- `styles.css` — komplettes Design
- `script.js` — Sticky-CTA, Reveal-Animationen, Frühbucher-Countdown,
  Exit-Intent-Popup
- `assets/` — Hero-Bild, OG-Bild, Favicon
- `impressum.html`, `datenschutz.html` — rechtliche Platzhalterseiten

## Vor der Veröffentlichung unbedingt erledigen

1. **Digistore24-Link**: Alle Vorkommen von `DIGISTORE24-LINK-HIER` in
   `index.html` (7 CTA-Buttons + sticky CTA) durch den echten
   Digistore24-Checkout-Link zur 1.000-€-Reservierung ersetzen.
2. **Impressum & Datenschutz**: `impressum.html` und `datenschutz.html`
   enthalten nur Platzhalter — mit den rechtlich erforderlichen Angaben
   ausfüllen (Anbieterkennzeichnung, Datenschutzerklärung inkl.
   Digistore24 und GitHub Pages Hosting).
3. **Testimonials**: 3 Platzhalter-Zitate in `index.html` (markiert mit
   `[Platzhalter-Testimonial: ...]`) durch echte Teilnehmerstimmen
   ersetzen.
4. **Bildmaterial**: Special-Guests-Porträts und die drei Testimonial-Porträts
   sind aktuell Platzhalter-Icons. Für noch mehr visuelle Wirkung durch echte
   Fotos ersetzen, sobald verfügbar.
5. **Canonical-/OG-URL**: In `index.html` ist als Platzhalter-Domain
   `https://dirklamb.github.io/next-chapter-hawaii-retreat/` hinterlegt —
   bei abweichender GitHub-Pages-URL oder eigener Domain anpassen.
6. **Exit-Intent-Popup-Formular**: Das Formular im Exit-Intent-Popup
   (Vorname/E-Mail/Telefon) zeigt aktuell nur eine clientseitige
   Bestätigung an und sendet die Daten nirgendwo hin. Vor dem Livegang an
   ein echtes E-Mail-/CRM-Tool (z. B. den Newsletter-Anbieter für THE NEXT
   CHAPTER) anbinden — siehe Kommentar in `script.js` beim
   `exitPopupForm`-Submit-Handler.

## Lokal testen

Einfach einen statischen Server im Projektordner starten, z. B.:

```bash
python3 -m http.server 8000
```

und `http://localhost:8000` öffnen.

## GitHub Pages aktivieren

Repository-Einstellungen → „Pages" → als Quelle den Branch mit dieser
Seite (Root-Verzeichnis) auswählen. Die Datei `.nojekyll` sorgt dafür,
dass GitHub Pages die Dateien unverändert ausliefert.
