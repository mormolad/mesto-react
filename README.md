# 📦 ЭПИКИ ДЛЯ РАЗРАБОТКИ
## Приложение-помощник для турагента + Интерфейс для туриста

**Версия:** 1.0  
**Методология:** Agile/Scrum  
**Спринт:** 2 недели

---

# 🎨 FRONTEND ЭПИКИ

## FE-EPIC-01: Система аутентификации и авторизации
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🔴 Критический |
| **Сложность** | M (34 story points) |
| **Спринты** | 1-2 |
| **Зависимости** | BE-EPIC-01 |

### User Stories:
```
US-FE-01.1: Регистрация по email/телефону
US-FE-01.2: Вход с JWT-токеном
US-FE-01.3: 2FA (TOTP/SMS) — включение и верификация
US-FE-01.4: Восстановление пароля
US-FE-01.5: Ролевая навигация (агент/турист/админ)
US-FE-01.6: Авто-логаут при истечении токена
US-FE-01.7: Экран «Забыли пароль?»
```

### Deliverables:
- [ ] Формы регистрации/входа (валидация, ошибки)
- [ ] Хранение токена (httpOnly cookie / localStorage)
- [ ] Protected routes (AuthGuard)
- [ ] 2FA интерфейс (QR-код для TOTP)
- [ ] Роутинг по ролям

### Acceptance Criteria:
```
✅ Регистрация создаёт пользователя с ролью по умолчанию
✅ Токен обновляется через refresh endpoint
✅ При 401 — редирект на логин
✅ 2FA нельзя обойти без верификации
```

---

## FE-EPIC-02: Кабинет турагента (Dashboard + навигация)
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🔴 Критический |
| **Сложность** | L (55 story points) |
| **Спринты** | 2-4 |
| **Зависимости** | FE-EPIC-01 |

### User Stories:
```
US-FE-02.1: Главный дашборд с виджетами (доход, активные подписки, задачи)
US-FE-02.2: Боковое меню с навигацией по модулям
US-FE-02.3: Переключатель тем (светлая/тёмная)
US-FE-02.4: Профиль агента (редактирование, загрузка логотипа)
US-FE-02.5: Уведомления в интерфейсе (колокольчик)
US-FE-02.6: Быстрый поиск по системе (Ctrl+K)
US-FE-02.7: Онбординг-тур для новых агентов
```

### Deliverables:
- [ ] Layout с sidebar/header/footer
- [ ] Dashboard widgets (графики, карточки)
- [ ] Theme provider (context + localStorage)
- [ ] Notification center component
- [ ] Onboarding tour (reactour / intro.js)

### Acceptance Criteria:
```
✅ Все виджеты загружаются асинхронно (скелетоны)
✅ Меню адаптируется под мобильные (hamburger)
✅ Тема сохраняется между сессиями
✅ Онбординг можно пропустить и включить позже
```

---

## FE-EPIC-03: Поиск и фильтрация туров
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🔴 Критический |
| **Сложность** | XL (89 story points) |
| **Спринты** | 3-5 |
| **Зависимости** | BE-EPIC-02 |

### User Stories:
```
US-FE-03.1: Форма поиска (направление, даты, состав, бюджет)
US-FE-03.2: Расширенные фильтры (питание, рейтинг, авиа, теги)
US-FE-03.3: Результаты поиска (список/сетка, сортировка)
US-FE-03.4: Карточка тура (фото, цена, условия, кнопка «В подборку»)
US-FE-03.5: Карточка отеля с заметками агента
US-FE-03.6: Сравнение туров (таблица до 4 вариантов)
US-FE-03.7: Календарь низких цен (heat map по датам)
US-FE-03.8: Пагинация / бесконечный скролл
US-FE-03.9: Сохранение параметров поиска (URL params)
```

### Deliverables:
- [ ] Search form component (с валидацией дат)
- [ ] Filter sidebar (collapsible на мобильных)
- [ ] Tour/Hotel card components
- [ ] Comparison table component
- [ ] Calendar heatmap component
- [ ] URL state sync (query params)

### Acceptance Criteria:
```
✅ Поиск работает с debounce 300ms
✅ Фильтры применяются без перезагрузки страницы
✅ Состояние поиска сохраняется при навигации
✅ Карточка тура загружается ≤1 сек (кэш + скелетон)
✅ Сравнение показывает различия подсветкой
```

---

## FE-EPIC-04: Конструктор подборок
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🔴 Критический |
| **Сложность** | XL (89 story points) |
| **Спринты** | 4-6 |
| **Зависимости** | FE-EPIC-03, BE-EPIC-03 |

