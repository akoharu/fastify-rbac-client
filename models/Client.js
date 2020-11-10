'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    phone: {
      type: String,
      unique: true,
      required: true
    },
    telegram: {
      type: String,
      unique: true,
      required: true
    },
    whatsapp: {
      type: String,
      unique: true,
      required: true
    },
    radiusToken: {
      type: String
    },
    subscription: {
      startedAt: {
        type: Date,
      },
      finishedAt: {
        type: Date
      }
    },
    photo: {
      url: {
        type: String
      }
    },
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const Client = mongoose.model('Client', newSchema);
  return Client;
};