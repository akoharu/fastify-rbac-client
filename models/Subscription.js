'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true
    },
    startedAt: {
      type: Date,
      required: true
    },
    finishedAt: {
      type: Date,
      required: true
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  newSchema.plugin(require('mongoose-delete'), {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true
  });  
  const Subscription = mongoose.model('Subscription', newSchema);
  return Subscription;
};