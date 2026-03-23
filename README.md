## ✅ Next.js 16 — отлично!

Согласен, **Next.js 16** (который выйдет с React 19 стабильным) — это правильный выбор. Давайте обновим стек под актуальные версии.

---

## 📌 ОБНОВЛЕННЫЙ ТЕХНОЛОГИЧЕСКИЙ СТЭК (2025)

| Компонент | Версия | Почему |
|-----------|--------|--------|
| **Frontend** | Next.js 16 (App Router) | React 19, Turbopack, улучшенный кэшинг |
| **React** | 19.0.0 | Compiler, Actions, useTransition, useOptimistic |
| **Backend** | NestJS 11 | Стабильный, отличная DX, поддержка OpenTelemetry |
| **ORM** | Prisma 6 | Лучший для TypeScript, типизация из коробки |
| **База данных** | PostgreSQL 17 | Партиционирование, полнотекстовый поиск |
| **Кэш/Очереди** | Redis 7.4 + BullMQ 5 | Быстро, надежно |
| **Язык** | TypeScript 5.6 | Полная типизация |
| **Стили** | TailwindCSS 4 + shadcn/ui | Новая движок, быстрее |
| **Стейт** | TanStack Query 5 + Zustand 5 | Query — API, Zustand — UI |
| **Аутентификация** | httpOnly cookies + refresh rotation | Безопасно |
| **Деплой** | Docker + GitHub Actions + VPS/Vercel | Гибкость |

---

