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

  async search(params = {}, filteringParams) {
    let query = Tour.find(params);
    if (filteringParams.sort) {
      query = query.sort(filteringParams.sort.split(',').join(' '));
    } else {
      query = query.sort('createdAt');
    }

    // Field limiting
    if (filteringParams.fields) {
      const fields = filteringParams.fields.split(',').join(' ');
      query = query.select(fields);
    }

    if (filteringParams.page) {
      // Pagination
      const page = filteringParams.page * 1 || 1;
      const limit = filteringParams.limit * 1 || 10;
      const skip = (page - 1) * limit;
      const toursCount = await Tour.countDocuments();
      if (skip >= toursCount || skip < 0) {
        throw new Error('Page you are requesting does not exist');
      }
      query = query.skip(skip).limit(limit);
    }

    return query;
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
