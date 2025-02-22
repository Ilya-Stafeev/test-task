## Проект для обработки обращений

Это бэкенд-сервис для управления обращениями с использованием **Node.js**, **Express**, **TypeScript** и **Prisma**. Проект включает юнит-тесты, интеграционные и end-to-end тесты.

## Функционал

- Создание нового обращения
- Получение списка всех обращений
- Обновление статуса обращения:
  - Взятие в работу
  - Завершение
  - Отмена
- Массовая отмена всех "в работе" обращений


## Технологии
- Node.js — Сервер
- Express — Веб-фреймворк
- TypeScript — Статическая типизация
- Prisma — ORM для работы с базой данных
- Jest — Юнит и интеграционные тесты
- ESLint & Prettier — Линтинг и форматирование кода

##  Структура проекта

- src/
- │   index.ts          // Точка входа
- │
- ├── app/
- │   ├── server.ts     // Запуск сервера
- │   └── container.ts  // DI контейнер
- │
- ├── core/             // Базовые сущности
- │   ├── BaseEntity.ts
- │   └── IRepository.ts
- │
- ├── domain/           // Бизнес-логика
- │   └── request/      
- │       ├── Request.ts
- │       ├── RequestStatus.ts
- │       └── IRequestRepository.ts
- │
- ├── usecases/         // Приложение (Юзкейсы)
- │   └── request/
- │       ├── CreateRequestUseCase.ts
- │       ├── CancelRequestUseCase.ts
- │       ├── CompleteRequestUseCase.ts
- │       ├── GetRequestsUseCase.ts
- │       └── TakeRequestUseCase.ts
- │
- ├── infra/            // Инфраструктура (БД, API)
- │   └── repositories/
- │       └── PrismaRequestRepository.ts
- │
- └── interfaces/       // Веб-интерфейс (контроллеры, роуты)
-    └── controllers/
-    │   └── RequestController.ts
-    └── routes/
-        └── RequestRoutes.ts

## Тестирование
 Тесты написаны с использованием Jest.
 Типы тестов:
- Юнит-тесты: tests/unit/
- Интеграционные тесты: tests/integration/
- End-to-End тесты: tests/e2e/

## API Документация
- GET /requests — Получить список обращений
- POST /requests — Создать новое обращение
- PATCH /requests/:id/take — Взять обращение в работу
- PATCH /requests/:id/complete — Завершить обращение
- PATCH /requests/:id/cancel — Отменить обращение
- PATCH /requests/cancel-all — Отменить все обращения в работе


## Контакты
- Автор: Стафеев Илья
- Email: stafeev-ilya@bk.ru
- Телеграмм: https://t.me/@IlyaStafeev