# API docs

## Навигация

- [API docs](#api-docs)
  - [Навигация](#навигация)
  - [Общая информация](#общая-информация)
  - [Params](#params)
  - [Routes](#routes)
    - [`POST /api/login`](#post-apilogin)
    - [`POST /api/register`](#post-apiregister)
    - [`GET /api/entities`](#get-apientities)
    - [`POST /api/analytics/trends/header`](#post-apianalyticstrendsheader)
    - [`POST /api/analytics/trends/overview/dispensings-by-day`](#post-apianalyticstrendsoverviewdispensings-by-day)
    - [`POST /api/analytics/trends/overview/consumptions`](#post-apianalyticstrendsoverviewconsumptions)
    - [`POST /api/analytics/trends/overview/cleanings`](#post-apianalyticstrendsoverviewcleanings)
    - [`POST /api/analytics/trends/overview/dispensings-by-hierarchy-level`](#post-apianalyticstrendsoverviewdispensings-by-hierarchy-level)
    - [`POST /api/analytics/trends/sales/dispensings-by-date`](#post-apianalyticstrendssalesdispensings-by-date)
    - [`POST /api/analytics/trends/sales/dispensings-by-cup-size`](#post-apianalyticstrendssalesdispensings-by-cup-size)
    - [`POST /api/analytics/trends/sales/dispensings-by-recipe`](#post-apianalyticstrendssalesdispensings-by-recipe)
    - [`POST /api/analytics/trends/sales/dispensings-by-weekday-and-time`](#post-apianalyticstrendssalesdispensings-by-weekday-and-time)
    - [`POST /api/analytics/trends/sales/dispensings-previous-vs-current`](#post-apianalyticstrendssalesdispensings-previous-vs-current)
    - [`POST /api/analytics/trends/sales/dispensings-by-path`](#post-apianalyticstrendssalesdispensings-by-path)
    - [`POST /api/analytics/dayly-reports/dispensings-by-restaurant`](#post-apianalyticsdayly-reportsdispensings-by-restaurant)
    - [`POST /api/analytics/dayly-reports/cleanings-by-restaurant`](#post-apianalyticsdayly-reportscleanings-by-restaurant)
    - [`POST /api/analytics/dayly-reports/dispensings-by-hour`](#post-apianalyticsdayly-reportsdispensings-by-hour)
    - [`POST /api/analytics/dayly-reports/dispensings-by-weekday`](#post-apianalyticsdayly-reportsdispensings-by-weekday)
    - [`POST /api/analytics/dayly-reports/dispensings-by-recipe`](#post-apianalyticsdayly-reportsdispensings-by-recipe)
    - [`POST /api/analytics/dayly-reports/dispensings-by-cup-size`](#post-apianalyticsdayly-reportsdispensings-by-cup-size)
    - [`POST /api/analytics/data-export/beverages`](#post-apianalyticsdata-exportbeverages)
    - [`POST /api/analytics/data-export/cleanings`](#post-apianalyticsdata-exportcleanings)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-hour`](#post-apimaintenanceworking-hoursoverviewdowntime-by-hour)
    - [`POST /api/maintenance/working-hours/overview/downtime-causes`](#post-apimaintenanceworking-hoursoverviewdowntime-causes)
    - [`POST /api/maintenance/working-hours/overview/downtime-errors`](#post-apimaintenanceworking-hoursoverviewdowntime-errors)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-weekday`](#post-apimaintenanceworking-hoursoverviewdowntime-by-weekday)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-week`](#post-apimaintenanceworking-hoursoverviewdowntime-by-week)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-buisness-unit`](#post-apimaintenanceworking-hoursoverviewdowntime-by-buisness-unit)
    - [`POST /api/maintenance/data-export/time`](#post-apimaintenancedata-exporttime)
    - [`POST /api/maintenance/data-export/events`](#post-apimaintenancedata-exportevents)
    - [`POST /api/modal-box/events-history`](#post-apimodal-boxevents-history)
    - [`POST /api/administration/company-structure`](#post-apiadministrationcompany-structure)
    - [`POST /api/administration/company-structure/remove-user`](#post-apiadministrationcompany-structureremove-user)
    - [`POST /api/administration/company-structure/add-user`](#post-apiadministrationcompany-structureadd-user)
    - [`POST /api/administration/company-structure/create-user`](#post-apiadministrationcompany-structurecreate-user)
    - [`GET /api/profile`](#get-apiprofile)
    - [`PUT /api/profile`](#put-apiprofile)
    - [`POST /api/profile/request-sms-code`](#post-apiprofilerequest-sms-code)
    - [`POST /api/profile/request-email-code`](#post-apiprofilerequest-email-code)
    - [`GET /api/consoledata`](#get-apiconsoledata)
    - [`POST /api/timeerrordown`](#post-apitimeerrordown)
    - [Pusher](#pusher)
  - [Interfaces](#interfaces)
    - [EventType](#eventtype)
    - [IByDay](#ibyday)
    - [ICoffeeMachine](#icoffeemachine)
    - [ICoffeeMachineVendor](#icoffeemachinevendor)
    - [ICoffeeMachineModel](#icoffeemachinemodel)
    - [IBusinessUnit](#ibusinessunit)
    - [IError](#ierror)
    - [IRecipe](#irecipe)


## Общая информация

Клиент в заголовках всегда передает:

| Headers                        |
| ------------------------------ |
| accept: application/json       |
| Content-Type: application/json |
| Authorization: Bearer code     |

Bearer токен используется для авторизация пользователя. В случае, если 
пользователь не обладает достаточным количеством прав для просмотра какой-то 
страницы возвращаем ошибку 403. Если пользователь не авторизован - 401

## Params

Фильтры передаются в виде теле (body) запроса в формате JSON.
В качестве ID кофе-машин, передаю именно autoincrement id из БД, не alephId?

interfaces:
EventType

~~~ts
interface Params {
  filters: {
    coffeeMachines: string[] // Массив с AlephID кофе-машин

    dateRange: {
      date: {
        start: string;  // Дата начала в виде строки, например - "17.12.2023"
        end: string;    // Дата конца в виде строки, например - "19.12.2023"
      },
      time: {
        start: string;  // Время начала в виде строки, например "09:00"
        end: string;    // Время окончания в виде строки, например "21:00"
      }
    };

    // Пагинация в таблицах. perPage - количество записей выводимых на одну стра-
    // ницу. activePage - номер текущей страниццы. 
    // perPage - LIMIT
    // activePage - OFFSET
    pagination: {
      perPage: number;
      activePage: number;
    };

    // Порядок в котором выводится информация таблицы
    orderBy: {
      // Ключ поля по которому производится сортировка, например "startDateTime"
      column: string; 
      // Порядок, asc - восходящий, desc - нисходящий.
      order: 'asc' | 'desc';
    };

    beverages: number[]; // Базовый тип напитка. Что это?
    recipes: number[]; // Массив с ID рецептов.
    errors: number[]; // ID ошибок кофе-машин

  }
}

~~~

## Routes

  ### `POST /api/login`

  #### Интерфейсы
  ~~~ts
  // ID поля на котором выводим ошибку
  type InputField = "phone" | "password" | "code" | "password-confirmation";
  // Идентификатор формы. "set-password" отправляет данные на эндпоинт
  // /auth/login
  // Если указан в ответе, то переводим пользователя на следующую в форму с 
  // одним из идентификаторов:
  type Step = 'phone' | 'phone-password' | 'phone-sms-code' | 'set-password';
  // После успешной авторизации, или сразу после завершения регистрации пользо-
  // вателя (установка нового пароля), ожидаем объект с пользовательскими дан-
  // ными
  interface User {
    // Aleph ID пользователя
    "id": string;
    // Полное имя пользователя
    "fullName": string;
    // Насколько я понял, эти два поля объединяем в одно
    // "firstName": string,
    // "lastName": string,
    // Телефон пользователя в формате: 7ХХХХХХХХХХ
    "phone": string;
    "email": string;
    // Часовой пояс пользователя в формате "+03:00". Оффсет относительно UTC, 
    // Обратить внимание на leading zero после +
    // Сейчас приходит в виде "+3", пусть так и будет.
    "utc": string; 
  }
  ~~~

  #### Request:
  ~~~ts
  {
    step: Step; // см. выше
    phone: string;
  } |
  {
    step: Step;
    phone: string;
    password: string;
  } |
  {
    step: Step;
    phone: string;
    code: string; // Код из SMS
  }
  ~~~
  ___
  #### Response с формы "phone":
  ___
  ❌ 404
  ~~~json
  {
    "inputField": "phone",
    "error": "Пользователь с номером +7 (XXX) XXX-XX-XX не найден в системе."
  }
  ~~~
  ❌ 400 - Если номер указан в неправильном формате
  ~~~json
  {
    "inputField": "phone",
    "error": "Неверный формат телефонного номера - +7 (XXX) XXX-XX-XX."
  }
  ~~~
  ✔ 200 - Пользователь отправлял только телефон. Пользователь найден в системе 
  без установленного пароля
  ~~~json
  {
    "inputField": "code",
    "message": "Код с подтверждением отправлен на номер: +7 (XXX) XXX-XX-XX.",
    "nextStep": "phone-sms-code"
  }
  ~~~
  ✔ 200 - Пользователь отправлял только телефон. Пользователь найден в системе. 
  Пароль есть.
  ~~~json
  {
    "inputField": "password",
    "message": "Введите пароль",
    "nextStep": "phone-password"
  }
  ~~~
  
  ___
  #### Response с формы "phone-password":
  ___
  ❌ 401 - Если пользователь указал неверный пароль
  ~~~json
  {
    "inputField": "password",
    "error": "Неверный пароль."
  }
  ~~~
  

  ___
  #### Response с формы "phone-sms-code":
  ___

  ❌ 401 - Если пользователь указал неверный код подтверждения
  ~~~json
  {
    "inputField": "code",
    "error": "Неверный код из SMS."
  }
  ~~~

  ✔ 200 - Пользователь отправлял телефон и код подтверждения. Пользователь 
  найден в системе без установленного пароля. Направляем на регистрацию.
  ~~~json
  {
    "inputField": "code",
    "message": "Код с подтверждением отправлен на номер: +7 (XXX) XXX-XX-XX.",
    "nextStep": "set-password"
  }
  ~~~

  ___
  #### Response с формы "phone-sms-code" или "phone-password":
  ___
  
  ✔ 200 - Пользователь успешно авторизовался в системе.
  ~~~json
  {
    "user": {
      "id": "user-aleph-id",
      "fullName": "",
      "phone": "",
      "email": "",
      "utc": "+03:00"
    },
    "status" true,
    "token": "eyJpdiI6InUvQXgrQlFTVEV0NmJsMUVvWklqMFE9PSIsInZhbHVlIjoidGIzcVZsNktnNnVvcnpESzRvUThOL0ZsWDE1K0hYL255SGpvZ0FDRllRTVhiUSt4R0F0SHNHM1hhQUtaZFpXcTlxRktKTGFsemVQSUNRc2xMdWU0SDYzT0lGdVl5bUVpOHBDWGQ4TFJlSDhXTGRDZ2VNRXZyT3MyN3pweGxUWUoiLCJtYWMiOiJiMTY5ZGJkMzAyNDM1NTdiMmYzOTRhOThlODQ5MTA3Y2RiNzZlOTVjOGJjNzAxZmEzNzZjNjBjMTEwZmE0NWJmIiwidGFnIjoiIn0%3D"
  }
  ~~~

  ### `POST /api/register`
  #### Request:
  ~~~ts
  {
    // Телефон пользователя в формате: 7ХХХХХХХХХХ
    phone: string;
    // Подтверждение пароля (повторный ввод) происходит на стороне клиента 
    // перед отправкой запроса на сервер
    password: string;
  } 
  ~~~
  #### Response:
  ❌ 404 - Если пользователь с таким номером не найден в системе
  ~~~json
  {
    "inputField": "password",
    "error": "Пользователь с номером +7 (XXX) XXX-XX-XX не найден в системе."
  }
  ~~~
  ✔ 200 - Пароль и подтверждение совпали. Пользователь зарегистрирован
  ~~~json
  {
    "user": {
      "id": "user-aleph-id",
      "fullName": "",
      "phone": "",
      "email": "",
      "utc": "+03:00"
    },
    "status" true,
    "token": "eyJpdiI6InUvQXgrQlFTVEV0NmJsMUVvWklqMFE9PSIsInZhbHVlIjoidGIzcVZsNktnNnVvcnpESzRvUThOL0ZsWDE1K0hYL255SGpvZ0FDRllRTVhiUSt4R0F0SHNHM1hhQUtaZFpXcTlxRktKTGFsemVQSUNRc2xMdWU0SDYzT0lGdVl5bUVpOHBDWGQ4TFJlSDhXTGRDZ2VNRXZyT3MyN3pweGxUWUoiLCJtYWMiOiJiMTY5ZGJkMzAyNDM1NTdiMmYzOTRhOThlODQ5MTA3Y2RiNzZlOTVjOGJjNzAxZmEzNzZjNjBjMTEwZmE0NWJmIiwidGFnIjoiIn0%3D"
  }
  ~~~

  ### `POST /api/logout`
  
  #### Info
  Удаляет пользователя из списка авторизованных пользователей в базе данных.

  #### Request
  В Authorization передается Bearer token.

  #### Response
  ✔ 200 - Пользователь успешно авторизовался в системе.
  Ошибки не обрабатываются на клиенте.

  ### `GET /api/entities`

  #### Info:

  **ВАЖНО**: Этот эндпоинт под вопросом. Можно объединить все эндпоинты `/api/entities` в один и запрашивать сразу после авторизации пользователя в системе.

  - [`ICoffeeMachine`](#icoffeemachine)
  - [`ICoffeeMachineModel`](#icoffeemachinemodel)
  - [`ICoffeeMachineVendors`](#icoffeemachinevendors)
  - [`IBusinessUnit`](#ibusinessunit)
  - [`IRecipe`](#irecipe)
  - [`IError`](#ierror)


  #### Request:
  Без дополнительных параметров.

  #### Response:

  ✔ 200
  ~~~ts
  {
    coffeeMachines: ICoffeeMachine[];
    coffeeMachineModels: ICoffeeMachineModel[];
    coffeeMachineVendors: ICoffeeMachineVendors[];
    businessUnits: IBusinessUnit[];
    recipes: IRecipe[];
    errors: IError[];
  }
  ~~~
  #### Пример JSON
  ~~~json
  {
    "coffeeMachines": {
      {
        "id": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
        "modelId": "cea8e96a-c157-11ec-8137-382c4ac698ca",
        "restaurantId": "933e411d-6dea-4ca3-abf6-16acd40498f0",
        "serialNumber": "19157",
        "name": "в отделе IT",
        "createdAt": "2023-12-21 13:40:18",
        "updatedAt": "2024-01-10 16:50:13"
      }
      // ...
    },
    coffeeMachineModels: {
      {
        "id": "cea8e96a-c157-11ec-8137-382c4ac698ca",
        "name": "1500S+",
        "vendorId": "1"
      }
      // ...
    },
    coffeeMachineVendors: {
      {
        "id": "1",
        "name": "WMF"
      }
      // ...
    },
    businessUnits: {
      {
        "id": "933e411d-6dea-4ca3-abf6-16acd40498f0",
        "parentId": "e7d6291d-0b9e-4700-bdb0-17ee4e1b2ba9",
        "name": "Офис IT",
        "type": "1",
        "address": "ул. Хорошевская 32А",
        "lat": "55.75222",
        "lon": "37.61556",
        "chatTelegramId": "-1002133970062"
      }
      // ...
    },
    recipes: {
      {
        "id": "54",
        "name": "Крем-кофе",
        "cupSize": "L"
      }
      // ...
    },
    errors: {
      {
        "id": "116",
        "type": "1d",
        "code": "502",
        "description": "Теплая промывка молочной системы."
      }
      // ...
    }
  }
  ~~~

  ### `POST /api/analytics/trends/header`

  #### Info:

  Используется для содержимого виджетов на всех страницах **Аналитика - Трендовая аналитика**

  #### Request:
  
  JSON в теле (body) запроса: [`Params`](#params)  
  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings

  #### Response:

  ✔ 200

  ~~~ts
  {
    // Все кофе-машинки, которые за выбранный период использовались хотя бы 1 раз.
    workingMachinesCount: number;
    // Всего разлито напитков за выбранный период
    dispensingsTotal: number;
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "workingMachinesCount": 4,
    "dispensingsTotal": 4120
  }
  ~~~

  ### `POST /api/analytics/trends/overview/dispensings-by-day`

  #### Info:

  График **Dispensings by Day** на странице **Аналитика - Трендовая аналитика - Обзор**
  - [`IByDay`](#ibyday)

  #### Request:

  JSON в теле (body) запроса: [`Params`](#params)  
  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings

  #### Response:

  ✔ 200

  ~~~ts
  {
    dispensingsByDay: {
      previousWeek: IByDay;
      currentWeek: IByDay;
    };
  }
  ~~~
  #### Пример JSON
  ~~~json
  {
    "dispensingsByDay": {
      "currentWeek": [13, 50, 32, 40, 35, 17, 28],
      "previousWeek": [17, 43, 47, 45, 26, 25, 23],
    }
  }
  ~~~

  ### `POST /api/analytics/trends/overview/consumptions`

  #### Info:

  График **Consumptions** на странице **Аналитика - Трендовая аналитика - Обзор**

  #### Request:

  JSON в теле (body) запроса: [`Params`](#params)  
  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings

  #### Response:
  ✔ 200
  ~~~ts
  {
    // Расход ингридиентов за выбранный период
    consumptions: {
      water: number;
      milk: number;
      coffee: number;
      chocolate: number;
    }
  }
  ~~~
  #### Пример JSON
  ~~~json
  {
    "consumptions": {
      "water": 506.39,
      "milk": 183.14,
      "coffee": 48.94,
      "chocolate": 1.92,
    }
  }
  ~~~

  ### `POST /api/analytics/trends/overview/cleanings`
  #### Info:
  График **Cleanings** на странице **Аналитика - Трендовая аналитика - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько чисток в среднем проводилось в день.
    cleanings: {
      // На прошлой неделе
      previousWeek: number;
      // На текущей неделе
      currentWeek: number;
    }
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "cleanings": {
      "currentWeek": 0.94,
      "previousWeek": 1.07,
    }
  }
  ~~~

  ### `POST /api/analytics/trends/overview/dispensings-by-hierarchy-level`
  #### Info:
  График **Dispensings by Hierarchy Level** на странице **Аналитика - Трендовая аналитика - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько в среднем было выдач на одну кофе машину по бизнес-юнитам
    // Бизнес-юниты берутся самого высокого ранга но в неединственном числе
    dispensingsPerMachineAverage: { 
      name: string; // Название бизнес-юнита, например - Москва или ЦФО
      value: number; // Среднее количество разливов на одну машинку в этом бизнес-юните
    }[]
  }
  ~~~
  #### Пример JSON
  ~~~json
  {
    "dispensingsPerMachineAverage": [
      { "name": "Москва", "value": 312 },
      { "name": "Санкт-Петербург", "value": 201 },
      { "name": "Воронеж", "value": 48 },
    ]
  }
  ~~~

  ### `POST /api/analytics/trends/sales/dispensings-by-date`
  #### Info:
  График **Dispensings by Date** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько было всего приготовлено напитков в каждую отдельно взятую дату.
    dispensingsByDate: { 
      date: string; // Дата в виде строки, например - "17.12.2023"
      dispensings: number; // Среднее количество разливов на одну машинку в этом бизнес-юните
    }[]
  }
  ~~~
  #### Пример JSON
  ~~~json
  {
    "dispensingsByDate": [
      { "date": "1 ноября 2023",  "dispensings": 159 },
      { "date": "2 ноября 2023",  "dispensings": 175 },
      { "date": "3 ноября 2023",  "dispensings": 122 },
      { "date": "4 ноября 2023",  "dispensings": 133 },
      { "date": "5 ноября 2023",  "dispensings": 102 },
      { "date": "6 ноября 2023",  "dispensings": 142 },
      { "date": "7 ноября 2023",  "dispensings": 143 },
      { "date": "8 ноября 2023",  "dispensings": 125 },
      { "date": "9 ноября 2023",  "dispensings": 149 },
      { "date": "10 ноября 2023", "dispensings": 184 },
      { "date": "11 ноября 2023", "dispensings": 187 },
      { "date": "12 ноября 2023", "dispensings": 188 },
      { "date": "13 ноября 2023", "dispensings": 142 },
      { "date": "14 ноября 2023", "dispensings": 162 },
      { "date": "15 ноября 2023", "dispensings": 164 },
      { "date": "16 ноября 2023", "dispensings": 200 },
      { "date": "17 ноября 2023", "dispensings": 163 },
      { "date": "18 ноября 2023", "dispensings": 130 },
      { "date": "19 ноября 2023", "dispensings": 131 },
      { "date": "20 ноября 2023", "dispensings": 147 },
      { "date": "21 ноября 2023", "dispensings": 149 },
      { "date": "22 ноября 2023", "dispensings": 102 },
      { "date": "23 ноября 2023", "dispensings": 193 },
      { "date": "24 ноября 2023", "dispensings": 166 },
      { "date": "25 ноября 2023", "dispensings": 144 },
      { "date": "26 ноября 2023", "dispensings": 173 },
      { "date": "27 ноября 2023", "dispensings": 197 },
      { "date": "28 ноября 2023", "dispensings": 187 },
      { "date": "29 ноября 2023", "dispensings": 175 },
      { "date": "30 ноября 2023", "dispensings": 181 }
    ]
  }
  ~~~

  ### `POST /api/analytics/trends/sales/dispensings-by-cup-size`
  #### Info:
  График **Dispensings by Cup Size** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько было разлито напитков конкретного размера за выбранный период
    dispensingsByCupSize: { 
      cupSize: "S" | "M" | "L"; // Размер чашки
      dispensings: number; // Всего напитков разлито этого размера
    }[]
  }
  ~~~
  #### Пример JSON
  ~~~json
  {
    "dispensingsByCupSize": [
      { "cupSize": "S", "dispensings": 315 },
      { "cupSize": "M", "dispensings": 200 },
      { "cupSize": "L", "dispensings": 146 }
    ]
  }
  ~~~

  ### `POST /api/analytics/trends/sales/dispensings-by-recipe`
  #### Info:
  График **Dispensings by Recipe** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько было разлито напитков каждого рецепта
    dispensingsByRecipe: { 
      recipe: string; // Название рецепта, например - "Американо 200мл"
      dispensings: number; // Всего напитков этого рецепта
    }[]
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "dispensingsByRecipe": [
      { "recipe": "Американо 200мл", "dispensings": 315 },
      { "recipe": "Капучино 400мл", "dispensings": 280 },
      { "recipe": "Капучино 200мл", "dispensings": 245 },
      { "recipe": "Латте 400мл", "dispensings": 200 },
      { "recipe": "Эспрессо 20мл", "dispensings": 146 },
      { "recipe": "Эспрессо 40мл", "dispensings": 99 }
    ]
  }
  ~~~

  ### `POST /api/analytics/trends/sales/dispensings-by-weekday-and-time`
  #### Info:
  График **Dispensings by Weekday and Time** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько было разлито напитков в каждый отдельный день недели по часам за
    // выбранный период 
    dispensings: { 
      // Каждый день недели в виде массива длиной в 24 числа.
      // По индексу 0 - напитки выданный в период с 0:00 - 0:59:59
      // По индексу 1 - напитки выданный в период с 1:00 - 1:59:59
      // ...
      // По индексу 23 - напитки выданный в период с 23:00 - 23:59:59
      mon: number[]; 
      tue: number[]; 
      wed: number[]; 
      thu: number[]; 
      fri: number[]; 
      sat: number[]; 
      sun: number[]; 
    }
  }
  ~~~
  #### Пример JSON
  ~~~json
  {
    "dispensings": {
      "mon": [13, 20, 35, 22, 35, 20, 40, 12, 47, 42, 10, 12, 22, 27, 14, 50, 16, 34, 33, 7	, 20, 28, 43, 31],
      "tue": [38, 35, 26, 26, 45, 40, 24, 44, 15, 50, 47, 44, 17, 45, 35, 12, 41, 7	, 43, 5	, 31, 5	, 12, 50],
      "wed": [15, 7	, 17, 35, 21, 50, 24, 28, 37, 10, 26, 50, 33, 38, 46, 48, 9	, 25, 37, 25, 50, 45, 48, 8],
      "thu": [21, 38, 47, 6, 11, 11, 34, 21, 41, 49, 10, 39, 49, 11, 43, 15, 10, 38, 47, 7, 9, 18, 32, 44],
      "fri": [48, 35, 47, 34, 44, 35, 44, 21, 30, 37, 28, 15, 18, 6, 22, 8, 28, 38, 23, 40, 21, 32, 9, 32],
      "sat": [22, 33, 13, 6, 15, 38, 18, 31, 29, 26, 18, 36, 16, 16, 21, 30, 46, 39, 29, 14, 9, 39, 8, 14],
      "sun": [49, 5, 49, 15, 8, 7, 33, 41, 34, 31, 34, 12, 34, 38, 45, 6, 36, 50, 41, 20, 35, 26, 23, 11],
    },
  }
  ~~~

  ### `POST /api/analytics/trends/sales/dispensings-previous-vs-current`
  #### Info:
  График **Неделя к неделе** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько напитков было всего разлито на текущей и на предыдущей неделе
    dispensingsByWeek: { 
      previous: number; // Всего напитков на прошлой неделе
      current: number; // Всего напитков на текущей неделе
    }
  }
  ~~~
  #### Пример JSON
  ~~~json
  {
    "dispensingsByWeek": {
      "previous": 223,
      "current": 527,
    },
  }
  ~~~

  ### `POST /api/analytics/trends/sales/dispensings-by-path`
  #### Info:
  График **Напитки по бизнес-юнитам** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько напитков было всего разлито за выбранной период в каждом 
    // отдельном бизнес-юните.
    // Бизнес-юниты берутся самого высокого ранга но в неединственном числе
    dispensingsByPath: { 
      name: string; // Название бизнес-юнита, например "Москва" или "ЦФО"
      dispensings: number; // Всего напитков разлито в этом юните.
    }[]
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "dispensingsByPath": [
      { "name": "Москва", "dispensings": 360 },
      { "name": "Санкт-Петербург", "dispensings": 270 }
    ]
  }
  ~~~


  ### `POST /api/analytics/dayly-reports/dispensings-by-restaurant`
  #### Info:
  График **Напитки по ресторанам** на странице **Аналитика - Ежедневные отчеты**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько напитков было разлито в каждом отдельно взятом ресторане за 
    // выбранный период
    dispensingsByRestaurant: { 
      name: string; // Название ресторана, например "Бургер-РУС 3276"
      dispensings: number; // Всего напитков разлито в этом ресторане.
    }[]
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "dispensingsByRestaurant": [
      { "name": "Бургер-РУС 3276", "dispensings": 848 },
      { "name": "Бургер-РУС 2000", "dispensings": 700 },
      { "name": "Бургер-РУС 1723", "dispensings": 403 },
      { "name": "Бургер-РУС 1313", "dispensings": 710 },
      { "name": "Бургер-РУС 1400", "dispensings": 560 },
      { "name": "Бургер-РУС 1500", "dispensings": 320 },
      { "name": "Бургер-РУС 3276", "dispensings": 848 },
      { "name": "Бургер-РУС 2000", "dispensings": 700 },
      { "name": "Бургер-РУС 1723", "dispensings": 403 },
      { "name": "Бургер-РУС 1313", "dispensings": 710 },
      { "name": "Бургер-РУС 1400", "dispensings": 560 },
      { "name": "Бургер-РУС 1500", "dispensings": 320 }
    ]
  }
  ~~~

  ### `POST /api/analytics/dayly-reports/cleanings-by-restaurant`
  #### Info:
  График **Соблюдение правил чистки ресторанами** на странице **Аналитика - Ежедневные отчеты**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько в среднем 
    cleaningsByRestaurant: { 
      name: string; // Название ресторана, например "Бургер-РУС 3276"
      cleanings: number; // Всего напитков разлито в этом ресторане.
    }[]
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "cleaningsByRestaurant": [
      { "name": "Бургер-РУС 3276", "cleanings":  0.95 },
      { "name": "Бургер-РУС 2000", "cleanings":  0.45 },
      { "name": "Бургер-РУС 1723", "cleanings":  0.4  },
      { "name": "Бургер-РУС 1313", "cleanings":  0.2  },
      { "name": "Бургер-РУС 1400", "cleanings":  0.56 },
      { "name": "Бургер-РУС 1500", "cleanings":  1.20 }
    ]
  }
  ~~~

  ### `POST /api/analytics/dayly-reports/dispensings-by-hour`
  #### Info:
  График **Напитки по часам** на странице **Аналитика - Ежедневные отчеты**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Массив с напитками
    dispensingsByHour: { 
      hour: string; // Час в виде 2-значной строки 00-23, например "07" или "21"
      dispensings: number; // Сколько напитков было отдано в этот час.
    }[]
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "dispensingsByHour": [
      { "hour": "00", "dispensings": 7 },
      { "hour": "01", "dispensings": 13 },
      { "hour": "02", "dispensings": 12 },
      { "hour": "03", "dispensings": 23 },
      { "hour": "04", "dispensings": 4 },
      { "hour": "05", "dispensings": 11 },
      { "hour": "06", "dispensings": 16 },
      { "hour": "07", "dispensings": 7 },
      { "hour": "08", "dispensings": 4 },
      { "hour": "09", "dispensings": 15 },
      { "hour": "10", "dispensings": 16 },
      { "hour": "11", "dispensings": 30 },
      { "hour": "12", "dispensings": 24 },
      { "hour": "13", "dispensings": 17 },
      { "hour": "14", "dispensings": 21 },
      { "hour": "15", "dispensings": 40 },
      { "hour": "16", "dispensings": 15 },
      { "hour": "17", "dispensings": 16 },
      { "hour": "18", "dispensings": 30 },
      { "hour": "19", "dispensings": 24 },
      { "hour": "20", "dispensings": 17 },
      { "hour": "21", "dispensings": 21 },
      { "hour": "22", "dispensings": 40 },
      { "hour": "23", "dispensings": 32 }
    ]
  }
  ~~~

  ### `POST /api/analytics/dayly-reports/dispensings-by-weekday`
  #### Info:
  График **Напитки по дням** на странице **Аналитика - Ежедневные отчеты**
  - [`IByDay`](#ibyday)  
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // День недели - число
    dispensingsByWeekday: IByDay;
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "dispensingsByWeekday": {
      "mon": 246,
      "tue": 217,
      "wed": 310,
      "thu": 280,
      "fri": 190,
      "sat": 256,
      "sun": 263
    }
  }
  ~~~

  ### `POST /api/analytics/dayly-reports/dispensings-by-recipe`
  #### Info:
  График **Напитки по рецептам** на странице **Аналитика - Ежедневные отчеты**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // День недели - число
    dispensingsByRecipe: {
      recipe: string; // Название рецепта
      dispensings: number; // Всего разливов      
    }[]
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "dispensingsByRecipe": [
      { "recipe": "Американо 200мл", "dispensings": 513 },
      { "recipe": "Капучино 200мл", "dispensings": 217 },
      { "recipe": "Капучино 200мл", "dispensings": 310 },
      { "recipe": "Капучино 200мл", "dispensings": 280 },
      { "recipe": "Капучино 200мл", "dispensings": 190 },
      { "recipe": "Капучино 200мл", "dispensings": 256 },
      { "recipe": "Капучино 200мл", "dispensings": 263 }
    ]
  }
  ~~~

  ### `POST /api/analytics/dayly-reports/dispensings-by-cup-size`
  #### Info:
  График **Напитки по размеру чашки** на странице **Аналитика - Ежедневные отчеты**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // День недели - число
    dispensingsByCupSize: {
      // Тут нужно решить, либо cupSize - это название, либо ID
      cupSize: "S" | "M" | "L";
      dispensings: number; // Всего разливов      
    }[]
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "dispensingsByCupSize": [
      { "cupSize": "Small", "dispensings": 300 },
      { "cupSize": "Medium", "dispensings": 500 },
      { "cupSize": "Large", "dispensings": 200 }
    ]
  }
  ~~~

  ### `POST /api/analytics/data-export/beverages`
  #### Info:
  Таблица на странице **Аналитика - Экспорт данных - Напитки**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  Из `Params` передаю: `coffeeMachines`, `dateRange`, `pagination`, `orderBy`  

  #### Response:
  ✔ 200
  ~~~ts
  {
    pagesTotal: number;
    beverages: { 
      coffeeMachineId: string;
      date: string;
      time: string;
      utc: string; 
      cupSize: "S" | "M" | "L" ;
      total: number;
      recipe: string;
    }[];
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "pagesTotal": 13,
    "beverages": [
      { 
        "coffeeMachineId": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
        "date": "12 января 2024 г.", 
        "time": "12:00", 
        "utc": "+3:00", 
        "cupSize": "M", 
        "total": 10,
        "recipe":	"Эспрессо 20мл	completed"	
      },
      { 
        "coffeeMachineId": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
        "date": "12 января 2024 г.", 
        "time": "12:00", 
        "utc": "+3:00", 
        "cupSize": "M", 
        "total": 8, 
        "recipe": "Латте 300мл	completed"	
      },
      // ...
    ]
  }
  ~~~

  ### `POST /api/analytics/data-export/cleanings`
  #### Info:
  Таблица на странице **Аналитика - Экспорт данных - Напитки**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  Из `Params` передаю: `coffeeMachines`, `dateRange`, `pagination`, `orderBy`  
  
  ~~~
  #### Response:
  ✔ 200
  ~~~ts
  {
    pagesTotal: number;
    cleanings: { 
      coffeeMachineId: string;
      date: string;
      time: string;
      utc: string; 
      total: number;
      planned: number;
      type: string;
    }[];
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "pagesTotal": 10,
    "cleanings": [
      { 
        "coffeeMachineId": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
        "date": "12 января 2024 г.", 
        "time": "00:00", 
        "utc": "+3:00", 
        "total": 10, 
        "planned": 10, 
        "type": "Тип ч." 
      },
      { 
        "coffeeMachineId": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
        "date": "12 января 2024 г.", 
        "time": "00:00", 
        "utc": "+3:00", 
        "total": 8,  
        "planned": 10, 
        "type": "Тип ч." 
      },
      { 
        "coffeeMachineId": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
        "date": "12 января 2024 г.", 
        "time": "00:00", 
        "utc": "+3:00", 
        "total": 7,  
        "planned": 10, 
        "type": "Тип ч." 
      },
      // ...
    ]
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-by-hour`
  #### Info:
  График **Простои к/м по часам** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Ошибки на прошлой и текущей неделе по часам.
    downtimeByHour: {
      // По индексу 0 - ошибки в период с 0:00 - 0:59:59
      // По индексу 1 - ошибки в период с 1:00 - 1:59:59
      // ...
      // По индексу 23 - ошибки в период с 23:00 - 23:59:59
      previousWeek: number[];
      currentWeek: number[];
    }
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "downtimeByHour": {
      "previousWeek": [0.29,0.34,0.1,1,1.2,0.45,0.13,0.47,0.22,0.05,0.9,0.36,0.2,0.71,0.8,0.05,0.9,0.36,0.2,0.71,0.8],
      "currentWeek": [0.5,0.6,0.2,1,0.3,0.4,0.45,0.15,0.7,0.8,0.32,0.17,0.26,0.37,0.40,0.05,0.9,0.36,0.2,0.71,0.8],
    }
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-causes`
  #### Info:
  График **Причины простоев** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    downtimeCauses: {
      cause: string; // Причина простоя
      time: number; // Время простоя в секундах
    }[];
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "downtimeCauses": [
      { "cause": "поломка", "time": 26 },
      { "cause": "обслуживание", "time": 74 },
    ]
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-errors`
  #### Info:
  График **Наиболее популярные ошибки** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    downtimeErrors: {
      cause: string; // Название ошибки
      time: number; // Время простоя в секундах
    }[];
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "downtimeErrors": [
      { "cause": "1", "time": 315 },
      { "cause": "-1", "time": 280 },
      { "cause": "7", "time": 245 },
      { "cause": "65", "time": 200 },
      { "cause": "13", "time": 146 },
      { "cause": "44", "time": 99 }
    ]
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-by-weekday`
  #### Info:
  График **Простои к/м по дням** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    downtimeByWeekday: {
      mon: number; // Время простоя в секундах
      tue: number;
      wed: number;
      thu: number;
      fri: number;
      sat: number;
      sun: number;
    };
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "downtimeByWeekday": {
      "mon": [13, 20, 35, 22, 35, 20, 40, 12, 47, 42, 10, 12, 22, 27, 14, 50, 16, 34, 33, 7	, 20, 28, 43, 31],
      "tue": [38, 35, 26, 26, 45, 40, 24, 44, 15, 50, 47, 44, 17, 45, 35, 12, 41, 7	, 43, 5	, 31, 5	, 12, 50],
      "wed": [15, 7	, 17, 35, 21, 50, 24, 28, 37, 10, 26, 50, 33, 38, 46, 48, 9	, 25, 37, 25, 50, 45, 48, 8],
      "thu": [21, 38, 47, 6, 11, 11, 34, 21, 41, 49, 10, 39, 49, 11, 43, 15, 10, 38, 47, 7, 9, 18, 32, 44],
      "fri": [48, 35, 47, 34, 44, 35, 44, 21, 30, 37, 28, 15, 18, 6, 22, 8, 28, 38, 23, 40, 21, 32, 9, 32],
      "sat": [22, 33, 13, 6, 15, 38, 18, 31, 29, 26, 18, 36, 16, 16, 21, 30, 46, 39, 29, 14, 9, 39, 8, 14],
      "sun": [49, 5, 49, 15, 8, 7, 33, 41, 34, 31, 34, 12, 34, 38, 45, 6, 36, 50, 41, 20, 35, 26, 23, 11]
    }
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-by-week`
  #### Info:
  График **Неделя к неделе** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    downtimeByWeek: {
      previous: number; // Время простоя в секундах
      current: number; // Время простоя в секундах
    };
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "downtimeByWeek": {
      "current": 250,
      "previous": 223
    }
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-by-buisness-unit`
  #### Info:
  График **По бизнес юнитам** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    downtimeByBuisnessUnit: {
      name: string; // Название бизнес-юнита
      downtime: number; // Время простоя в секундах
    }[];
  }
  ~~~
  #### Пример JSON
  ~~~json
  {
    "downtimeByBuisnessUnit": [
      { "name": "Москва", "downtime": 365 },
      { "name": "Санкт-Петербург", "downtime": 275 },
      { "name": "Воронеж", "downtime": 700 }
    ]
  }
  ~~~

  ### `POST /api/maintenance/data-export/time`

  #### Info:
  Страница **Состояние оборудования - Экспорт данных - Время**

  #### Request:
  Из `Params` передаю: `coffeeMachines`, `dateRange`, `pagination`, `orderBy`  

  #### Response:
  ✔ 200
  ~~~ts
  {
    pagesTotal: number;
    time: {
      coffeeMachineId: string;
      date: string;
      time: string;
      utc: string;
      uptimeFrom: string;
      downtimeByBreakdown: string;
      downtimeByService: string;
      timeTotal: string;
    }[];
  }
  ~~~
  #### Пример JSON
  ~~~json
  {
    "pagesTotal": 8,
    "time": [
      {
        "coffeeMachineId": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
        "date": "12 января 2024 г.",
        "time": "00:00",
        "utc": "+3:00",
        "uptimeFrom": "04.12.2023",
        "downtimeByBreakdown": "",
        "downtimeByService": "",
        "timeTotal": ""
      },
      {
        "coffeeMachineId": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
        "date": "12 января 2024 г.",
        "time": "00:00",
        "utc": "+3:00",
        "uptimeFrom": "04.12.2023",
        "downtimeByBreakdown": "",
        "downtimeByService": "",
        "timeTotal": ""
      },
      // ...
    ]
  }
  ~~~

  ### `POST /api/maintenance/data-export/events`

  #### Info:
  Страница **Состояние оборудования - Экспорт данных - События**

  #### Request:
  Из `Params` передаю: `coffeeMachines`, `dateRange`, `pagination`, `orderBy`  

  #### Response:
  ✔ 200
  ~~~ts
  {
    pagesTotal: number;
    events: {
      coffeeMachineId: string;
      errorCode: string;
      errorDesc: string;
      date: string;
      time: string;
      utc: string;
      duration: string;
    }[];
  }
  ~~~

  #### Пример JSON
  ~~~json
  {
    "pagesTotal": 24,
    "events": [
      {
        "coffeeMachineId": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
        "errorCode": "9664",
        "errorDesc": "Уборка отменена. Машину необходимо перезапустить. Пожалуйста подвердите что-нибудь и скажите, что должно еще быть в тексте ошибки.",
        "date": "12 января 2024 г.",
        "time": "00:00",
        "utc": "+3:00",
        "duration": "13 дней, 5ч."
      },
      {
        "coffeeMachineId": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
        "errorCode": "9664",
        "errorDesc": "Уборка отменена. Машину необходимо перезапустить. Пожалуйста подвердите что-нибудь и скажите, что должно еще быть в тексте ошибки.",
        "date": "12 января 2024 г.",
        "time": "00:00",
        "utc": "+3:00",
        "duration": "13 дней, 5ч."
      },
      // ...
    ]
  }
  ~~~
  
  ### `GET /api/modal-box/orders`
  #### Info:
  Страница **Модальное окно - карточка кофе-машинки** Заказы / Наряды
  #### Request
  **`Aleph ID`** кофе-машинки указывается в адресной строке через слэш:  
  `/api/modal-box/orders/4NfMx-6huNY-3GmU1-KH3Y5-uvbMH`  

  Query Search Params: 
  PageNumber - Номер Страницы
  PageSize - Размер Страницы
  DateFrom - Дата с которой запрашиваю заявки

  #### Response
  Пример JSON
  ~~~json
  {
    "PageCount": 1,
    "PageNumber": 0,
    "Orders": [
      {
        "OrderDate": "2023-12-26",
        "OrderNumber": "777-066505",
        "Status": "Учтен",
        "ServiceReason": "ПОДКЛЮЧИТЬ ХОЛОДИЛЬНИК К  КОФЕ МАШИНЕ, ПРИВЕЗЛИ НОВЫЙ | ПОДКЛЮЧИТЬ ХОЛОДИЛЬНИК К  КОФЕ МАШИНЕ, ПРИВЕЗЛИ НОВЫЙ",
        "PlanDate": "2023-12-27",
        "Technician": "Иванов Станислав Васильевич",
        "Working": true,
        "Report": "Монтаж, проверкс"
      }
    ]
  }
  ~~~


  ### `GET /api/modal-box/spare-parts`
  #### Info:
  #### Request
  #### Response

  ### `POST /api/modal-box/events-history`
  #### Info:
  Страница **Модальное окно - карточка кофе-машинки** (открывается на любой странице)
  #### Request:
  #### Response:
  ~~~ts
  {
    eventsHistory: {
      // Код ошибки кофе-машины
      errorCode: string;
      // Описание ошибки кофе-машины
      errorDesc: string;
      // Время (Я не знаю, какое отвечает за что, так называются поля в таблице 
      // в макете). Формат - "20.06.2023 14:44"
      datetime: string;
      utc: string;
      // Продолжительность этой ошибки в формате "29 дней, 8ч"
      duration: string;
    }[];
  }
  ~~~
  #### Пример JSON
  ~~~json
  {
    "eventsHistory": [
      { 
        "errorCode": "69",
        "errorDesc": "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        "datetime": "20.06.2023 14:44",
        "utc": "20.06.2023 14:44",
        "duration": "29 дней, 8ч"
      },
      { 
        "errorCode": "69",
        "errorDesc": "Уборка отменена. Машину необходимо перезапустить. Пожалуйста, подтвердите.",
        "datetime": "20.06.2023 14:44",
        "utc": "20.06.2023 14:44",
        "duration": "29 дней, 8ч"
      },
      // ...
    ]
  }
  ~~~

  ### `POST /api/modal-box/maintenance`
  Сервисное обслуживание
  ### `POST /api/modal-box/spare-parts`
  Замена запчастей.

  ### `POST /api/administration/company-structure`
  #### Info: 
  Раздел **Администрирование - Структура Компании**
  #### Request:
  #### Response:
  ~~~ts
  {
    users: {
      // Aleph ID пользователя
      id: string;
      // Имя пользователя в любом формате. Как укажут, т.е. хоть:
      // Иван
      // Иванов Иван
      // Иванов Иван Иванович
      fullName: string;
      // Телефон пользователя в формате 79123456789
      phone: string;
      // Почта пользователя
      email: string;
      // Время относительно универсального координационного в формате - "+07:00"
      utc: string;
      // Aleph ID всех бизнес-юнитов, к которым есть доступ у пользователя
      // Тут в списке может быть, как отдельный ресторан, так и структура более
      // высокого уровня.
      businessUnitsIds: string[];
    }[];
  }
  ~~~
  #### Пример JSON:
  ~~~json
  {
    "users": [
      {
        "id": "c0ce5b56-3f35-4d80-a799-e64d49a21328",
        "fullName": "Иван Иванов",
        "phone": "79123456789",
        "email": "ivan.ivanov@example.com",
        "utc": "+07:00",
        "businessUnitsIds": [
          "933e411d-6dea-4ca3-abf6-16acd40498f0",
          "772b661e-e3bd-4c86-91b8-25f9aba79307",
        ],
      },
      {
        "id": "246dfd0a-ac6b-4f0d-b38d-99e685c8183c",
        "fullName": "Екатерина Смирнова",
        "phone": "79234567890",
        "email": "ekaterina.smirnova@example.com",
        "utc": "+10:00",
        "businessUnitsIds": [
          "c0ce5b56-3f35-4d80-a799-e64d49a2f6fd",
          "246dfd0a-ac6b-4f0d-b38d-99e685c88c21",
        ],
      },
      // ...
    ]
  }
  ~~~

  ### `POST /api/administration/company-structure/remove-user`
  #### Info: 
  Раздел **Администрирование - Структура Компании**
  Закрывает пользователю доступ к конкретному бизнес-юниту.
  **Не удаляет пользователя!** 
  #### Request:
  ~~~ts
  {
    // ID пользователя, у которого нужно отозвать доступ
    userId: string;
    // ID бизнес-юнита, который нужно запретить
    businessUnitId: string;
  }
  ~~~
  #### Response:
  ✔ 200 - После успешной модификации, вернуть обновленный список пользователей.
  ~~~ts
  {
    users: {
      // Aleph ID пользователя
      id: string;
      // Имя пользователя в любом формате. Как укажут, т.е. хоть:
      // Иван
      // Иванов Иван
      // Иванов Иван Иванович
      fullName: string;
      // Телефон пользователя в формате 79123456789
      phone: string;
      // Почта пользователя
      email: string;
      // Время относительно универсального координационного в формате - "+07:00"
      utc: string;
      // Aleph ID всех бизнес-юнитов, к которым есть доступ у пользователя
      // Тут в списке может быть, как отдельный ресторан, так и структура более
      // высокого уровня.
      businessUnitsIds: string[];
    }[];
  }
  ~~~
  ❌ 400 - Если HTTP запрос сформирован неправильно
  ~~~ts
  {
    message: "Ошибка запроса"
  }
  ~~~
  ❌ 404 - Пользователь или бизнес-юнит не найден
  ~~~ts
  {
    message: 
      "Пользователь c ID ... не найден в системе" | 
      "Бизнес-юнит с ID ... не найден в системе"
  }
  ~~~
  #### Пример JSON:
  ~~~json
  {
    "users": [
      {
        "id": "c0ce5b56-3f35-4d80-a799-e64d49a21328",
        "fullName": "Иван Иванов",
        "phone": "79123456789",
        "email": "ivan.ivanov@example.com",
        "utc": "+07:00",
        "businessUnitsIds": [
          "933e411d-6dea-4ca3-abf6-16acd40498f0",
          "772b661e-e3bd-4c86-91b8-25f9aba79307",
        ],
      },
      {
        "id": "246dfd0a-ac6b-4f0d-b38d-99e685c8183c",
        "fullName": "Екатерина Смирнова",
        "phone": "79234567890",
        "email": "ekaterina.smirnova@example.com",
        "utc": "+10:00",
        "businessUnitsIds": [
          "c0ce5b56-3f35-4d80-a799-e64d49a2f6fd",
          "246dfd0a-ac6b-4f0d-b38d-99e685c88c21",
        ],
      },
      // ...
    ]
  }
  ~~~

  ### `POST /api/administration/company-structure/add-user`
  #### Info: 
  Раздел **Администрирование - Структура Компании**
  Выдает указанному пользователю доступ к конкретному бизнес-юниту.
  **Не создает нового пользователя!**  За это отвечает другой эндпоинт - 
  *create-user*
  #### Request:
  ~~~ts
  {
    // ID пользователя, которому нужно выдать доступ
    userId: string;
    // ID бизнес-юнита, на который нужно выдать доступ
    businessUnitId: string;
  }
  ~~~
  #### Response:
  ✔ 200 - После успешной модификации, вернуть обновленный список пользователей.
  ~~~ts
  {
    users: {
      // Aleph ID пользователя
      id: string;
      // Имя пользователя в любом формате. Как укажут, т.е. хоть:
      // Иван
      // Иванов Иван
      // Иванов Иван Иванович
      fullName: string;
      // Телефон пользователя в формате 79123456789
      phone: string;
      // Почта пользователя
      email: string;
      // Время относительно универсального координационного в формате - "+07:00"
      utc: string;
      // Aleph ID всех бизнес-юнитов, к которым есть доступ у пользователя
      // Тут в списке может быть, как отдельный ресторан, так и структура более
      // высокого уровня.
      businessUnitsIds: string[];
    }[];
  }
  ~~~
  ❌ 400 - Если HTTP запрос сформирован неправильно
  ~~~ts
  {
    message: "Ошибка запроса"
  }
  ~~~
  ❌ 404 - Пользователь или бизнес-юнит не найден
  ~~~ts
  {
    message: 
      "Пользователь c ID ... не найден в системе" | 
      "Бизнес-юнит с ID ... не найден в системе"
  }
  ~~~
  #### Пример JSON:
  ~~~json
  {
    "users": [
      {
        "id": "c0ce5b56-3f35-4d80-a799-e64d49a21328",
        "fullName": "Иван Иванов",
        "phone": "79123456789",
        "email": "ivan.ivanov@example.com",
        "utc": "+07:00",
        "businessUnitsIds": [
          "933e411d-6dea-4ca3-abf6-16acd40498f0",
          "772b661e-e3bd-4c86-91b8-25f9aba79307",
        ],
      },
      {
        "id": "246dfd0a-ac6b-4f0d-b38d-99e685c8183c",
        "fullName": "Екатерина Смирнова",
        "phone": "79234567890",
        "email": "ekaterina.smirnova@example.com",
        "utc": "+10:00",
        "businessUnitsIds": [
          "c0ce5b56-3f35-4d80-a799-e64d49a2f6fd",
          "246dfd0a-ac6b-4f0d-b38d-99e685c88c21",
        ],
      },
      // ...
    ]
  }
  ~~~

  ### `POST /api/administration/company-structure/create-user`
  #### Info: 
  Раздел **Администрирование - Структура Компании**
  Создает нового пользователя в системе
  #### Request:
  ~~~ts
  /**
   * У пользователя существуют другие поля, такие как email, utc, avatar и т.д.
   * Но с этой страницы, при создании назначаются только два поля: телефон и 
   * имя пользователя (на момент написания документации).
   */
  {
    // Имя пользователя в любом формате. Как укажут, т.е. хоть:
    // Иван
    // Иванов Иван
    // Иванов Иван Иванович
    fullName: string;
    // Телефон пользователя в формате 79123456789
    phone: string;
  }
  ~~~
  #### Response
  ✔ 200 - После успешного создания нового пользователя, вернуть обновленный 
  список всех пользователей (который доступны авторизованному пользователю).
  ~~~ts
  {
    users: {
      // Aleph ID пользователя
      id: string;
      // Имя пользователя в любом формате. Как укажут, т.е. хоть:
      // Иван
      // Иванов Иван
      // Иванов Иван Иванович
      fullName: string;
      // Телефон пользователя в формате 79123456789
      phone: string;
      // Почта пользователя
      email: string;
      // Время относительно универсального координационного в формате - "+07:00"
      utc: string;
      // Aleph ID всех бизнес-юнитов, к которым есть доступ у пользователя
      // Тут в списке может быть, как отдельный ресторан, так и структура более
      // высокого уровня.
      businessUnitsIds: string[];
    }[];
  }
  ~~~
  ❌ 400 - Если HTTP запрос сформирован неправильно
  ~~~ts
  {
    message: "Ошибка запроса"
  }
  ~~~
  #### Пример JSON:
  ~~~json
  {
    "users": [
      {
        "id": "c0ce5b56-3f35-4d80-a799-e64d49a21328",
        "fullName": "Иван Иванов",
        "phone": "79123456789",
        "email": "ivan.ivanov@example.com",
        "utc": "+07:00",
        "businessUnitsIds": [
          "933e411d-6dea-4ca3-abf6-16acd40498f0",
          "772b661e-e3bd-4c86-91b8-25f9aba79307",
        ],
      },
      {
        "id": "246dfd0a-ac6b-4f0d-b38d-99e685c8183c",
        "fullName": "Екатерина Смирнова",
        "phone": "79234567890",
        "email": "ekaterina.smirnova@example.com",
        "utc": "+10:00",
        "businessUnitsIds": [
          "c0ce5b56-3f35-4d80-a799-e64d49a2f6fd",
          "246dfd0a-ac6b-4f0d-b38d-99e685c88c21",
        ],
      },
      // ...
    ]
  }
  ~~~

  ### `GET /api/profile`
  #### Info: 
  Все страницы. Запрашивается при первой загрузке приложения. Полная информация 
  для страницы **Мой профиль**.
  #### Request:
  Как и на практически все другие страницы в заголовках передается Bearer token.
  #### Response
  ~~~ts
  {
    // Имя пользователя в любом формате. Как укажут, т.е. хоть:
    // Иван
    // Иванов Иван
    // Иванов Иван Иванович
    fullName: string,
    // Почта пользователя
    email: string,
    // Телефон пользователя в формате 79123456789
    phone: string,
    // Название организации, например - "ООО ВымпелКом"
    org: string,
    // Изображение, закодированное в Base64
    // Например - 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA ... '
    // И так далее, это очень длинная строка. Мы вроде решили в таком виде
    // хранить изображения в базе данных
    avatar: string,
    // Оффсет относительно универсального координационного времени
    // Например - "+03:00" для Москвы
    utc: string,
  }
  ~~~

  ### `POST /api/profile/update`
  #### Info: 
  Страница **Мой профиль**. Позволяет изменить какие-то данные о пользователе.
  В случае если пользователь заправшивает изменение почты или телефонного номера,
  необходимо выполнить двойное подтверждение. Отправить один код подтверждения
  на старый телефон/почту и другой код подтверждения на новый телефон/почту.

  #### Request:
  Как и на практически все другие страницы в заголовках передается Bearer token.
  Именно по этому токену и определяем, какого пользователя необходимо 
  модифицировать.

  ~~~ts
  {
    // Присылаю какие-то из этих полей
    // Если отправляю несколько, то обновить тоже необходимо несколько
    fullName: string;
    org: string;
    avatar: string;
    utc: string;
  } | 
  {
    // Новая почта, если код подтверждения верный, нужно будет заменить
    email: string;
    // Код, отправленный на почту для подтверждения
    emailCode: string;
  } |
  {
    // Новый телефон пользователя
    phone: string;
    // SMS, отправленная на старый телефонный номер
    smsCodeOld: string;
    // SMS, отправленная на новый телефонный номер
    smsCodeNew: string;
  }
  ~~~

  #### Response
  ✔ 200 - Пользователь успешно модифицирован. Вернуть обновленного пользователя
  ~~~ts
  {
    // Имя пользователя в любом формате. Как укажут, т.е. хоть:
    // Иван
    // Иванов Иван
    // Иванов Иван Иванович
    fullName: string;
    // Почта пользователя
    email: string;
    // Телефон пользователя в формате 79123456789
    phone: string;
    // Название организации, например - "ООО ВымпелКом"
    org: string;
    // Изображение, закодированное в Base64
    // Например - 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA ... '
    // И так далее, это очень длинная строка. Мы вроде решили в таком виде
    // хранить изображения в базе данных
    avatar: string;
    // Оффсет относительно универсального координационного времени
    // Например - "+03:00" для Москвы
    utc: string;
  }
  ~~~
  ❌ 400 - HTTP запрос не прошел валидацию (например неверный формат телефона)
  ~~~ts
  {
    message: 'Неверный формат телефонного номера - "7XXXXXXXXX" '
  }
  ~~~
  ❌ 404 - Пользователь с таким Bearer-token не найден в системе.
  ~~~ts
  {
    message: 'Пользователь не найден в системе'
  }
  ~~~

  ### `POST /api/profile/change-password`
  #### Info 
  Страница **Мой профиль - Пароль**. Если запрос без SMS-кода, то выслать код
  подтверждения. Если пользователь указывал код подтверждения, то обновить пароль

  #### Request
  ~~~ts
  {
    password: string;
  } |
  {
    password: string;
    smsCode: string;
  }
  ~~~

  #### Response
  ✔ 200 - Если пользователь указывал только пароль, то отправить код с подтвер-
  ждением на номер.
  ~~~ts
  {
    message: "Код с подтверждением отправлен на номер +7 (xxx) xxx-xx-xx"
  }
  ~~~
  ✔ 200 - Если пользователь вместе с паролем отправил код подтверждения. 
  Пароль успешно изменился.
  ~~~ts
  {
    message: "Пароль успешно изменен"
  }
  ~~~
  ✔ 401 - Неверный код подтверждения
  ~~~ts
  {
    message: "Неверный код из SMS."
  }
  ~~~
  ✔ 400 - Недостаточно секьюрный пароль и т.д.
  ~~~ts
  {
    message: "Пароль должен состоять минимум из одного символа"
  }
  ~~~

  ### `POST /api/profile/request-sms-code`
  #### Info: 
  Страница **Мой профиль**. Запрашивает коды подтверждения для изменения теле-
  фонного номера. Должны прийти два разных кода на старый и новый номер пользо-
  вателя.

  #### Request:
  ~~~ts
  {
    // Новый телефонный номер. Старый нужно будет посмотреть в базе данных
    phone: string;
  }
  ~~~
  #### Response
  ✔ 200 - Коды с подтверждением отправлены на указанные номера
  ~~~ts
  {
    // Старый номер
    message1: "Код с подтверждением отправлен на номер +7 (XXX) XXX-XX-XX",
    // Новый номер
    message2: "Код с подтверждением отправлен на номер +7 (XXX) XXX-XX-XX",
  }
  ~~~
  ❌ 500 - Не получилось отправить код (закончился лимит SMS и т.д.)
  ~~~ts
  {
    message: "описание ошибки"
  }
  ~~~
  ❌ 400 - Некорректный формат номера
  ~~~ts
  {
    message: "Ошибка в номере - '+7XXXXXXXXXX' "
  }
  ~~~

  ### `POST /api/profile/request-email-code`
  #### Info: 
  Страница **Мой профиль**. Запрашивает коды подтверждения для изменения почты. 
  Должны прийти два разных кода на старую и новую почту пользователя.

  #### Request:
  ~~~ts
  {
    // Новая почта. Старую почту нужно будет посмотреть в базе данных
    email: string;
  }
  ~~~
  #### Response
  ✔ 200 - Коды с подтверждением отправлены на указанные почтовые ящики
  ~~~ts
  {
    // Новый почтовый ящик
    message: "Код с подтверждением отправлен на почту example2@gmail.com",
  }
  ~~~
  ❌ 500 - Не получилось отправить код (SMTP не работает и т.д.)
  ~~~ts
  {
    message: "описание ошибки"
  }
  ~~~
  ❌ 400 - Некорректный формат почтового ящика
  ~~~ts
  {
    message: "Неправильно указан почтовый ящик - 'example @gmail.com' "
  }
  ~~~

  ### `POST /api/profile/delete-account`
  #### Info: 
  Страница **Мой профиль**. Удаляет аккаунт текущего пользователя
  #### Request:
  Для идентификации пользователя, используется Bearer-token из заголовков
  #### Response
  ✔ 200 - Пользователь успешно удален
  ~~~ts
  {
    message: "Пользователь успешно удален"
  }
  ~~~
  ❌ 404 - Пользователь не найден в системе
  ~~~ts
  {
    message: "Пользователь не найден в системе"
  }
  ~~~

  ### `POST /api/coffee-machine/remote-action`
  #### Info:
  Действия выполняются из карточки кофе-машины.
  #### Request
  Для идентификации пользователя, используется Bearer-token из заголовков
  ~~~ts
  {
    // Aleph ID кофе-машины
    id: string;
    // Действие, которое необходимо выполнить над кофе-машиной
    action: 'shutdown' | 'restart' | 'block';
  }
  ~~~
  #### Response
  ✔ 202 - Команда отправлена
  ❌ 403 - Недостаточно прав для выполнения операции
  ❌ 422 - Запрос некорректный
  ❌ 521 - Запрашиваемая кофе-машина вылкючена
  ~~~ts
  {
    // Aleph ID кофе-машины
    id: string;

    // Команда, которая была отправлена
    action: 'shutdown' | 'restart' | 'block';

    // Модифицированная кофе-машина, над которой проводилась операция
    coffeeMachine: ICoffeeMachine | null;

    // Вместе со статусом ожидаю текст ошибки или сообщение об успешной отправке
    // команды.
    message: "Запрашиваемая кофе-машина выключена";

    // 4 сообщения об успешной операции
    // 'shutdown', 'restart' - Выключается, Перезагружается, 
    // 'block' - Заблокирована, Разрешена
    // Что-то пошло не так
  }
  ~~~

  ### `GET /api/consoledata`
  #### Info:
  #### Request:
  Фильтры: eventTypes, businessUnits
  #### Response:
  ✔ 200
  ~~~ts
  {
    id: string;
    coffeeMachineId: string;
    startDateTime: string;
    duration: string;
    errorCode: string;
    errorText: string;
  }[];
  ~~~

  #### Пример JSON:
  ~~~json
  [
    {
      "id": "655",
      "coffeeMachineId": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
      "startDateTime": "2023-08-23 12:01:43",
      "duration": "8 дней 22 часа",
      "errorCode": "50",
      "errorText": "Неизвестная ошибка"
    },
    // ...
  ]
  ~~~
  
  ### `POST /api/timeerrordown`

  #### Request:
  ~~~ts
  string[];
  ~~~
  Пример JSON:
  ~~~json
  [ "655", "1024", "713" ]
  ~~~
  #### Response:
  ✔ 200
  ~~~ts
  {
    id: number;
    duration: string;
  }[];
  ~~~
  #### Пример JSON:
  ~~~json
  [
    {
      "id": 655,
      "duration": "8 дней 23 часа",
    },
    {
      "id": 1024,
      "duration": "5 мин 14 сек",
    },
    {
      "id": 713,
      "duration": "1 час 21 мин",
    },
  ]
  ~~~
  ### Pusher
  
  ### `POST /api/feedback`
  #### Request
  ~~~ts
  ~~~
  #### Request - Пример JSON
  ~~~json
  ~~~
  #### Response
  ✔ 200
  ~~~ts
  {
    message: "ok"
  }
  ~~~
  ✔ 400
  ~~~ts
  {
    message: "bad request"
  }
  ~~~


## Interfaces

### EventType
~~~ts
type EventType = 'event' | 'info' | 'maintenance' | 'error' | 'tech-info';
~~~

### IByDay
~~~ts
interface IByDay {
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sut: number;
  sun: number;
}
~~~

### ICoffeeMachine
~~~ts
interface ICoffeeMachine {
  id: string; // Aleph id
  modelId: string; // Aleph ID модели
  restaurantId: string; // Aleph ID ресторана
  serialNumber: string;
  name: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}
~~~

### ICoffeeMachineVendor
~~~ts
interface ICoffeeMachineVendor {
  id: string; // ID
  name: string;
}
~~~

### ICoffeeMachineModel
~~~ts
interface ICoffeeMachineModel {
  id: string; // Aleph Id
  name: string;
  vendorId: string;
}
~~~

### IBusinessUnit

~~~ts
enum Type { RESTAURANT: '1', CLIENT: '2', STRUCTURE: '3' }

interface IBusinessUnit {
  id: string;
  parentId: string | null;
  name: string;
  type: Type;
  chatTelegramId: string;

  // Ресторан
  utc?: string; // "+03:00"
  address?: string;
  lat?: string;
  lon?: string;
}
~~~

### IError
~~~ts
interface IError {
  id: string;
  type: string; 
  code: string;
  description: string; 
}
~~~

### IRecipe
~~~ts
interface IRecipe {
  id: string;
  name: string;
  cupSize: "S" | "M" | "L";
}
~~~



