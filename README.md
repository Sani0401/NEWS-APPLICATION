# News App

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This repository contains the code for a simple News App built using React for the frontend and Node.js with Express for the backend. The app allows users to log in, search for news articles, view article details, and save articles for later reading.

# Table of Contents

- Prerequisites
- Installation
- Folder Structure
- Running the App
- Features
- Dependencies
- Backend
- Frontend
- API Endpoints
- Contributing
- License

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:
   `git clone https://github.com/your-username/news-app.git
`
2. Navigate to the project directory:
   `cd news-app`
3. Install backend dependencies:
   `cd server
npm install`
4. Install frontend dependencies:
   `cd client
npm install`

# Folder Structure

news-app/
|-- backend/
| |-- controllers/
| |-- models/
| |-- routes/
| |-- .env
| |-- server.js
|-- frontend/
| |-- public/
| |-- src/
| |-- .env
| |-- ...
|-- README.md

- server: Contains the Node.js Express server code.
- client: Contains the React.js frontend code.

# Running the App

- Start the MongoDB server.
- Start the backend server
  `cd sevrer
npm start`
- Start the frontend server:
  `cd client
npm start`

# API Endpoints

- POST /login: User login endpoint.
- POST /search: Search for news articles based on keywords.
- POST /addArticle: Save an article for later reading.
- GET /getAllData: Get all saved articles.

# Contribution

- Contributions are welcome! Please follow the Contributing Guidelines when making contributions.

# License

- This project is licensed under the MIT License.