### User Stories:
```
US-FE-04.1: Создание новой подборки (название, описание, шаблон)
US-FE-04.2: Добавление туров/отелей из поиска (drag-n-drop)
US-FE-04.3: Редактирование состава подборки (удалить, переместить)
US-FE-04.4: Переключатель «фиксировать цены»
US-FE-04.5: Выбор шаблона оформления (3-5 вариантов)
US-FE-04.6: Предпросмотр подборки (как увидит турист)
US-FE-04.7: Сохранение черновика / публикация
US-FE-04.8: Экспорт (PDF, ссылка, текст для мессенджера)
US-FE-04.9: Версионность (история изменений, откат)
```

### Deliverables:
- [ ] Collection builder UI (two-column: search + collection)
- [ ] Drag-n-drop library integration (dnd-kit / react-beautiful-dnd)
- [ ] Template selector component
- [ ] Price toggle component
- [ ] Preview modal (iframe / separate route)
- [ ] Export buttons with format selection
- [ ] Version history timeline

### Acceptance Criteria:
```
✅ Drag-n-drop работает на тач-устройствах
✅ Предпросмотр идентичен тому, что видит турист
✅ Экспорт PDF генерируется ≤5 сек
✅ Ссылка на подборку открывается без авторизации
✅ Версии можно сравнивать (diff view)
```

---

## FE-EPIC-05: Интерфейс туриста (подборки + подписки)
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🔴 Критический |
| **Сложность** | L (55 story points) |
| **Спринты** | 4-6 |
| **Зависимости** | FE-EPIC-04, BE-EPIC-04 |

### User Stories:
```
US-FE-05.1: Публичная страница подборки (по токену)
US-FE-05.2: График динамики цен (7/14/30 дней)
US-FE-05.3: Форма настройки подписки (онбординг туриста)
US-FE-05.4: Профиль туриста (управление подписками, данные)
US-FE-05.5: Кнопки действий («Забронировать», «Задать вопрос», «Поделиться»)
US-FE-05.6: Чат с агентом (Telegram deep link / встроенный)
US-FE-05.7: История просмотров туров
US-FE-05.8: Кнопки «Скачать мои данные» / «Удалить аккаунт»
```

### Deliverables:
- [ ] Public collection page (no auth required)
- [ ] Price chart component (chart.js / recharts)
- [ ] Subscription onboarding wizard (step-by-step)
- [ ] Tourist profile dashboard
- [ ] Action buttons component
- [ ] Chat widget (or Telegram link)
- [ ] GDPR compliance buttons

### Acceptance Criteria:
```
✅ Страница подборки загружается ≤2 сек на 3G
✅ График интерактивный (tooltip, zoom)
✅ Подписка активируется сразу после подтверждения
✅ Кнопки соцсетей открывают share-диалог
✅ Удаление аккаунта требует подтверждения (2 клика)
```

---

## FE-EPIC-06: Мини-CRM (клиенты + сделки)
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🟡 Средний |
| **Сложность** | L (55 story points) |
| **Спринты** | 6-8 |
| **Зависимости** | FE-EPIC-02, BE-EPIC-05 |

### User Stories:
```
US-FE-06.1: Список клиентов (поиск, фильтры, теги)
US-FE-06.2: Карточка клиента (контакты, предпочтения, документы)
US-FE-06.3: Создание/редактирование клиента
US-FE-06.4: Воронка сделок (канбан-доска)
US-FE-06.5: Карточка сделки (этап, сумма, даты, комментарии)
US-FE-06.6: История коммуникаций (лог переписки)
US-FE-06.7: Напоминания (календарь, дедлайны)
US-FE-06.8: Сегментация (массовые операции по тегам)
```

### Deliverables:
- [ ] Client list with pagination & filters
- [ ] Client form (with encrypted fields UI)
- [ ] Kanban board for deals (react-beautiful-dnd)
- [ ] Deal card component
- [ ] Communication timeline component
- [ ] Calendar view for reminders
- [ ] Bulk actions toolbar

### Acceptance Criteria:
```
✅ Канбан позволяет перетаскивать сделки между этапами
✅ Документы отображаются с маскированием данных
✅ Напоминания показываются в дашборде
✅ Сегментация работает с предпросмотром количества
```

---

## FE-EPIC-07: Финансовый модуль
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🟡 Средний |
| **Сложность** | M (34 story points) |
| **Спринты** | 7-8 |
| **Зависимости** | BE-EPIC-06 |

### User Stories:
```
US-FE-07.1: Дашборд доходов (графики по периодам)
US-FE-07.2: Таблица сделок с финансами (доход, комиссия, расходы)
US-FE-07.3: Калькулятор маржи (ввод параметров, авто-расчёт)
US-FE-07.4: Управление курсами валют (просмотр, ручной ввод)
US-FE-07.5: Экспорт отчётов (CSV, Excel, PDF)
US-FE-07.6: Фильтры по периодам, агентам, направлениям
```

