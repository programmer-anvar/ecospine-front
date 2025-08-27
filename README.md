# EcoSpine - Premium Ortopedik Matraslar

EcoSpine - O'zbekistonda eng sifatli ortopedik va ekologik matraslar ishlab chiqaruvchi kompaniya. 15 yildan ortiq tajriba va 50,000+ mamnun mijoz.

## 🚀 Texnologiyalar

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern styling with CSS variables
- **React Query (TanStack)** - Server state management
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icons
- **next-themes** - Dark/light mode support

## 📁 Loyiha strukturasi

```
ecospine-front/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── products/         # Product pages
├── components/            # React components
│   ├── ui/               # Base UI components (Radix)
│   ├── header/           # Header component
│   ├── footer/           # Footer component
│   └── ...              # Feature components
├── constants/            # App constants
├── types/               # TypeScript type definitions
├── hooks/              # Custom React hooks
├── services/           # API services
├── utils/             # Utility functions
├── view/             # Page-level components
└── public/          # Static assets
```

## 🛠 Ishga tushirish

### Talablar

- Node.js 18.17 yoki undan yuqori
- npm, yarn, pnpm yoki bun

### O'rnatish

1. Repository'ni clone qiling:
```bash
git clone <repository-url>
cd ecospine-front
```

2. Dependencies'larni o'rnating:
```bash
npm install
# yoki
yarn install
# yoki
pnpm install
```

3. Development serverni ishga tushiring:
```bash
npm run dev
# yoki
yarn dev
# yoki
pnpm dev
```

4. Brauzerda [http://localhost:3000](http://localhost:3000) ochib ko'ring.

## 📋 Available Scripts

```bash
# Development server (Turbopack bilan)
npm run dev

# Production build
npm run build

# Production server
npm run start

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Formatting (Prettier)
npm run format

# Clean build artifacts
npm run clean
```

## 🔧 Konfiguratsiya

### Tailwind CSS v4
Loyijada Tailwind CSS v4 ishlatilgan, CSS variables bilan konfiguratsiya qilingan.

### TypeScript
Strict mode yoqilgan va path mapping konfiguratsiya qilingan (`@/*` alias).

### ESLint
Next.js standart konfiguratsiyasi + custom rules.

### Prettier
Code formatting uchun konfiguratsiya qilingan.

## 🎨 Design System

Loyijada Radix UI asosida qurilgan design system ishlatiladi:

- **Colors**: CSS custom properties orqali
- **Components**: Radix UI primitives
- **Icons**: Lucide React
- **Theming**: next-themes bilan dark/light mode

## 📱 Responsive Design

- **Mobile First**: 375px dan boshlab
- **Tablet**: 768px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🔗 API Integration

React Query (TanStack Query) orqali API bilan ishlash:

```tsx
import { useQuery } from '@tanstack/react-query'

const { data, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
})
```

## 🚀 Deployment

### Vercel (Tavsiya etiladi)

1. Vercel account yarating
2. Repository'ni Vercel bilan bog'lang
3. Automatic deployment sozlang

### Custom Server

1. Build qiling:
```bash
npm run build
```

2. Start qiling:
```bash
npm start
```

## 📞 Kontakt

- **Telefon**: +998901234567
- **Email**: info@ecospine.uz
- **Manzil**: Chust Shaxri, Namangan Vil, O'zbekiston
- **Ish vaqti**: Dushanba - Shanba: 09:00 - 18:00

## 📄 License

Bu loyiha EcoSpine kompaniyasiga tegishli.

---

**EcoSpine** - Sizning ajoyib uyquyingiz uchun!