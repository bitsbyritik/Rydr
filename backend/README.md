# Backend API Documentation

## `/user/signup` - User Registration

### Description

This endpoint is used to register a new user. It accepts user information, validates the data, hashes the password, and creates a new user in the database. Upon successful registration, it returns a JWT token for authentication.

### HTTP Method
- **`POST`**: `/user/signup`

### Required Data (Request Body)
The request body must be a JSON object containing the following fields:

- `fullname` (object):
    - `fisrtname` (string, required): User's first name (min 3 charchater),
    - `lastname` (string, optional): User's last name,
- `email` (string, required): User's email address,
- `password` (string, required): User's password (min 8 char),


## `/user/signin` - User Signin

### Description

This endpoint is used to signin user.Upon successful registration, it returns a JWT token for authentication.

### HTTP Method
- **`POST`**: `/user/signin`

### Required Data (Request Body)
The request body must be a JSON object containing the following fields:

- `email` (string, required): User's email address,
- `password` (string, required): User's password (min 8 char),


## `/user/profile` - Get User Profile

### Description

This endpoint is used to retrive the profile of currently authenticated user.

### HTTP Method
- **`GET`**: `/user/profile`

### Authentication
Requires a valid JWT token in Authorization header:
`Authorization: Bearer <token>`

### Example Response 
  - `fullname` (object):
    - `fisrtname` (string): User's first name,
    - `lastname` (string): User's last name,
  - `email` (string): User's email address,

## `/user/logout` - Logout User

### Description

Logout the current user and blaclist the token provided.


### HTTP Method
- **`GET`**: `/user/logout`

### Authentication
Requires a valid JWT token in Authorization header or cookies.