### Deliverables:
- [ ] Revenue dashboard with charts
- [ ] Deals finance table
- [ ] Margin calculator form
- [ ] Currency rate management UI
- [ ] Export modal with format options
- [ ] Date range picker component

### Acceptance Criteria:
```
✅ Калькулятор показывает расчёт в реальном времени
✅ Курсы можно импортировать CSV
✅ Экспорт формируется ≤3 сек
✅ Графики адаптируются под период (день/неделя/месяц/год)
```

---

## FE-EPIC-08: Telegram Mini App интеграция
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🟡 Средний |
| **Сложность** | M (34 story points) |
| **Спринты** | 5-7 |
| **Зависимости** | FE-EPIC-05, BE-EPIC-07 |

### User Stories:
```
US-FE-08.1: Инициализация Telegram WebApp SDK
US-FE-08.2: Адаптация под тему Telegram (цветовая схема)
US-FE-08.3: Нативные кнопки (MainButton, BackButton)
US-FE-08.4: Deep links из бота в Mini App
US-FE-08.5: Отправка данных обратно в бот (closeWithParams)
US-FE-08.6: Haptic feedback для действий
US-FE-08.7: Offline indicator (статус соединения)
```

### Deliverables:
- [ ] Telegram SDK wrapper (React context)
- [ ] Theme sync with Telegram
- [ ] Native button components
- [ ] Deep link handler
- [ ] Data callback to bot
- [ ] Haptic feedback utility
- [ ] Connection status component

### Acceptance Criteria:
```
✅ Mini App открывается внутри Telegram без ошибок
✅ Тема синхронизируется с настройками Telegram
✅ Кнопки работают на iOS и Android
✅ Данные передаются в бот после действия пользователя
```

---

## FE-EPIC-09: SMM-инструменты (шаблоны + экспорт)
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🟢 Низкий |
| **Сложность** | M (34 story points) |
| **Спринты** | 8-9 |
| **Зависимости** | FE-EPIC-04 |

### User Stories:
```
US-FE-09.1: Библиотека шаблонов сторис (5-10 макетов)
US-FE-09.2: Редактор шаблона (текст, фото, цвета)
US-FE-09.3: Предпросмотр сторис (мобильный формат)
US-FE-09.4: Экспорт в PNG/JPG (скачивание)
US-FE-09.5: Авто-постинг в Telegram (через бота)
US-FE-09.6: Сохранение шаблонов в медиатеку
US-FE-09.7: Генератор хештегов и текста поста
```

### Deliverables:
- [ ] Template gallery component
- [ ] Story editor (canvas-based)
- [ ] Mobile preview frame
- [ ] Image export utility (html2canvas)
- [ ] Telegram post integration
- [ ] Media library grid
- [ ] Hashtag generator component

### Acceptance Criteria:
```
✅ Экспорт изображения ≤3 сек
✅ Шаблон сохраняет все кастомизации
✅ Предпросмотр идентичен экспорту
✅ Хештеги копируются в буфер одним кликом
```

---

## FE-EPIC-10: База знаний (отели + вики)
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🟡 Средний |
| **Сложность** | M (34 story points) |
| **Спринты** | 6-7 |
| **Зависимости** | BE-EPIC-08 |

### User Stories:
```
US-FE-10.1: Список личных отелей (поиск, фильтры, теги)
US-FE-10.2: Карточка отеля с заметками агента
US-FE-10.3: Добавление/редактирование заметки (текст, фото, голос)
US-FE-10.4: Создание списков отелей (тематические подборки)
US-FE-10.5: Шеринг списков (по ссылке, внутри команды)
US-FE-10.6: Визовый справочник (статьи, поиск)
US-FE-10.7: Чек-листы (создание, прохождение, экспорт)
US-FE-10.8: Голосовой ввод заметок (speech-to-text)
```

### Deliverables:
- [ ] Hotel list with tags & search
- [ ] Hotel card with agent notes section
- [ ] Note editor (text + media upload)
- [ ] List builder UI
- [ ] Share modal (permissions + link)
- [ ] Wiki article viewer
- [ ] Checklist component
- [ ] Voice recording component (Web Audio API)

### Acceptance Criteria:
```
✅ Голос конвертируется в текст с точностью ≥90%
✅ Списки можно делать приватными/публичными/по ссылке
✅ Заметки отображаются с аватаром автора
✅ Чек-листы сохраняют прогресс
```

---

# ⚙️ BACKEND ЭПИКИ

## BE-EPIC-01: Система аутентификации и авторизации
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🔴 Критический |
| **Сложность** | M (34 story points) |
| **Спринты** | 1-2 |
| **Зависимости** | Нет |

