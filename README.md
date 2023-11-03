# E-Commerce API with Persistent User Activity Logging

The E-Commerce API with Persistent User Activity Logging is a powerful system for building e-commerce platforms with a focus on user activity tracking, enhancing user experiences, and delivering valuable insights.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation and Environment Setup](#installation-and-environment-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Documentation](#documentation)

## Features

- Persistent user activity logging.
- Scheduled cloud backups for data security.
- Powerful API endpoints for managing products and user activities.
- User-friendly Swagger documentation for easy interaction.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed.
- MongoDB setup with appropriate credentials.
- Git (optional but recommended).

### Installation and Environment Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/mjavason/E-Commerce-API-with-Persistent-User-Activity-Logging.git
   cd E-Commerce-API-with-Persistent-User-Activity-Logging
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the project's root directory and set the following environment variables:

   ```env
   PORT=3000
   JWT_SECRET=your_secret_key
   MONGO_DB_NAME=your_database_name
   MONGO_DB_URL=your_mongodb_url
   ```

   Ensure these values are set according to your specific requirements.

4. Start the server:
   ```sh
   npm run start
   ```

## API Endpoints

The API provides a range of endpoints for managing products and user activities. You can explore these endpoints using the Swagger documentation at `/docs`.

- View product details, add products, and more.

## Documentation

API documentation is available at `/docs` using Swagger. Start the server and navigate to `/docs` in your browser to view the API documentation.