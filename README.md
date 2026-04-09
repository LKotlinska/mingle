# Mingle

En mobilanpassad webbapp skapad för **LIA-eventet på Visual Arena**. Mingle hjälper studenter och företag att hitta varandra och kopplas ihop under evenemanget – en slags digital matchmaking för LIA.

---

## Innehåll

- [Om appen](#om-appen)
- [Användarflöden](#användarflöden)
- [Matchningslogik](#matchningslogik)
- [Datamodeller](#datamodeller)
- [Teknikstack](#teknikstack)
- [Kom igång](#kom-igång)
- [API-endpoints](#api-endpoints)

---

## Om appen

Mingle har två typer av användare: **studenter** och **företag**. Varje användare möts av ett eget flöde anpassat efter deras behov. Allt innehåll är på svenska och appen är designad mobile-first.

---

## Användarflöden

### Student

| Funktion | Beskrivning |
|---|---|
| **Registrera sig** | Namn, utbildning (Digital design / Webbutveckling), portfolio-/LinkedIn-länkar, profilbild |
| **Matcha med företag** | Välj egenskaper och kompetenser – få de 4 bäst matchande företagen |
| **Utmaningar** | Slumpa fram samtalsstartare att använda med företag |
| **Företagslista** | Sök och filtrera bland alla deltagande företag |

### Företag

| Funktion | Beskrivning |
|---|---|
| **Registrera sig** | Logga in med unik företagskod, fyll i roller, egenskaper och kompetenser |
| **Se studentlistan** | Sök och filtrera bland registrerade studenter |

---

## Matchningslogik

1. Studenten väljer sin utbildning, upp till **5 personliga egenskaper** och sina **kompetenser**
2. Systemet jämför mot vad företagen angett och räknar överlapp
3. De **4 bäst matchande företagen** returneras – bästa matchen visas störst, övriga tre under

Om det inte finns tillräckligt många matchningar fylls listan ut med slumpmässiga företag.

---

## Datamodeller

### Student

```
name          String, required
education     "Digital design" | "Webbutvecklare", required
links         Array of URLs, optional
profileImage  String (base64 or path), required
createdAt     Date, auto-generated
```

### Företag

```
name        String, required, max 25 tecken
code        String, unique (fördefinierad verifieringskod)
employment  Array: "webbutvecklare" | "digitaldesigner", required
traits      Array of Strings, max 5, optional
skills      Array of Strings, optional
isPresent   Boolean (markerar om företaget checkat in)
```

---

## Teknikstack

### Frontend
- React 19 med React Router (SPA)
- React Hook Form
- Vite
- CSS (plain stylesheets, mobile-first)

### Backend
- Node.js med Express 5
- MongoDB via Mongoose
- Joi (validering)

### Deployment
- Vercel (konfiguration finns)

---

## Kom igång

### Förutsättningar
- Node.js
- MongoDB (lokal instans eller Atlas URI)

### Installation

```bash
# Installera beroenden
npm install

# Skapa .env-fil med din MongoDB-URI
MONGO_URI=mongodb+srv://...

# Starta frontend (Vite dev server)
npm run dev

# Starta backend (Express + nodemon)
npm run server
```

---

## API-endpoints

| Method | Endpoint | Beskrivning |
|---|---|---|
| `POST` | `/api/register` | Registrera/uppdatera företag (kräver kod) |
| `GET` | `/api/register/:code` | Hämta företag via kod |
| `GET` | `/api/companies` | Lista alla incheckade företag |
| `GET` | `/api/students` | Lista alla registrerade studenter |
| `POST` | `/api/students` | Registrera ny student |
| `POST` | `/api/match` | Matcha student mot företag |