### User Stories:
```
US-BE-01.1: Регистрация пользователя (email/телефон, валидация)
US-BE-01.2: Логин с выдачей JWT (access + refresh)
US-BE-01.3: 2FA генерация секрет + верификация TOTP
US-BE-01.4: Восстановление пароля (токен по email/SMS)
US-BE-01.5: Ролевая модель (owner, agent, manager, tourist)
US-BE-01.6: Middleware для защиты эндпоинтов
US-BE-01.7: Refresh token ротация
US-BE-01.8: Логаут (blacklist токенов)
```

### Deliverables:
- [ ] Auth controller (register, login, refresh, logout)
- [ ] JWT service (sign, verify, refresh)
- [ ] 2FA service (speakeasy / otpauth)
- [ ] Password reset service (email/SMS provider)
- [ ] Role guard decorator/middleware
- [ ] Token blacklist (Redis)
- [ ] Unit tests (≥90% coverage)

### Acceptance Criteria:
```
✅ Пароли хешируются bcrypt/argon2
✅ Токены истекают по расписанию (access 15min, refresh 7days)
✅ 2FA нельзя отключить без текущего кода
✅ Role guard блокирует доступ неавторизованным
```

### API Endpoints:
```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
POST /api/v1/auth/2fa/enable
POST /api/v1/auth/2fa/verify
POST /api/v1/auth/password/reset/request
POST /api/v1/auth/password/reset/confirm
```

---

## BE-EPIC-02: Поиск и агрегация туров
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🔴 Критический |
| **Сложность** | XL (89 story points) |
| **Спринты** | 2-5 |
| **Зависимости** | BE-EPIC-01 |

### User Stories:
```
US-BE-02.1: Интеграция с API туроператоров (1-2 на старте)
US-BE-02.2: Нормализация данных от разных ТО (единая схема)
US-BE-02.3: Поиск туров с фильтрами (ElasticSearch)
US-BE-02.4: Кэширование результатов поиска (Redis, TTL 15-30min)
US-BE-02.5: Календарь низких цен (агрегация по датам)
US-BE-02.6: Сравнение туров (серверная логика)
US-BE-02.7: Пагинация и сортировка результатов
US-BE-02.8: Обработка ошибок API ТО (graceful degradation)
US-BE-02.9: Логирование запросов к ТО (для отладки)
```

### Deliverables:
- [ ] Tour operator API adapters (interface + implementations)
- [ ] Data normalizer service (unified tour schema)
- [ ] Search service (ElasticSearch queries)
- [ ] Cache layer (Redis + invalidation strategy)
- [ ] Price calendar aggregator
- [ ] Comparison service
- [ ] Error handler & retry logic
- [ ] Request logging (correlation IDs)

### Acceptance Criteria:
```
✅ Поиск возвращает результаты ≤500ms (p95)
✅ При недоступности ТО — показ кэша с меткой
✅ Данные нормализованы (единые названия стран, отелей)
✅ Кэш инвалидируется при изменении цены >3%
```

### API Endpoints:
```
GET  /api/v1/tours/search
GET  /api/v1/tours/{id}
GET  /api/v1/hotels/{id}
GET  /api/v1/hotels/{id}/price-history
POST /api/v1/tours/compare
GET  /api/v1/calendar/low-prices
```

---

## BE-EPIC-03: Подборки (Collections)
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🔴 Критический |
| **Сложность** | L (55 story points) |
| **Спринты** | 4-6 |
| **Зависимости** | BE-EPIC-02 |

### User Stories:
```
US-BE-03.1: CRUD подборок (создание, чтение, обновление, удаление)
US-BE-03.2: Добавление/удаление туров в подборку
US-BE-03.3: Фиксация цен (snapshot на момент публикации)
US-BE-03.4: Генерация публичной ссылки (token-based access)
US-BE-03.5: Версионность (сохранение истории изменений)
US-BE-03.6: Экспорт PDF (server-side rendering)
US-BE-03.7: Экспорт текста для мессенджеров
US-BE-03.8: Трекинг открытий подборки (analytics events)
US-BE-03.9: Шаблоны оформления (сохранение конфигурации)
```

### Deliverables:
- [ ] Collection CRUD service
- [ ] Collection items service
- [ ] Price snapshot service
- [ ] Share token generator
- [ ] Versioning service (snapshots)
- [ ] PDF generator (Puppeteer / wkhtmltopdf)
- [ ] Text formatter for messengers
- [ ] Analytics event collector
- [ ] Template configuration storage

### Acceptance Criteria:
```
✅ Публичная ссылка работает без авторизации
✅ Версии сохраняются при каждом значимом изменении
✅ PDF генерируется ≤5 сек
✅ Трекинг не блокирует основную логику (async)
```

