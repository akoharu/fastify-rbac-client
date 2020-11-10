module.exports = {
  "development": {
    "database": {
      "url": "mongodb://localhost:27017/eyzetClient",
      "options": {
        "useNewUrlParser": true
      }
    }
  },
  "docker": {
    "database": {
      "url": process.env.DATABASE_URL,
      "options": {
        "useNewUrlParser": true
      }
    }
  },
  "production": {
    "database": {
      "url": process.env.DATABASE_URL,
      "options": {
        "useNewUrlParser": true
      }
    }
  }
}