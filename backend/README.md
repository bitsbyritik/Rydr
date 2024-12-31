# Backend API Documentation

## `/user/signup` - User Registration

### Description
This endpoint is used to register a new user. It accepts user information, validates the data, hashes the password, and creates a new user in the database. Upon successful registration, it returns a JWT token for authentication.

### HTTP Method
- **POST**: `/user/signup`

### Required Data (Request Body)
The request body must be a JSON object containing the following fields:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "yourpassword123"
}