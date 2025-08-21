# Backend Practice

This project demonstrates a beginner friendly backend built with **Node.js**, **Express**, and **MongoDB**.
The code in `server.js` contains extensive comments to explain each step.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Set up MongoDB**
   - If you have MongoDB running locally, no configuration is necessary.
   - Otherwise set the `MONGO_URL` environment variable to your MongoDB connection string.
3. **Run the server**
   ```bash
   npm start
   ```

## API Endpoints

- `GET /items` – list all items in the database.
- `POST /items` – create a new item. Send JSON like `{ "name": "Learn Node" }`.

Feel free to explore and modify the code to continue learning!
