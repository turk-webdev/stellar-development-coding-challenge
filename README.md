# Building & Running Project
This project was built using Node v14.16.0

1) `npm install` while within the project directory to install all node packages
2) `npm run start` will run the application at http://localhost:3000

# Assumptions & Overview
I spent too much time on the setup of this project. For storing the snippet data, initially I was thinking of having a very simple I/O script that would write JSON objects to a local file, but in the end was worried about race conditions with asynchronous requests so I decided to use a non-relational database (MongoDB) to hold the data so I would not have to handle race conditions.

I am new to using MongoDB, and underestimated the amount of time it would take to set it up and get it tested, and ended up running out of time on unit testing the API calls/features as I implemented them - which was unfortunate.

As for assumptions, I am committing a huge security sin by having the access link to my MongoDB connection listed as a string literal within the `db/index.js` file. This was done in an effort to keep development moving, but normally I would keep this information saved to an environment variable instead.

# Routes
### POST http://localhost:3000/snippets/:name
The expected request body is as follows:
```
{
    name: String
    expires_at: Datetime
    snippet: String
}

```

### GET http://localhost:3000/snippets/:name
Will return a JSON message containing the snippet of <name>, if it can be found

### POST http://localhost:3000/snippets/:name/like
Will return a JSON message containing the snippet of <name>, if it can be found, with the updated "likes" field