### API Endpoints:
```
GET  /api/v1/collections
POST /api/v1/collections
PUT  /api/v1/collections/{id}
DELETE /api/v1/collections/{id}
POST /api/v1/collections/{id}/items
DELETE /api/v1/collections/{id}/items/{item_id}
POST /api/v1/collections/{id}/publish
GET  /api/v1/collections/share/{token}
POST /api/v1/collections/{id}/export
GET  /api/v1/collections/{id}/versions
```

---

## BE-EPIC-04: Умный подписчик (мониторинг цен)
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🔴 Критический |
| **Сложность** | XL (89 story points) |
| **Спринты** | 4-7 |
| **Зависимости** | BE-EPIC-02, BE-EPIC-09 |

### User Stories:
```
US-BE-04.1: Профиль предпочтений туриста (CRUD)
US-BE-04.2: Фоновый мониторинг (cron каждые 2-4 часа)
US-BE-04.3: Сравнение цен с последним снимком
US-BE-04.4: Умные триггеры (↓≥5%, горящий, мало мест)
US-BE-04.5: Очередь уведомлений (priority queue)
US-BE-04.6: Отправка через Telegram Bot API
US-BE-04.7: Отправка через email (SMTP / provider)
US-BE-04.8: Частота уведомлений (сразу/день/3 дня)
US-BE-04.9: История снимков цен (для графика)
US-BE-04.10: Трекинг вовлечённости (открытия, клики)
```

### Deliverables:
- [ ] Tourist profile service
- [ ] Price monitoring cron job
- [ ] Price comparison service
- [ ] Trigger rules engine
- [ ] Notification queue (Celery / BullMQ)
- [ ] Telegram notification sender
- [ ] Email notification sender
- [ ] Frequency throttling service
- [ ] Price snapshot storage
- [ ] Analytics event tracker

### Acceptance Criteria:
```
✅ Мониторинг работает без дублирования запросов к ТО
✅ Уведомления отправляются ≤5 минут после изменения
✅ Частота соблюдается (не чаще настройки пользователя)
✅ При ошибке отправки — повтор через 5 минут (retry)
```

### API Endpoints:
```
POST /api/v1/subscriptions
GET  /api/v1/subscriptions/me
PUT  /api/v1/subscriptions/me
DELETE /api/v1/subscriptions/me
GET  /api/v1/subscriptions/preview
GET  /api/v1/subscriptions/history
```

---

## BE-EPIC-05: Мини-CRM (клиенты + сделки)
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🟡 Средний |
| **Сложность** | L (55 story points) |
| **Спринты** | 6-8 |
| **Зависимости** | BE-EPIC-01 |

### User Stories:
```
US-BE-05.1: CRUD клиентов (контакты, предпочтения)
US-BE-05.2: Шифрование персональных данных (passport, phone)
US-BE-05.3: Теги и сегментация клиентов
US-BE-05.4: CRUD сделок (воронка этапов)
US-BE-05.5: Привязка сделок к подборкам
US-BE-05.6: История коммуникаций (лог)
US-BE-05.7: Авто-триггеры (напоминания по датам)
US-BE-05.8: Экспорт данных клиента (152-ФЗ)
US-BE-05.9: Удаление данных по запросу (152-ФЗ)
```

### Deliverables:
- [ ] Client CRUD service
- [ ] Encryption service (AES-256 for sensitive fields)
- [ ] Tag & segmentation service
- [ ] Deal pipeline service
- [ ] Collection-deal linkage
- [ ] Communication log service
- [ ] Reminder scheduler (cron)
- [ ] Data export service (JSON/CSV)
- [ ] Data deletion service (soft delete + hard delete)

### Acceptance Criteria:
```
✅ Чувствительные данные шифруются перед записью в БД
✅ Экспорт содержит все данные клиента в читаемом виде
✅ Удаление помечает запись + очищает персональные данные
✅ Триггеры срабатывают по расписанию (±15 минут)
```

### API Endpoints:
```
GET  /api/v1/clients
POST /api/v1/clients
PUT  /api/v1/clients/{id}
DELETE /api/v1/clients/{id}
GET  /api/v1/clients/{id}/deals
POST /api/v1/deals
PUT  /api/v1/deals/{id}
PUT  /api/v1/deals/{id}/stage
GET  /api/v1/clients/{id}/export
POST /api/v1/clients/{id}/delete-request
```

---

## BE-EPIC-06: Финансовый модуль
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🟡 Средний |
| **Сложность** | M (34 story points) |
| **Спринты** | 7-8 |
| **Зависимости** | BE-EPIC-05 |

