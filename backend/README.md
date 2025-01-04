# Backend API Documentation

## User Routes

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

## Captain Routes

## `/captain/signup` - Captain Registration

### Description

This endpoint is used to register a new captain. It accepts captain information, validates the data, hashes the password, and creates a new user in the database. Upon successful registration, it returns a JWT token for authentication.

### HTTP Method
- **`POST`**: `/captain/signup`

### Required Data (Request Body)
The request body must be a JSON object containing the following fields:

- `fullname` (object):
    - `fisrtname` (string, required): User's first name (min 3 charchater),
    - `lastname` (string, optional): User's last name,
- `email` (string, required): User's email address,
- `password` (string, required): User's password (min 8 char),
- `vehicle` (object):
    - `color` (string, required) : Color of the vehicle (min 3 charchater),
    - `plate` (string, required) : No. of the vehicle (min 3 charchater),
    - `capacity` (string, required) : Capacity of the vehicle (min 3 charchater),
    - `vehicleType` (string, required) : ["car", "motorcycle", "auto],

## `/captain/signin` - Captain Signin

### Description

This endpoint is used to signin captain.Upon successful registration, it returns a JWT token for authentication.

### HTTP Method
- **`POST`**: `/captain/signin`

### Required Data (Request Body)
The request body must be a JSON object containing the following fields:

- `email` (string, required): Captain's email address,
- `password` (string, required): Captain's password (min 8 char),


## `/capatain/profile` - Get User Profile

### Description

This endpoint is used to retrive the profile of currently authenticated capatain.

### HTTP Method
- **`GET`**: `/captain/profile`

### Authentication
Requires a valid JWT token in Authorization header:
`Authorization: Bearer <token>`

### Example Response 
  - `fullname` (object):
    - `fisrtname` (string): User's first name,
    - `lastname` (string): User's last name,
  - `email` (string): User's email address,
  - `vehicle` (object):
      - `color` (string, required) : Color of the vehicle,
      - `plate` (string, required) : No. of the vehicle,
      - `capacity` (string, required) : Capacity of the vehicle,
      - `vehicleType` (string, required) : Type of the vehicle,

## `/capatain/logout` - Logout Captain

### Description

Logout the current captain and blaclist the token provided.


### HTTP Method
- **`GET`**: `/capatain/logout`

### Authentication
Requires a valid JWT token in Authorization header or cookies.