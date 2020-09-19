const Tour = require('../models/Tour');

exports.add = async (data) => {
  try {
    return await Tour.create(data);
  } catch (err) {
    // Should be a specific Tour related Exception
    throw Error('Could not save the tour');
  }
};

exports.findAll = () => {
  return Tour.find();
};

exports.findById = (id) => {
  return Tour.findById(id);
};

exports.updateById = async (id, data) => {
  try {
    await Tour.findByIdAndUpdate(id, data, {
      runValidators: true,
    });
  } catch (err) {
    // Error handling here
    throw Error('Error while update the tour: ' + err.message);
  }
};

exports.deleteById = async (id) => {
  try {
    await Tour.deleteOne({ _id: id });
  } catch (err) {
    // Error handling here
    throw Error('Error while deleting a Tour: ' + err.message);
  }
};