### User Stories:
```
US-BE-06.1: Курсы валют (авто-загрузка ЦБ + ручной ввод)
US-BE-06.2: История курсов (на любую дату)
US-BE-06.3: Калькулятор маржи (цена × комиссия − расходы)
US-BE-06.4: Учёт доходов по сделкам
US-BE-06.5: Учёт расходов (реклама, подписки, комиссии)
US-BE-06.6: Агрегация по периодам (день/неделя/месяц/год)
US-BE-06.7: Агрегация по агентам/направлениям
US-BE-06.8: Экспорт финансовых отчётов
```

### Deliverables:
- [ ] Currency rate service (CB RF API + manual)
- [ ] Rate history storage
- [ ] Margin calculator service
- [ ] Revenue tracking service
- [ ] Expense tracking service
- [ ] Aggregation service (time-based, agent-based)
- [ ] Report generator (CSV/Excel)

### Acceptance Criteria:
```
✅ Курсы ЦБ загружаются автоматически (daily cron)
✅ Ручной курс имеет приоритет над авто
✅ Маржа считается с учётом курса на дату бронирования
✅ Отчёты формируются ≤3 сек
```

### API Endpoints:
```
GET  /api/v1/finance/rates
POST /api/v1/finance/rates
GET  /api/v1/finance/rates/history
POST /api/v1/finance/calculate-margin
GET  /api/v1/finance/revenue
GET  /api/v1/finance/expenses
POST /api/v1/finance/export
```

---

## BE-EPIC-07: Telegram Bot интеграция
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🟡 Средний |
| **Сложность** | M (34 story points) |
| **Спринты** | 5-7 |
| **Зависимости** | BE-EPIC-04 |

### User Stories:
```
US-BE-07.1: Webhook для Telegram Bot API
US-BE-07.2: Обработка команд (/start, /help, /subscribe)
US-BE-07.3: Обработка callback_query (кнопки в сообщениях)
US-BE-07.4: Отправка подборок в Telegram (форматирование)
US-BE-07.5: Deep links в Mini App
US-BE-07.6: Трекинг открытий сообщений
US-BE-07.7: Rate limiting (защита от спама)
US-BE-07.8: Логи бота (для отладки)
```

### Deliverables:
- [ ] Telegram webhook handler
- [ ] Command processor
- [ ] Callback query handler
- [ ] Message formatter (collections, notifications)
- [ ] Deep link generator
- [ ] Open tracking (unique links per user)
- [ ] Rate limiter (Redis-based)
- [ ] Bot logging service

### Acceptance Criteria:
```
✅ Webhook обрабатывает ≤200ms (p95)
✅ Кнопки работают на всех устройствах
✅ Deep links открывают правильный экран Mini App
✅ Rate limit блокирует после 10 запросов/мин
```

### API Endpoints:
```
POST /api/v1/webhooks/telegram
GET  /api/v1/bot/stats
POST /api/v1/bot/send-message
POST /api/v1/bot/send-collection
```

---

## BE-EPIC-08: База знаний (отели + контент)
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🟡 Средний |
| **Сложность** | M (34 story points) |
| **Спринты** | 6-7 |
| **Зависимости** | BE-EPIC-02 |

### User Stories:
```
US-BE-08.1: CRUD заметок агента в карточке отеля
US-BE-08.2: Загрузка медиа (фото, голосовые)
US-BE-08.3: Теги для отелей (поиск и фильтрация)
US-BE-08.4: Списки отелей (CRUD, шеринг)
US-BE-08.5: Права доступа к спискам (приватный/команда/публичный)
US-BE-08.6: Визовый справочник (статьи CRUD)
US-BE-08.7: Чек-листы (CRUD, прогресс)
US-BE-08.8: Голосовые заметки (storage + transcription API)
```

### Deliverables:
- [ ] Agent notes service
- [ ] Media upload service (S3)
- [ ] Tag service
- [ ] Hotel list service
- [ ] Permission service (lists)
- [ ] Wiki article service
- [ ] Checklist service
- [ ] Voice transcription integration (Yandex SpeechKit / Google)

### Acceptance Criteria:
```
✅ Медиа загружаются ≤3 сек (до 10MB)
✅ Голос транскрибируется с точностью ≥90%
✅ Права доступа проверяются перед каждым действием
✅ Списки можно клонировать (для команды)
```

### API Endpoints:
```
GET  /api/v1/hotels/{id}/notes
POST /api/v1/hotels/{id}/notes
PUT  /api/v1/hotels/notes/{note_id}
DELETE /api/v1/hotels/notes/{note_id}
POST /api/v1/media/upload
GET  /api/v1/hotel-lists
POST /api/v1/hotel-lists
PUT  /api/v1/hotel-lists/{id}
POST /api/v1/hotel-lists/{id}/share
GET  /api/v1/wiki/articles
GET  /api/v1/checklists
```

