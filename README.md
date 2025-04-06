# Prediction API

A simple Node.js + Express REST API that allows users to create predictions and give their opinions on them (Yes/No) along with an amount.

Built with **MongoDB (Mongoose)** for database, **Express** for server, and includes **input validations** for clean data.

---

## Getting Started

First, clone the repository and move into the project directory:

```bash
git clone https://github.com/shivam0912/prediction-api.git
cd prediction-api
```
## Install the dependencies:
```
npm install 
```
## Create a .env file in the root directory and add the following:
```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```
## Start the server:
```
npm run dev or npm start
```
## API Endpoints - Test in Postman
Create Prediction
POST /api/prediction
Create a new prediction.

Request Body:
````
{
  "question": "Will India win the next match?",
  "category": "Sports",
  "expiryTime": "2025-04-07T12:00:00Z"
}
````
## Get All Active Predictions
GET /api/predictions

##  Submit Opinion
POST /api/opinion
Submit your opinion on a prediction.

Request Body:
```
{
  "predictionId": "get id from /api/predictions",
  "userId": "shivam_19y",
  "opinion": "Yes",
  "amount": 100
}
```
## Tech Stack
Node.js

Express.js

MongoDB with Mongoose

Validator.js

dotenv

Nodemon (for development)


## Author
Shivam Gupta
Github: shivam0912



