const EventSchema = require('../models/event');

const createEvent = (req, res) => {
  console.log('Creating event...');

  // verify a token symmetric - synchronous
  const decoded = jwt.verify(token, 'shhhhh');
  console.log(decoded); // bar

  EventSchema.create(req.body, (err, user) => {
    if (err) return res.json(`Error creating event: ${err}`).status(400);
    return res.send(user).status(202);
  });
};

const getEvent = (req, res) => {
  console.log(`Finding event with id: ${req.params.eventId}`);

  EventSchema.findById(req.params.eventId, (err, result) => {
    if (err) {
      return res.send(err).status(500);
    }
    return res.status(200).send({ result });
  });
};

const updateEvent = (req, res) => {
  EventSchema.findByIdAndUpdate(
    req.params.eventId, { $set: req.body },
    { new: true }, (err, event) => {
      if (err) {
        return res.send(err).status(500);
      }
      return res.status(200).send(event);
    },
  );
};

const deleteEvent = (req, res) => {
  EventSchema.remove({ _id: req.params.eventId }, (err) => {
    if (err) {
      return res.send(err).status(500);
    }
    return res.status(204);
  });
};

module.exports = {
  createEvent, getEvent, updateEvent, deleteEvent,
};
