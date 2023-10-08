# Tourism API

Welcome to the Tourism API! Discover exciting tours, share your experiences, and manage user profiles through this comprehensive API. Whether you're an adventure seeker, a tour operator, or an administrator, the Tourism API offers a range of functionalities to enhance your journey.

#### **Tours**

Explore a diverse collection of tours, each with its own unique charm and adventure. Retrieve tour details, ratings, and prices, or create, update, and delete tours as a tour operator. Get insights into tour statistics and discover upcoming tours in your desired location.

#### **Reviews**

Share your thoughts and feedback on tours by leaving reviews. The Reviews API enables you to create, update, and delete your reviews, allowing you to express your genuine experiences with other travelers.

#### **Bookings**

Plan your trips with ease by making bookings for your favorite tours. Create bookings, retrieve booking details, and manage your bookings effortlessly. The Bookings API provides the functionality you need to reserve your spot on exciting adventures.

#### **Users**

Connect with fellow travelers, manage your own profile, and enjoy seamless authentication. Sign up to join the Tourism community, log in to access your account, or reset your password if needed. Update your profile details, or choose to deactivate your account.

Explore the Tourism API to make the most of your adventure and connect with like-minded travelers from around the world. Happy exploring!

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Routes](#routes)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## Introduction

Welcome to the Tourism documentation. This API provides various functionalities for managing users, tours, reviews, and more. It offers a wide range of features to create, read, update, and delete data.

## Features

- User authentication and authorization.
- CRUD operations for users, tours, and reviews.
- Advanced querying with sorting, filtering, and pagination.
- Password reset functionality.
- Tour statistics and aggregation.
- Geospatial querying for tours.
- Error handling middleware.
- Route protection and role-based access control.

## Getting Started

### Prerequisites

- Node.js (version v16.16.0)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Olusegun-Light/Tourism-API.git
   cd Tourism-API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `config.env` file with the following variables:

   ```env
   PORT=
   DATABASE=
   DATABASE_PASSWORD=
   DATABASE_USERNAME=
   JWT_SECRET=
   JWT_EXPIRED_IN=
   JWT_COOKIE_EXPIRES_IN=
   EMAIL_USERNAME=
   EMAIL_PASSWORD=
   EMAIL_HOST=
   EMAIL_PORT=
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

## Usage

Once the server is up and running, you can use API endpoints to perform various operations. Refer to the [Routes](#routes) section for details on available endpoints and their functionalities.

## Authentication

Authentication is implemented using JWT (JSON Web Tokens). To access protected routes, you need to sign up or log in to get a JWT token. Include the JWT token in the `Authorization` header as `Bearer [token]` for authorization.

## Routes

- **User Routes:** Manage user accounts, authentication, and profile updates.
- **Tour Routes:** Manage tour information, statistics, and geospatial queries.
- **Review Routes:** Handle reviews associated with tours.
- **Booking Routes:** Create, retrieve, and manage tour bookings.
- **Error Routes:** Middleware for handling errors.

For detailed information about the available routes, refer to the [API Routes Documentation.](#api-usage)

## Error Handling

Errors are effectively handled using custom error classes and middleware.The API returns appropriate error responses based on the nature of the error. Depending on the environment (development or production), error messages and details are returned to the client.

## API Usage

Once the server is up and running, you can use the provided API endpoints to interact with the system. Here are some example API requests:

### User Authentication

- **Sign Up:** Create a new user account.
  `POST /signup`

  Request

  ```json
  {
    "name": "your name",
    "email": "your email",
    "password": "{{password}}",
    "passwordConfirm": "{{password}}"
  }
  ```

  Response

  ```json
  {
    "status": "success",
    "token": "jwt token",
    "data": {
      "user": {
        "photo": "default.jpg",
        "role": "user",
        "active": true,
        "_id": "user is",
        "name": "user name",
        "email": "user_email@gmail.com",
        "__v": 0
      }
    }
  }
  ```

- **Log In:** Log in with existing credentials to get an authentication token.
  `POST /login`

  Request

  ```json
  {
    "email": "user_email@gmail.com",
    "password": "{{password}}"
  }
  ```

  Response

  ```json
  {
    "status": "success",
    "token": "jwt token",
    "data": {
      "user": {
        "photo": "user-1.jpg",
        "role": "admin",
        "_id": "user id",
        "name": "user name",
        "email": "user_gmail@email.com",
        "__v": 0
      }
    }
  }
  ```

- **Log Out:** Log in with existing credentials to get an authentication token.
  `POST /logout`

  Response

  ```json
  {
    "status": "success"
  }
  ```

- **Forgot Password:** Request a password reset token to reset your password.
  `POST /forgotPassword`

  Request

  ```json
  {
    "email": "user_email"
  }
  ```

  Response

  ```json
  {
    "status": "Success",
    "message": "Token sent to email!"
  }
  ```

- **Reset Password:** Use a reset token to set a new password.
  `PATCH /resetPassword/:token`

  Request

  ```json
  {
    "password": "{{password}}",
    "passwordConfirm": "{{password}}"
  }
  ```

  Response

  ```json
  {
    "status": "success"
  }
  ```

### User Profile

- **Get My Profile:** Retrieve the profile of the authenticated user.
  `GET /me`

  Response

  ```json
  {
    "status": "success",
    "data": {
      "data": {
        "photo": "default.jpg",
        "role": "user",
        "_id": "user id",
        "name": "user name",
        "email": "user_email@gmail.com",
        "__v": 0
      }
    }
  }
  ```

- **Update My Profile:** Update the profile details of the authenticated user.
  `PATCH /updateMe`

  Request

  ```json
  {
    "email": "user_new_email@gmail.com"
  }
  ```

  Response

  ```json
  {
    "status": "success",
    "token": "jwt token",
    "data": {
      "user": {
        "photo": "user-1.jpg",
        "role": "user",
        "_id": "user id",
        "name": "user name",
        "email": "user_new_email@gmail.com",
        "__v": 0
      }
    }
  }
  ```

- **Delete My Account:** Deactivate the account of the authenticated user.
  `DELETE /deleteMe`

  Response

  ```json


  ```

### Tours

- **Get All Tours:** Retrieve a list of all available tours.
  `GET /tours`

  Response

  ```json
  {
    "status": "success",
    "results": 10,
    "data": {
      "data": [
        {
          "startLocation": {
            "description": "Miami, USA",
            "type": "Point",
            "coordinates": [-80.185942, 25.774772],
            "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
          },
          "ratingsAverage": 4.8,
          "ratingsQuantity": 6,
          "images": ["tour-2-1.jpg", "tour-2-2.jpg", "tour-2-3.jpg"],
          "startDates": [
            "2021-06-19T09:00:00.000Z",
            "2021-07-20T09:00:00.000Z",
            "2021-08-18T09:00:00.000Z"
          ],
          "_id": "5c88fa8cf4afda39709c2955",
          "name": "The Sea Explorer",
          "duration": 7,
          "maxGroupSize": 15,
          "difficulty": "medium",
          "guides": ["5c8a22c62f8fb814b56fa18b", "5c8a1f4e2f8fb814b56fa185"],
          "price": 497,
          "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
          "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "imageCover": "tour-2-cover.jpg",
          "locations": [
            {
              "_id": "5c88fa8cf4afda39709c2959",
              "description": "Lummus Park Beach",
              "type": "Point",
              "coordinates": [-80.128473, 25.781842],
              "day": 1
            },
            {
              "_id": "5c88fa8cf4afda39709c2958",
              "description": "Islamorada",
              "type": "Point",
              "coordinates": [-80.647885, 24.909047],
              "day": 2
            },
            {
              "_id": "5c88fa8cf4afda39709c2957",
              "description": "Sombrero Beach",
              "type": "Point",
              "coordinates": [-81.0784, 24.707496],
              "day": 3
            },
            {
              "_id": "5c88fa8cf4afda39709c2956",
              "description": "West Key",
              "type": "Point",
              "coordinates": [-81.768719, 24.552242],
              "day": 5
            }
          ]
        }
      ]
    }
  }
  ```

- **Get Tour by ID:** Retrieve detailed information about a specific tour.
  `GET /tours/:id`

  Response

  ```json
  {
    "status": "success",
    "data": {
      "data": {
        "startLocation": {
          "type": "Point",
          "description": "Miami, USA",
          "coordinates": [-80.185942, 25.774772],
          "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
        },
        "ratingsAverage": 4.8,
        "ratingsQuantity": 6,
        "images": ["tour-2-1.jpg", "tour-2-2.jpg", "tour-2-3.jpg"],
        "startDates": [
          "2021-06-19T09:00:00.000Z",
          "2021-07-20T09:00:00.000Z",
          "2021-08-18T09:00:00.000Z"
        ],
        "secretTour": false,
        "guides": [
          {
            "photo": "user-12.jpg",
            "role": "lead-guide",
            "_id": "5c8a22c62f8fb814b56fa18b",
            "name": "Miyah Myles",
            "email": "miyah@example.com"
          },
          {
            "photo": "user-6.jpg",
            "role": "guide",
            "_id": "5c8a1f4e2f8fb814b56fa185",
            "name": "Jennifer Hardy",
            "email": "jennifer@example.com"
          }
        ],
        "_id": "5c88fa8cf4afda39709c2955",
        "name": "The Sea Explorer",
        "duration": 7,
        "maxGroupSize": 15,
        "difficulty": "medium",
        "price": 497,
        "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
        "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "imageCover": "tour-2-cover.jpg",
        "locations": [
          {
            "type": "Point",
            "coordinates": [-80.128473, 25.781842],
            "_id": "5c88fa8cf4afda39709c2959",
            "description": "Lummus Park Beach",
            "day": 1
          },
          {
            "type": "Point",
            "coordinates": [-80.647885, 24.909047],
            "_id": "5c88fa8cf4afda39709c2958",
            "description": "Islamorada",
            "day": 2
          },
          {
            "type": "Point",
            "coordinates": [-81.0784, 24.707496],
            "_id": "5c88fa8cf4afda39709c2957",
            "description": "Sombrero Beach",
            "day": 3
          },
          {
            "type": "Point",
            "coordinates": [-81.768719, 24.552242],
            "_id": "5c88fa8cf4afda39709c2956",
            "description": "West Key",
            "day": 5
          }
        ],
        "slug": "the-sea-explorer",
        "__v": 0,
        "durationWeeks": 1,
        "reviews": [
          {
            "createdAt": "2023-08-19T01:05:52.455Z",
            "_id": "5c8a34ed14eb5c17645c9108",
            "review": "Cras mollis nisi parturient mi nec aliquet suspendisse sagittis eros condimentum scelerisque taciti mattis praesent feugiat eu nascetur a tincidunt",
            "rating": 5,
            "user": {
              "photo": "user-2.jpg",
              "_id": "5c8a1dfa2f8fb814b56fa181",
              "name": "Lourdes Browning"
            },
            "tour": "5c88fa8cf4afda39709c2955",
            "__v": 0,
            "id": "5c8a34ed14eb5c17645c9108"
          },
          {
            "createdAt": "2023-08-19T01:05:52.455Z",
            "_id": "5c8a36b714eb5c17645c910f",
            "review": "Pulvinar taciti etiam aenean lacinia natoque interdum fringilla suspendisse nam sapien urna!",
            "rating": 4,
            "user": null,
            "tour": "5c88fa8cf4afda39709c2955",
            "__v": 0,
            "id": "5c8a36b714eb5c17645c910f"
          },
          {
            "createdAt": "2023-08-19T01:05:52.455Z",
            "_id": "5c8a391f14eb5c17645c911f",
            "review": "Sem feugiat sed lorem vel dignissim platea habitasse dolor suscipit ultricies dapibus",
            "rating": 5,
            "user": {
              "photo": "user-9.jpg",
              "_id": "5c8a211f2f8fb814b56fa188",
              "name": "Cristian Vega"
            },
            "tour": "5c88fa8cf4afda39709c2955",
            "__v": 0,
            "id": "5c8a391f14eb5c17645c911f"
          },
          {
            "createdAt": "2023-08-19T01:05:52.455Z",
            "_id": "5c8a3a7014eb5c17645c9124",
            "review": "Blandit varius nascetur est felis praesent lorem himenaeos pretium dapibus tellus bibendum consequat ac duis",
            "rating": 5,
            "user": {
              "photo": "user-14.jpg",
              "_id": "5c8a23c82f8fb814b56fa18d",
              "name": "Laura Wilson"
            },
            "tour": "5c88fa8cf4afda39709c2955",
            "__v": 0,
            "id": "5c8a3a7014eb5c17645c9124"
          },
          {
            "createdAt": "2023-08-19T01:05:52.455Z",
            "_id": "5c8a3b7c14eb5c17645c912f",
            "review": "Tempor pellentesque eu placerat auctor enim nam suscipit tincidunt natoque ipsum est.",
            "rating": 5,
            "user": {
              "photo": "user-15.jpg",
              "_id": "5c8a23de2f8fb814b56fa18e",
              "name": "Max Smith"
            },
            "tour": "5c88fa8cf4afda39709c2955",
            "__v": 0,
            "id": "5c8a3b7c14eb5c17645c912f"
          },
          {
            "createdAt": "2023-08-19T01:05:52.455Z",
            "_id": "5c8a3cdc14eb5c17645c913b",
            "review": "Magna magnis tellus dui vivamus donec placerat vehicula erat turpis",
            "rating": 5,
            "user": {
              "photo": "user-19.jpg",
              "_id": "5c8a24822f8fb814b56fa192",
              "name": "John Riley"
            },
            "tour": "5c88fa8cf4afda39709c2955",
            "__v": 0,
            "id": "5c8a3cdc14eb5c17645c913b"
          }
        ],
        "id": "5c88fa8cf4afda39709c2955"
      }
    }
  }
  ```

- **Create Tour:** Create a new tour (requires admin or lead-guide privileges).
  `POST /tours`

  Request

  ```json
  {
    "name": "Tests Tour Average",
    "duration": 1,
    "maxGroupSize": 2,
    "difficulty": "easy",
    "price": 397,
    "summary": "Test",
    "imageCover": "tour-1-cover.jpg"
  }
  ```

  Response

  ```json
  {
    "id": "tour id",
    "name": "Tests Tour Average",
    "startLocation": "California, USA",
    "nextStartDate": "July 2021",
    "duration": 1,
    "maxGroupSize": 2,
    "difficulty": "easy",
    "avgRating": 4.7,
    "numReviews": 23,
    "price": 397,
    "shortDescription": "Surfing, skating, parajumping, rock climbing and more, all in one tour",
    "longDescription": "Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nVoluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur!"
  }
  ```

- **Update Tour:** Update details of a specific tour (requires admin or lead-guide privileges).
  `PATCH /tours/:id`

  Request

  ```json
  {
    "name": "Test 2"
  }
  ```

  Response

  ```json
  {
    "id": "tour id",
    "name": "Tests 2",
    "startLocation": "California, USA",
    "nextStartDate": "July 2021",
    "duration": 1,
    "maxGroupSize": 2,
    "difficulty": "easy",
    "avgRating": 4.7,
    "numReviews": 23,
    "price": 397
  }
  ```

- **Delete Tour:** Delete a tour (requires admin or lead-guide privileges).
  `DELETE /tours/:id`

  Response

  ```json


  ```

### Reviews

- **Get All Reviews:** Retrieve all reviews associated with tours.
  `GET /tours/:tourId/reviews`

  Response

  ```json
  {
    "status": "success",
    "results": 63,
    "data": {
      "data": [
        {
          "createdAt": "2023-08-19T11:40:39.304Z",
          "_id": "64e0aa79ef8e6752e0e9d783",
          "review": "Great",
          "rating": 5,
          "tour": "64e039e8771ee444f829988b",
          "user": null,
          "id": "64e0aa79ef8e6752e0e9d783"
        },
        {
          "createdAt": "2023-08-19T11:31:46.046Z",
          "_id": "64e0a88b1a7e01530c7005b7",
          "review": "Good",
          "rating": 4,
          "tour": "64e039e8771ee444f829988b",
          "user": {
            "photo": "user-2.jpg",
            "_id": "5c8a1dfa2f8fb814b56fa181",
            "name": "Lourdes Browning"
          },
          "id": "64e0a88b1a7e01530c7005b7"
        },
        {
          "createdAt": "2023-08-19T11:31:46.046Z",
          "_id": "64e0a9401a7e01530c7005c1",
          "review": "Not Bad",
          "rating": 4.3,
          "tour": "64e039e8771ee444f829988b",
          "user": {
            "photo": "user-9.jpg",
            "_id": "5c8a211f2f8fb814b56fa188",
            "name": "Cristian Vega"
          },
          "id": "64e0a9401a7e01530c7005c1"
        }
      ]
    }
  }
  ```

- **Get Review by ID:** Retrieve a specific review by its ID.
  `GET /tours/:tourId/reviews/:id`

  Response

  ```json
  {
    "status": "success",
    "data": {
      "data": {
        "createdAt": "2023-08-19T01:05:52.455Z",
        "_id": "5c8a34ed14eb5c17645c9108",
        "review": "Cras mollis nisi parturient mi nec aliquet suspendisse sagittis eros condimentum scelerisque taciti mattis praesent feugiat eu nascetur a tincidunt",
        "rating": 5,
        "user": {
          "photo": "user-2.jpg",
          "_id": "5c8a1dfa2f8fb814b56fa181",
          "name": "Lourdes Browning"
        },
        "tour": "5c88fa8cf4afda39709c2955",
        "__v": 0,
        "id": "5c8a34ed14eb5c17645c9108"
      }
    }
  }
  ```

- **Create Review:** Create a new review for a tour (requires user privileges).
  `POST /tours/:tourId/reviews`

  Request

  ```json
  {
    "review": "Great",
    "rating": 5
  }
  ```

  Response

  ```json
  {
    "status": "success",
    "data": {
      "data": {
        "createdAt": "2023-10-08T02:30:39.101Z",
        "_id": "6522194d898900254c48b91d",
        "review": "Great",
        "rating": 5,
        "tour": "64fcf6e4cfb349eed1302365",
        "user": "65220e90c567e60034a7ee02",
        "__v": 0,
        "id": "6522194d898900254c48b91d"
      }
    }
  }
  ```

- **Update Review:** Update a review (requires user or admin privileges).
  `PATCH /tours/:tourId/reviews/:id`

- **Delete Review:** Delete a review (requires user or admin privileges).
  `DELETE /tours/:tourId/reviews/:id`

  Request

  ```json
  {
    "rating": 1
  }
  ```

  Response

  ```json
  {
    "status": "success",
    "data": {
      "data": {
        "createdAt": "2023-10-08T02:30:39.101Z",
        "_id": "6522194d898900254c48b91d",
        "review": "Great",
        "rating": 1,
        "tour": "64fcf6e4cfb349eed1302365",
        "user": "65220e90c567e60034a7ee02",
        "__v": 0,
        "id": "6522194d898900254c48b91d"
      }
    }
  }
  ```

### Bookings

- **Create Booking Checkout Session:** Create a checkout session for booking a tour.
  `GET /checkout-session/:tourId`

  Response

  ```json
  {
    "status": "success",
    "data": {
      "data": {
        "createdAt": "2023-09-16T19:31:47.196Z",
        "paid": true,
        "_id": "650603335828ba4c4c843608",
        "tour": {
          "guides": [
            {
              "photo": "user-10.jpg",
              "role": "lead-guide",
              "_id": "5c8a21d02f8fb814b56fa189",
              "name": "Steve T. Scaife",
              "email": "steve@example.com"
            },
            {
              "photo": "user-7.jpg",
              "role": "guide",
              "_id": "5c8a201e2f8fb814b56fa186",
              "name": "Kate Morrison",
              "email": "kate@example.com"
            },
            {
              "photo": "user-5.jpg",
              "role": "guide",
              "_id": "5c8a1f292f8fb814b56fa184",
              "name": "Leo Gillespie",
              "email": "leo@example.com"
            }
          ],
          "_id": "5c88fa8cf4afda39709c2951",
          "name": "The Forest Hiker",
          "durationWeeks": null,
          "id": "5c88fa8cf4afda39709c2951"
        },
        "user": {
          "photo": "user-5c8a1ec62f8fb814b56fa183-1694295673576.jpeg",
          "role": "user",
          "_id": "5c8a1ec62f8fb814b56fa183",
          "name": "Ayla Cornell",
          "email": "ayls@example.com",
          "__v": 0,
          "passwordChangedAt": "2023-09-04T08:34:21.658Z"
        },
        "price": 397,
        "__v": 0
      }
    }
  }
  ```

- **Create Booking:** Create a booking for a tour.
  `POST /bookings`

- **Get Booking by ID:** Retrieve detailed information about a specific booking.
  `GET /bookings/:id`

- **Get All Bookings:** Retrieve a list of all bookings.
  `GET /bookings`

  Response

  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "data": [
        {
          "createdAt": "2023-09-16T19:31:47.196Z",
          "paid": true,
          "_id": "650603335828ba4c4c843608",
          "tour": {
            "guides": [
              {
                "photo": "user-10.jpg",
                "role": "lead-guide",
                "_id": "5c8a21d02f8fb814b56fa189",
                "name": "Steve T. Scaife",
                "email": "steve@example.com"
              },
              {
                "photo": "user-7.jpg",
                "role": "guide",
                "_id": "5c8a201e2f8fb814b56fa186",
                "name": "Kate Morrison",
                "email": "kate@example.com"
              },
              {
                "photo": "user-5.jpg",
                "role": "guide",
                "_id": "5c8a1f292f8fb814b56fa184",
                "name": "Leo Gillespie",
                "email": "leo@example.com"
              }
            ],
            "_id": "5c88fa8cf4afda39709c2951",
            "name": "The Forest Hiker",
            "durationWeeks": null,
            "id": "5c88fa8cf4afda39709c2951"
          },
          "user": {
            "photo": "user-5c8a1ec62f8fb814b56fa183-1694295673576.jpeg",
            "role": "user",
            "_id": "5c8a1ec62f8fb814b56fa183",
            "name": "Ayla Cornell",
            "email": "ayls@example.com",
            "__v": 0,
            "passwordChangedAt": "2023-09-04T08:34:21.658Z"
          },
          "price": 397
        }
      ]
    }
  }
  ```

- **Update Booking:** Update details of a specific booking (requires admin or lead-guide privileges).
  `PATCH /bookings/:id`

  Request

  ```json
  {
    "durationWeeks": 3
  }
  ```

  Response

  ```json
  {
    "status": "succuss",
    "data": {
      "_id": "5c88fa8cf4afda39709c2951",
      "name": "The Forest Hiker",
      "durationWeeks": 3,
      "id": "5c88fa8cf4afda39709c2951"
    }
  }
  ```

- **Delete Booking:** Delete a booking (requires admin or lead-guide privileges).
  `DELETE /bookings/:id`

  Response

  ```json

  ```

### View Routes

In addition to the API routes, there are routes dedicated to rendering templates for various views:

- **Overview:** Render the overview of all tours.
  `GET /`

- **Tour:** Render the details of a specific tour.
  `GET /tour/:slug`

- **Login Form:** Render the login form.
  `GET /login`

- **Signup Form:** Render the signup form.
  `GET /signup`

- **Account:** Render the user's account details.
  `GET /me
`
- **My Tours:** Render the user's booked tours.
  `GET /my-tours`

- **User Data Submission:** Handle user data submission for updating profile information.
  `POST /submit-user-data`

## Postman Collection

You can explore and test the API endpoints using the provided Postman collection. The collection includes all the defined API routes along with example requests and responses.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/20337559/2s9Y5SWm44)

Click the "Run in Postman" button above to import the collection into your Postman workspace.

Please note that you'll need to have Postman installed on your machine to use the collection effectively.

## Contributing

Contributions are welcome! If you find any issues or have improvements to suggest, feel free to create a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a pull request