## 🏗️ АРХИТЕКТУРА (ОКОНЧАТЕЛЬНАЯ)

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 16)                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  App Router (Server Components + Client Components)     │   │
│  │  - SEO страницы → Server Components                     │   │
│  │  - Интерактив → Client Components                       │   │
│  │  - API Routes → Только прокси (если нужно)             │   │
│  │  - Middleware → Авторизация, редиректы                  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ HTTPS / WebSocket
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (NestJS 11)                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  API Gateway (REST)                                     │   │
│  │  /api/v1/* → JWT, Guards, Validation                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Business Modules                                       │   │
│  │  Auth, Tours, Collections, Subscriptions,              │   │
│  │  CRM, Finance, Knowledge, SMM                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Queue Workers (BullMQ)                                 │   │
│  │  Email, PDF, PriceMonitor, Telegram                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  WebSocket Gateway                                      │   │
│  │  Real-time уведомления для агентов                      │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  PostgreSQL   │    │    Redis      │    │  S3/MinIO     │
│  17 + Prisma  │    │  7.4 + BullMQ │    │  (медиа)      │
└───────────────┘    └───────────────┘    └───────────────┘
```

---

## 🎨 FRONTEND (NEXT.JS 16) — ОБНОВЛЕННЫЕ ЭПИКИ

### FE-EPIC-01: Аутентификация и авторизация

**Особенности Next.js 16:**
- `middleware.ts` для защиты роутов
- Server Actions **только** для форм (регистрация, логин)
- httpOnly cookies через `cookies()` из `next/headers`
- **Без бизнес-логики** — все запросы к NestJS

```typescript
// app/(auth)/login/actions.ts
'use server'

import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password'),
    }),
  })
  
  const { accessToken, refreshToken } = await response.json()
  
  const cookieStore = await cookies()
  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 15, // 15 минут
  })
  
  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 дней
  })
  
  redirect('/dashboard')
}
```

**Middleware:**
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')
  const pathname = request.nextUrl.pathname
  
  // Публичные страницы
  if (pathname.startsWith('/public') || pathname.startsWith('/collection')) {
    return NextResponse.next()
  }
  
  // Защищенные роуты
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Проверка роли через бэкенд (опционально)
  const user = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken.value}` },
  })
  
  if (!user.ok) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/agent/:path*', '/tourist/:path*', '/dashboard/:path*'],
}
```

---

### FE-EPIC-02: Кабинет агента

**Особенности Next.js 16:**
- Server Components для дашборда
- Streaming с Suspense
- Parallel Routes для модалок
- React 19 `use` для промисов

```typescript
// app/(agent)/dashboard/page.tsx
import { Suspense } from 'react'
import { DashboardSkeleton } from '@/components/skeletons'
import { RevenueWidget } from '@/components/dashboard/revenue-widget'
import { CollectionsWidget } from '@/components/dashboard/collections-widget'
import { ActivityWidget } from '@/components/dashboard/activity-widget'

export default async function DashboardPage() {
  // Параллельные запросы с Promise.all
  const [revenue, collections, activity] = await Promise.all([
    fetchRevenue(),
    fetchRecentCollections(),
    fetchActivity(),
  ])
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <Suspense fallback={<DashboardSkeleton />}>
        <RevenueWidget data={revenue} />
      </Suspense>
      <Suspense fallback={<DashboardSkeleton />}>
        <CollectionsWidget data={collections} />
      </Suspense>
      <Suspense fallback={<DashboardSkeleton />}>
        <ActivityWidget data={activity} />
      </Suspense>
    </div>
  )
}
```

**React 19: use() для асинхронных данных в компонентах**
```typescript
// components/dashboard/RevenueWidget.tsx
import { use } from 'react'

async function fetchRevenue() {
  const res = await fetch(`${API_URL}/finance/revenue`, {
    headers: { Cookie: cookies().toString() },
  })
  return res.json()
}

export function RevenueWidget() {
  const data = use(fetchRevenue()) // React 19 API
  
  return <Chart data={data} />
}
```

---

### FE-EPIC-03: Поиск туров

**Особенности Next.js 16:**
- `useSearchParams` для фильтров
- Server Actions для поиска (или обычный fetch)
- Кэширование через `fetch` с `next: { revalidate }`

```typescript
// app/(agent)/tours/page.tsx
import { Suspense } from 'react'
import { TourSearchForm } from '@/components/tours/tour-search-form'
import { TourResults } from '@/components/tours/tour-results'
import { TourFilters } from '@/components/tours/tour-filters'

interface SearchParams {
  q?: string
  country?: string
  dateFrom?: string
  dateTo?: string
  budget?: string
  page?: string
}

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  
  return (
    <div className="flex gap-6">
      <aside className="w-80">
        <TourFilters initialFilters={params} />
      </aside>
      <main className="flex-1">
        <TourSearchForm initialQuery={params.q} />
        <Suspense fallback={<TourResultsSkeleton />}>
          <TourResults filters={params} />
        </Suspense>
      </main>
    </div>
  )
}
```

**Server Component с пагинацией:**
```typescript
// components/tours/TourResults.tsx
export async function TourResults({ filters }: { filters: SearchParams }) {
  const response = await fetch(
    `${API_URL}/tours/search?${new URLSearchParams(filters)}`,
    {
      next: { revalidate: 60 }, // Кэшировать на 60 секунд
      headers: { Cookie: cookies().toString() },
    }
  )
  
  const { tours, total, page, totalPages } = await response.json()
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  )
}
```

---

## ⚙️ BACKEND (NESTJS 11) — СТРУКТУРА

### Модульная структура

```
src/
├── main.ts
├── app.module.ts
├── common/
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   └── roles.guard.ts
│   ├── interceptors/
│   │   └── logging.interceptor.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   └── decorators/
│       ├── roles.decorator.ts
│       └── current-user.decorator.ts
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── refresh.strategy.ts
│   │   └── dto/
│   ├── users/
│   ├── tours/
│   │   ├── tours.module.ts
│   │   ├── tours.controller.ts
│   │   ├── tours.service.ts
│   │   ├── providers/
│   │   │   ├── tour-operator.adapter.ts
│   │   │   └── search.service.ts
│   │   └── dto/
│   ├── collections/
│   ├── subscriptions/
│   ├── crm/
│   ├── finance/
│   ├── notifications/
│   │   ├── notifications.module.ts
│   │   ├── notifications.gateway.ts (WebSocket)
│   │   ├── processors/
│   │   │   ├── email.processor.ts
│   │   │   ├── pdf.processor.ts
│   │   │   └── price-monitor.processor.ts
│   │   └── dto/
│   └── knowledge/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── config/
    ├── configuration.ts
    └── validation.ts
```

### Пример модуля (Tours)

```typescript
// tours/tours.module.ts
import { Module } from '@nestjs/common'
import { ToursController } from './tours.controller'
import { ToursService } from './tours.service'
import { SearchService } from './providers/search.service'
import { TourOperatorAdapter } from './providers/tour-operator.adapter'
import { PrismaModule } from '../prisma/prisma.module'
import { RedisModule } from '../redis/redis.module'

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [ToursController],
  providers: [ToursService, SearchService, TourOperatorAdapter],
  exports: [ToursService],
})
export class ToursModule {}
```

```typescript
// tours/tours.service.ts
import { Injectable, Inject } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { RedisService } from '../redis/redis.service'
import { SearchService } from './providers/search.service'
import { CreateTourDto, SearchToursDto } from './dto'

@Injectable()
export class ToursService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    private search: SearchService,
  ) {}

  async search(dto: SearchToursDto) {
    // Проверяем кэш
    const cacheKey = `search:${JSON.stringify(dto)}`
    const cached = await this.redis.get(cacheKey)
    if (cached) return JSON.parse(cached)

    // Ищем через PostgreSQL или ElasticSearch
    const results = await this.search.query(dto)

    // Сохраняем в кэш
    await this.redis.set(cacheKey, JSON.stringify(results), 'EX', 300)

    return results
  }

  async create(dto: CreateTourDto) {
    const tour = await this.prisma.tour.create({
      data: {
        ...dto,
        hotel: { connect: { id: dto.hotelId } },
      },
    })

    // Инвалидируем кэш поиска
    await this.redis.delPattern('search:*')

    return tour
  }
}
```

```typescript
// tours/providers/search.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { SearchToursDto } from '../dto'

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async query(dto: SearchToursDto) {
    return this.prisma.tour.findMany({
      where: {
        AND: [
          dto.country ? { hotel: { country: { contains: dto.country, mode: 'insensitive' } } } : {},
          dto.dateFrom ? { startDate: { gte: new Date(dto.dateFrom) } } : {},
          dto.dateTo ? { endDate: { lte: new Date(dto.dateTo) } } : {},
          dto.budget ? { price: { lte: dto.budget } } : {},
          dto.food ? { foodType: { in: dto.food } } : {},
        ],
      },
      include: {
        hotel: true,
      },
      take: dto.limit || 20,
      skip: ((dto.page || 1) - 1) * (dto.limit || 20),
      orderBy: {
        [dto.sortBy || 'price']: dto.sortOrder || 'asc',
      },
    })
  }
}
```

---

## 🚀 QUEUE WORKERS (BullMQ)

```typescript
// notifications/processors/price-monitor.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { ToursService } from '../../tours/tours.service'
import { NotificationsService } from '../notifications.service'

@Processor('price-monitor')
export class PriceMonitorProcessor extends WorkerHost {
  constructor(
    private toursService: ToursService,
    private notifications: NotificationsService,
  ) {
    super()
  }

  async process(job: Job<{ subscriptionId: string }>) {
    const { subscriptionId } = job.data
    
    // Получаем подписку
    const subscription = await this.getSubscription(subscriptionId)
    
    // Получаем актуальную цену
    const currentPrice = await this.toursService.getPrice(subscription.tourId)
    
    // Сравниваем с последней ценой
    if (currentPrice < subscription.lastPrice * 0.95) {
      // Цена упала на 5% → уведомление
      await this.notifications.sendPriceDrop(subscription.userId, {
        tourId: subscription.tourId,
        oldPrice: subscription.lastPrice,
        newPrice: currentPrice,
      })
    }
    
    // Обновляем последнюю цену
    await this.updateSubscriptionPrice(subscriptionId, currentPrice)
  }
}
```

**Запуск воркера:**
```typescript
// main.ts (или отдельный entrypoint)
import { NestFactory } from '@nestjs/core'
import { WorkerModule } from './worker.module'

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule)
  await app.listen(3001) // Воркер на другом порту
}
```

---

## 📦 DEPLOY (DOCKER COMPOSE)

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:17
    environment:
      POSTGRES_DB: travelapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7.4-alpine
    ports:
      - "6379:6379"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql://admin:${DB_PASSWORD}@postgres:5432/travelapp
      REDIS_URL: redis://redis:6379
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
    command: ["node", "dist/main.js"]

  worker:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql://admin:${DB_PASSWORD}@postgres:5432/travelapp
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
    command: ["node", "dist/worker.js"]

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      NEXT_PUBLIC_API_URL: http://backend:3000/api/v1
    ports:
      - "3001:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## 📊 ИТОГОВАЯ ТАБЛИЦА ЭПИКОВ (С НОВЫМ СТЭКОМ)

| Epic ID | Название | Команда | Сложность | Этап | Зависимости |
|---------|----------|---------|-----------|------|-------------|
| **BE-01** | Аутентификация | Backend | M (21) | 0 | - |
| **FE-01** | Аутентификация | Frontend | M (21) | 0 | BE-01 |
| **BE-02** | Туры, отели, поиск | Backend | XL (55) | 1 | BE-01 |
| **BE-03** | Подборки | Backend | L (34) | 1 | BE-02 |
| **FE-02** | Кабинет агента | Frontend | L (34) | 1 | FE-01 |
| **FE-03** | Поиск туров | Frontend | XL (55) | 1 | BE-02 |
| **FE-04** | Конструктор подборок | Frontend | XL (55) | 2 | BE-03 |
| **BE-04** | Умный подписчик | Backend | XL (55) | 2 | BE-02 |
| **BE-05** | Уведомления | Backend | M (21) | 2 | BE-04 |
| **FE-05** | Интерфейс туриста | Frontend | L (34) | 2 | FE-04, BE-04 |
| **BE-06** | Мини-CRM | Backend | L (34) | 3 | BE-01 |
| **FE-06** | Мини-CRM | Frontend | L (34) | 3 | BE-06 |
| **BE-07** | Финансы | Backend | M (21) | 4 | BE-06 |
| **FE-07** | Финансы | Frontend | M (21) | 4 | BE-07 |
| **BE-08** | Telegram Bot | Backend | M (21) | 5 | BE-04 |
| **FE-08** | Telegram Mini App | Frontend | M (21) | 5 | BE-08 |
| **BE-09** | База знаний | Backend | M (21) | 6 | BE-02 |
| **FE-09** | SMM инструменты | Frontend | M (21) | 6 | - |
| **FE-10** | База знаний | Frontend | M (21) | 6 | BE-09 |

---

