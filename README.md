# Customer CRUD Application

This project is a Customer CRUD application built with Spring Boot, JPA, and MySQL. It provides a RESTful API for managing customers, including creating, updating, fetching, and deleting customer records. Additionally, it includes JWT authentication for secure access and a sync feature to fetch customer data from a remote API.

## Features

- **Create Customer**: Add a new customer.
- **Update Customer**: Update an existing customer.
- **Get Customer List**: Retrieve a list of customers with pagination, sorting, and search capabilities.
- **Get Customer by ID**: Fetch a single customer by ID.
- **Delete Customer**: Remove a customer from the database.
- **JWT Authentication**: Secure the API endpoints using JWT.
- **Sync Customers**: Fetch and sync customer data from a remote API.

## Technologies Used

- **Backend**: Spring Boot
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **Frontend**: React, Redux, Charka UI

## Getting Started

### Prerequisites

- Java 11 or higher
- Maven
- MySQL

### Setup Instructions

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/customer-crud-app.git
    cd customer-crud-app
    ```

2. **Configure MySQL Database:**

    Create a MySQL database named `customer_db` (or any name of your choice) and update the `application.properties` file with your database details.

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/customer_db
    spring.datasource.username=root
    spring.datasource.password=your_password
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    ```

3. **Install dependencies and build the project:**
- Backend
    `
    mvn clean install
    `
- frontend 
 `
    npm i
    `

4. **Run the application:**
- Frist run tha Backen Server
    `
    mvn spring-boot:run
    `
- Frontend run the application
  `
    mvn spring-boot:run
    `

## API Endpoints

### Authentication

- **Login**: Obtain a JWT token.

    ```http
    POST /login
    ```

    **Request Body:**

    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```

### Customer CRUD Operations

- **Create Customer**

    ```http
    POST /api/customers
    ```

    **Request Body:**

    ```json
    {
        "firstName": "Jane",
        "lastName": "Doe",
        "street": "Elvnu Street",
        "address": "H no 2",
        "city": "Delhi",
        "state": "Delhi",
        "email": "sam@gmail.com",
        "phone": "12345678"
    }
    ```

- **Update Customer**

    ```http
    PUT /api/customers/{id}
    ```

    **Request Body:**

    ```json
    {
        "firstName": "Jane",
        "lastName": "Doe",
        "street": "Elvnu Street",
        "address": "H no 2",
        "city": "Delhi",
        "state": "Delhi",
        "email": "sam@gmail.com",
        "phone": "12345678"
    }
    ```

- **Get Customer List** (with pagination, sorting, and search)

    ```http
    GET /api/customers/list
    ```

    **Query Parameters:**

    - `firstName` (optional): Filter by first name
    - `city` (optional): Filter by city
    - `email` (optional): Filter by email
    - `phone` (optional): Filter by phone
    - `page` (default: 0): Page number
    - `size` (default: 10): Page size
    - `sortBy` (default: "id"): Field to sort by
    - `sortDir` (default: "asc"): Sort direction (asc or desc)

- **Get Customer by ID**

    ```http
    GET /api/customers/{id}
    ```

- **Delete Customer**

    ```http
    DELETE /api/customers/{id}
    ```

### Sync Customers

- **Sync Customers**

    ```http
    POST /sync-customers
    ```

## Sync with Remote API

1. **Authenticate with the Remote API:**

    - Path: `https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp`
    - Method: POST
    - Request Body:

        ```json
        {
            "login_id": "test@sunbasedata.com",
            "password": "Test@123"
        }
        ```

    - Response: Bearer token

2. **Fetch Customer List:**

    - Path: `https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp`
    - Method: GET
    - Parameters: `cmd=get_customer_list`
    - Header: `Authorization: Bearer token_received_in_authentication`

## Demo Video

[Watch the demo video](https://drive.google.com/file/d/1i3j2urOLEefE2yfhsMPxq7uYzODPMJMd/view?usp=drivesdk)


## Sample Frontend 

1.  ***SingUp Page***

![Sinup](https://github.com/user-attachments/assets/a1d564f5-9f10-4607-8c82-f265eb75f77a)

2. ****LogIn Page***
   
![loging](https://github.com/user-attachments/assets/e2818ce6-b1e5-41a6-9985-78df6859f74b)

3. ***Home Page Loading***
   ![Loading](https://github.com/user-attachments/assets/2f081d70-a3c3-43fb-92e5-863e1dca31db)

![dashBoar](https://github.com/user-attachments/assets/e6719dc9-4f4e-45e5-bdf4-746e3da11e57)
4. ***Searching***
![Seacrh](https://github.com/user-attachments/assets/e032f6a0-a6e0-4da8-9e0a-282e6dec672d)
5. ***Add Customer page***
![AddCustomer](https://github.com/user-attachments/assets/e5ed595e-3525-40fe-8528-f36fdea66779)

5. ***Update page***
![Update](https://github.com/user-attachments/assets/0542b11c-85c3-4675-b944-4e0d8859db68)
