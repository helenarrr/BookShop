<h1 align="center">BookShop</h1>

  <p align="center">
    Интернет магазин книг, учебный проект.
    <br />

<!-- ABOUT THE PROJECT -->
# О проекте

На данный момент практически у всех организаций и сервисов есть свои веб-сайты. Многие мобильные приложения имеют свои веб версии. Именно поэтому мне захотелось попробовать свои силы в разработке сайта, который можно подстроить под многие задачи.
 
# Как установить и запустить проект

<!-- GETTING STARTED -->
### Старт
Чтобы запустить проект локально достаточно выполнить эти несложные инструкции.

### Установка

`npx create-react-app client --template typescript`    
`npm install`  
`npm start`  

Библиотека для роутинга [react-router-dom](https://www.npmjs.com/package/react-router-dom/v/5.0.0) -> `npm i react-router-dom@5.0.0` -> `npm i --save-dev @types/react-router-dom`

### Создать Java-проект:
- перейти на [spring.io](https://start.spring.io)
  - Project: Maven
  - Spring Boot  2.7.18, можно более позднюю
  - Project Metadata: 
    - Packaging: Jar
    - Java: 21
  - Dependencies:
    - Spring Data JPA - _сохранение данных в SQL-хранилищах с помощью Java Persistence API с использованием Spring Data и Hibernate_  
    - MySQL Driver - _драйвер JDBC для MySQL_  
    - Lombok - _создание get,set-методов, конструкторов и многое другое_  
    - Rest Repositories - _предоставление доступа к хранилищам данных Spring поверх REST с помощью Spring Data REST_  

### Заполнить файл application.properties: 

##### spring.datasource.url=jdbc:mysql
##### spring.datasource.driver-class-name=
##### spring.datasource.username=
##### spring.datasource.password=
##### spring.jpa.properties.hibernate.dialect=
##### spring.data.rest.base-path=/api

##### okta.oauth2.client-id=
##### okta.oauth2.issuer=https:

Примеры заполнения есть на сайте https://www.geeksforgeeks.org/spring-boot-application-properties/

### Регистрация на сайте окта : 

### Создание базы данных:

- Docker: docker run --name shop-db -p ****:**** -e MYSQL_ROOT_PASSWORD=******* -d mysql

Sql-скрипт 

<!-- USAGE EXAMPLES -->
## Использование


<!-- CONTACT -->
## Контакты
Моя почта - elena.radchenko.9@mail.ru  
Телеграмм - https://t.me/helenarrrrr  
Ссылка на проект - https://github.com/helenarrr/BookShop.git