---

## BE-EPIC-09: Уведомления и события
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🟡 Средний |
| **Сложность** | M (34 story points) |
| **Спринты** | 5-7 |
| **Зависимости** | BE-EPIC-04, BE-EPIC-07 |

### User Stories:
```
US-BE-09.1: Единая очередь уведомлений (priority queue)
US-BE-09.2: Каналы: Telegram, email, push
US-BE-09.3: Шаблоны уведомлений (i18n ready)
US-BE-09.4: Throttling (не чаще настройки пользователя)
US-BE-09.5: Статусы: pending, sent, failed, read
US-BE-09.6: Retry logic (3 попытки с экспоненциальной задержкой)
US-BE-09.7: Логирование всех уведомлений
US-BE-09.8: Аналитика доставляемости
```

### Deliverables:
- [ ] Notification queue service
- [ ] Channel adapters (Telegram, email, push)
- [ ] Template engine (Handlebars / Jinja2)
- [ ] Throttling service
- [ ] Status tracking
- [ ] Retry mechanism
- [ ] Notification log
- [ ] Delivery analytics

### Acceptance Criteria:
```
✅ Уведомления не дублируются
✅ Retry не создаёт бесконечный цикл (max 3)
✅ Шаблоны поддерживают переменные (имя, цена, даты)
✅ Лог содержит статус и ошибку (если failed)
```

### API Endpoints:
```
GET  /api/v1/notifications
PUT  /api/v1/notifications/{id}/read
POST /api/v1/notifications/test
GET  /api/v1/notifications/stats
```

---

## BE-EPIC-10: Инфраструктура и DevOps
| Параметр | Значение |
|----------|----------|
| **Приоритет** | 🔴 Критический |
| **Сложность** | L (55 story points) |
| **Спринты** | 1-9 (постоянно) |
| **Зависимости** | Нет |

### User Stories:
```
US-BE-10.1: Docker Compose для локальной разработки
US-BE-10.2: CI/CD пайплайн (test → staging → production)
US-BE-10.3: Мониторинг (Prometheus + Grafana)
US-BE-10.4: Логирование (ELK / Loki)
US-BE-10.5: Health checks для всех сервисов
US-BE-10.6: Резервное копирование БД (daily)
US-BE-10.7: SSL/TLS настройка
US-BE-10.8: Load balancing (nginx / traefik)
US-BE-10.9: Seed данные для тестирования
```

