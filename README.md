# 🎨 AI Image Generator

Napredna web aplikacija za generiranje slika pomoću veštačke inteligencije. Koristi FLUX 1.1 Pro model za kreiranje visokokvalitetnih slika u različitim stilovima.

![AI Image Generator](https://placehold.co/1200x600?text=AI+Image+Generator+Interface+with+Purple+Gradient+Background)

## ✨ Karakteristike

### 🤖 AI Image Generation
- **Model**: FLUX 1.1 Pro via Replicate (visokokvalitetno generiranje slika)
- **Performance**: ~11 sekundi prosečno vreme generiranja
- **Stilovi**: 8 različitih umetničkih stilova
- **Dimenzije**: Podesive veličine od 512px do 1536px

### 🎨 Moderni Dizajn
- **Responsive**: Radi savršeno na desktop, tablet i mobilnim uređajima
- **Glassmorphism**: Savremeni dizajn sa transparentnim elementima
- **Animacije**: Glatke tranzicije i loading animacije
- **Gradient Background**: Dinamički gradijenti u purple tonovima

### 📱 Korisničko Iskustvo
- **History**: Perzistentno čuvanje svih generiranih slika
- **Download**: Jednostavno preuzimanje slika jednim klikom
- **Real-time Preview**: Uživo pregled tokom generiranja
- **Error Handling**: Prijateljski poruke o greškama

## 🚀 Brzo Pokretanje

### Preduslov
```bash
node >= 18.0.0
npm или pnpm
```

### Instalacija
```bash
# Kloniraj repository
git clone https://github.com/YOUR_USERNAME/ai-image-generator.git
cd ai-image-generator

# Instaliraj dependencies
pnpm install
# ili
npm install

# Build projekat
pnpm run build --no-lint
# ili
npm run build

# Pokreni server
pnpm start
# ili
npm start
```

Aplikacija će biti dostupna na `http://localhost:3000`

## 🛠️ Tehnologije

- **Next.js 15** - React framework sa App Router
- **TypeScript** - Type safety kroz celu aplikaciju
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Profesionalna UI komponenta biblioteka
- **FLUX 1.1 Pro** - AI model za generiranje slika

## 📖 Kako da koristiš

1. **Unesi Prompt**: Opiši sliku koju želiš da kreiraš
2. **Odaberi Stil**: Izaberi između 8 različitih umetničkih stilova:
   - Photorealistic
   - Digital Art
   - Anime Style
   - Oil Painting
   - Watercolor
   - Sketch
   - Artistic
   - Minimalist
3. **Podesi Dimenzije**: Koristi presets ili custom sliders
4. **Generiši**: Klikni "Generate Image" i čekaj ~11 sekundi
5. **Preuzmi**: Download svoju sliku ili pogledaj u galeriji

## 🎯 API Endpoints

### POST `/api/generate`
Generiše novu AI sliku.

**Request Body:**
```json
{
  "prompt": "A beautiful sunset over mountains",
  "style": "photorealistic",
  "width": 1024,
  "height": 1024
}
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://replicate.delivery/...",
  "id": "img_1234567890_abc123"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "A serene mountain lake at sunrise", "style": "photorealistic"}'
```

## 📁 Struktura Projekta

```
src/
├── app/
│   ├── api/generate/route.ts    # API endpoint za generiranje slika
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Glavna stranica
├── components/
│   ├── ImageGenerator.tsx       # Glavna komponenta za generiranje
│   ├── GenerationHistory.tsx    # Istorija generiranih slika
│   ├── ImageCard.tsx            # Karta za prikaz slike
│   └── LoadingStates.tsx        # Loading animacije
├── lib/
│   └── types.ts                 # TypeScript tipovi
└── ...
```

## 🔧 Konfiguracija

Aplikacija koristi custom AI endpoint koji ne zahteva API ključeve. Sva konfiguracija se nalazi u `src/app/api/generate/route.ts`.

## 🤝 Contribution

1. Fork projekat
2. Kreiraj feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit promene (`git commit -m 'Add some AmazingFeature'`)
4. Push na branch (`git push origin feature/AmazingFeature`)
5. Otvori Pull Request

## 📄 Licenca

Distribuirano pod MIT licencom. Pogledaj `LICENSE` za više informacija.

## 🙏 Acknowledgments

- [FLUX 1.1 Pro](https://replicate.com/black-forest-labs/flux-1.1-pro) - AI model
- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI komponente
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

**Kreirao:** [Vaše ime] 
**Email:** [vaš email]
**GitHub:** [vaš github]