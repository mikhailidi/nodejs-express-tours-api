const Tour = require('../models/Tour');

class TourService {
  async add(data) {
    try {
      return await Tour.create(data);
    } catch (err) {
      // Should be a specific Tour related Exception
      throw Error('Could not save the tour');
    }
  }

  findAll() {
    return Tour.find();
  }

  findById(id) {
    return Tour.findById(id);
  }

  async updateById(id, data) {
    try {
      await Tour.findByIdAndUpdate(id, data, {
        runValidators: true,
      });
    } catch (err) {
      // Error handling here
      throw Error('Error while update the tour: ' + err.message);
    }
  }

  async deleteById(id) {
    try {
      await Tour.deleteOne({ _id: id });
    } catch (err) {
      // Error handling here
      throw Error('Error while deleting a Tour: ' + err.message);
    }
  }
}

module.exports = new TourService();
