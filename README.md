# techstartsUrla — Landing

Satış görüşmeleri için canlı AI asistanı ürününün tanıtım sitesi. Next.js 16 (App Router), Tailwind CSS v4, Motion.
[ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template) üzerine kuruldu (MIT, bkz. `LICENSE`).

Canlı: https://yusufkrnz.github.io/techstartsUrla/

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + build
```

## İçerik nerede?

Bileşenlerin içinde metin/veri yok; hepsi `src/data/` altında, tipleri `src/types/landing.ts` içinde.

| Dosya | İçerik |
|-------|--------|
| `src/data/site.ts` | Marka adı, navigasyon, duyuru şeridi, butonlar |
| `src/data/hero.ts` | Hero başlığı, toplantı mock'u, notch akışı |
| `src/data/call-stages.ts` | Before / During / After the Call bölümleri |
| `src/data/industries.ts` | Sektör kartları |
| `src/data/metrics.ts` | Metrics paneli (KPI, transcript, zaman çizelgesi) |
| `src/data/integrations.ts` | Entegrasyon ızgarası ve footer |
| `src/data/testimonials.ts` | Müşteri alıntıları (şu an yer tutucu) |

Bölüm bileşenleri: `src/components/landing/`.

## Deploy (GitHub Pages)

```bash
npm run deploy
```

Statik export alır (`PAGES_BASE_PATH=/techstartsUrla`) ve `out/` klasörünü `gh-pages` dalına push eder.
Repo adı değişirse `package.json` içindeki `build:pages` script'inde yolu güncelle.