### Deliverables:
- [ ] Dockerfiles для всех сервисов
- [ ] Docker Compose (dev, staging, prod)
- [ ] GitHub Actions / GitLab CI config
- [ ] Prometheus metrics exporters
- [ ] Grafana dashboards
- [ ] Log aggregation config
- [ ] Health check endpoints
- [ ] Backup scripts (pg_dump + S3)
- [ ] SSL certificates (Let's Encrypt)
- [ ] Database seed scripts

### Acceptance Criteria:
```
✅ Локальный запуск: docker-compose up → всё работает
✅ Деплой на staging: git push → авто-деплой за ≤10 минут
✅ Метрики доступны в Grafana без ошибок
✅ Бекапы восстанавливаются за ≤30 минут
✅ Health checks возвращают 200 при нормальной работе
```

---

# 📊 СВОДНАЯ ТАБЛИЦА ЭПИКОВ

| Epic ID | Название | Команда | Приоритет | Сложность | Спринты | Статус |
|---------|----------|---------|-----------|-----------|---------|--------|
| **FE-01** | Аутентификация | Frontend | 🔴 | M | 1-2 | 📋 Backlog |
| **FE-02** | Кабинет агента | Frontend | 🔴 | L | 2-4 | 📋 Backlog |
| **FE-03** | Поиск туров | Frontend | 🔴 | XL | 3-5 | 📋 Backlog |
| **FE-04** | Конструктор подборок | Frontend | 🔴 | XL | 4-6 | 📋 Backlog |
| **FE-05** | Интерфейс туриста | Frontend | 🔴 | L | 4-6 | 📋 Backlog |
| **FE-06** | Мини-CRM | Frontend | 🟡 | L | 6-8 | 📋 Backlog |
| **FE-07** | Финансы | Frontend | 🟡 | M | 7-8 | 📋 Backlog |
| **FE-08** | Telegram Mini App | Frontend | 🟡 | M | 5-7 | 📋 Backlog |
| **FE-09** | SMM-инструменты | Frontend | 🟢 | M | 8-9 | 📋 Backlog |
| **FE-10** | База знаний | Frontend | 🟡 | M | 6-7 | 📋 Backlog |
| **BE-01** | Аутентификация | Backend | 🔴 | M | 1-2 | 📋 Backlog |
| **BE-02** | Поиск туров | Backend | 🔴 | XL | 2-5 | 📋 Backlog |
| **BE-03** | Подборки | Backend | 🔴 | L | 4-6 | 📋 Backlog |
| **BE-04** | Умный подписчик | Backend | 🔴 | XL | 4-7 | 📋 Backlog |
| **BE-05** | Мини-CRM | Backend | 🟡 | L | 6-8 | 📋 Backlog |
| **BE-06** | Финансы | Backend | 🟡 | M | 7-8 | 📋 Backlog |
| **BE-07** | Telegram Bot | Backend | 🟡 | M | 5-7 | 📋 Backlog |
| **BE-08** | База знаний | Backend | 🟡 | M | 6-7 | 📋 Backlog |
| **BE-09** | Уведомления | Backend | 🟡 | M | 5-7 | 📋 Backlog |
| **BE-10** | Инфраструктура | DevOps | 🔴 | L | 1-9 | 🔄 In Progress |

---

# 🗓️ РЕКОМЕНДУЕМЫЙ ПЛАН СПРИНТОВ

```
┌─────────────────────────────────────────────────────────────────┐
│ СПРИНТ 1-2: Фундамент                                           │
├─────────────────────────────────────────────────────────────────┤
│ BE-01: Аутентификация                                           │
│ BE-10: Инфраструктура (настройка CI/CD, Docker)                 │
│ FE-01: Аутентификация                                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ СПРИНТ 3-5: Ядро поиска и подборок                              │
├─────────────────────────────────────────────────────────────────┤
│ BE-02: Поиск туров                                              │
│ BE-03: Подборки                                                 │
│ FE-02: Кабинет агента                                           │
│ FE-03: Поиск туров                                              │
│ FE-04: Конструктор подборок (часть 1)                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ СПРИНТ 4-7: Умный подписчик и турист                            │
├─────────────────────────────────────────────────────────────────┤
│ BE-04: Умный подписчик                                          │
│ BE-07: Telegram Bot                                             │
│ BE-09: Уведомления                                              │
│ FE-04: Конструктор подборок (часть 2)                           │
│ FE-05: Интерфейс туриста                                        │
│ FE-08: Telegram Mini App                                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ СПРИНТ 6-8: CRM и финансы                                       │
├─────────────────────────────────────────────────────────────────┤
│ BE-05: Мини-CRM                                                 │
│ BE-06: Финансы                                                  │
│ BE-08: База знаний                                              │
│ FE-06: Мини-CRM                                                 │
│ FE-07: Финансы                                                  │
│ FE-10: База знаний                                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ СПРИНТ 8-9: SMM и полировка                                     │
├─────────────────────────────────────────────────────────────────┤
│ FE-09: SMM-инструменты                                          │
│ Bug fixes, performance optimization, security audit             │
│ Load testing, documentation                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

# 🔗 МАТРИЦА ЗАВИСИМОСТЕЙ

```
                    ┌──────────┐
                    │ BE-10    │
                    │ Инфра    │
                    └────┬─────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ BE-01   │    │ BE-02   │    │ BE-09   │
    │ Auth    │    │ Search  │    │ Notify  │
    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │
         ▼              ▼              ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ BE-05   │    │ BE-03   │    │ BE-04   │
    │ CRM     │    │ Collect │    │ Subscr  │
    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │
         ▼              ▼              ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ BE-06   │    │ BE-07   │    │ BE-08   │
    │ Finance │    │ TG Bot  │    │ Knowledge│
    └─────────┘    └─────────┘    └─────────┘

    Frontend зависит от соответствующих Backend эпиков + BE-01
```

---

# 📈 МЕТРИКИ ОТслеживания ПРОГРЕССА

| Метрика | Цель | Как измерять |
|---------|------|--------------|
| **Velocity** | 40-60 story points / спринт | Jira / Linear / Trello |
| **Burndown** | Линейное снижение к концу спринта | Sprint burndown chart |
| **Code Coverage** | ≥80% для критических модулей | Jest / Pytest coverage |
| **Cycle Time** | ≤3 дня на User Story | От In Progress → Done |
| **Bug Rate** | <5% от закрытых задач | Bug / Story ratio |
| **Deploy Frequency** | ≥2 раза в неделю на staging | CI/CD logs |

---

> 📌 **Следующий шаг**: Выбрать эпик для Спринта 1, декомпозировать на User Stories, назначить исполнителей, оценить в story points.

Нужна помощь с:
- 📝 Декомпозицией конкретного эпика на User Stories?
- 🎯 Шаблоном для Jira/Linear импорта?
- 📊 Шаблоном Sprint Planning документа?
- 🧪 Планом тестирования для эпиков?

Готов помочь детализировать любой эпик под вашу команду. 🚀
