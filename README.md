<h1 align="center">BookShop</h1>

  <p align="center">
    Интернет магазин книг, учебный проект.
    <br />

<!-- ABOUT THE PROJECT -->
# О проекте

На данный момент практически у всех организаций и сервисов есть свои веб-сайты. Многие мобильные приложения имеют свои веб версии. Именно поэтому мне захотелось попробовать свои силы в разработке сайта, который можно подстроить под многие задачи.
 
# Как установить и запустить проект

### Старт
Чтобы запустить проект локально достаточно выполнить эти несложные инструкции.

### Установка

`npm install`  
`npm start`  

Библиотека для роутинга `npm i react-router-dom@5.0.0` -> `npm i --save-dev @types/react-router-dom`

**Заполнить файл application.properties:** 

**spring.datasource.url=jdbc:mysql**
**spring.datasource.driver-class-name=**
**spring.datasource.username**
**spring.datasource.password=**
**spring.jpa.properties.hibernate.dialect**
**spring.data.rest.base-path=/api**

**okta.oauth2.client-id**
**okta.oauth2.issuer=https:**

Примеры заполнения есть на сайте https://www.geeksforgeeks.org/spring-boot-application-properties/

### Регистрация на сайте окта : https://developer.okta.com

`npm install @okta/okta-react@6.4.3`
`npm i @okta/okta-signin-widget@6.3.3`

### Создание базы данных:

**Docker** : docker run --name shop-db -p ****:**** -e MYSQL_ROOT_PASSWORD=******* -d mysql

**Sql-скрипт** https://github.com/helenarrr/BookShop/blob/58ade9d8c6075842062c1c879e919f579e4f39ff/sql/query.sql

## Использование

У сайта есть два варианта использования. Учетка администратора и обычного пользователя.
Можно зарегистрироваться под этими учетками и попробовать функции:

**Обычный пользователь**
Логин: qwGhe@gmail.com
Пароль: 98*jkjHgbnJkjhB

**Админ**
Логин: userUserAdmin@mail.ru
Пароль: 1dsgfjkUnfm8**9

**Страница обычного юзера выглядит так** : 

Есть возможность зайти/выйти, добавлять книги на полку, продлевать и возвращать товары, писать в тех поддержку.

<img width="1212" alt="image" src="https://github.com/helenarrr/BookShop/assets/88209065/e128df54-7596-4f49-95d4-ba3deccaffee">

**Страница админа**: 

Можно управлять товарами, получать сообщения от пользователей и отправлять ответные сообщения. Также можно обращаться в тех. поддержку.

<img width="1210" alt="image" src="https://github.com/helenarrr/BookShop/assets/88209065/5c06440f-7c3a-42a0-b78a-8fdc58090989">


## Контакты
Моя почта - elena.radchenko.9@mail.ru  
Телеграмм - https://t.me/helenarrrrr  
Ссылка на проект - https://github.com/helenarrr/BookShop.git
