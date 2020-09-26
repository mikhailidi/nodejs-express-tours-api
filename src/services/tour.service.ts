import Tour, { ITour } from '../models/Tour';
import {
  RequestSearchParams,
  FilteringParams,
} from '../interfaces/request-search-params.interface';

class TourService {
  /**
   * Create a new tour
   *
   * @param data
   * @throws Error
   */
  async add(data: ITour) {
    try {
      return await Tour.create(data);
    } catch (err) {
      // Should be a specific Tour related Exception
      throw Error('Could not save the tour');
    }
  }

  /**
   * Search for all tours
   *
   * @param params
   * @param filteringParams
   * @throws Error
   */
  async search(params: RequestSearchParams, filteringParams: FilteringParams) {
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

  /**
   * Find a single tour by id.
   *
   * @param id Tour id to find
   */
  findById(id: string) {
    return Tour.findById(id);
  }

  /**
   * Update a single tour by id.
   *
   * @param id Tour id
   * @param data Data to update
   * @throws Error
   */
  async updateById(id: string, data: Object) {
    try {
      await Tour.findByIdAndUpdate(id, data, {
        runValidators: true,
      });
    } catch (err) {
      // Error handling here
      throw Error('Error while update the tour: ' + err.message);
    }
  }

  /**
   * Delete a single tour by id.
   *
   * @param id Tour id to delete
   * @throws Error
   */
  async deleteById(id: string) {
    try {
      await Tour.deleteOne({ _id: id });
    } catch (err) {
      // Error handling here
      throw Error('Error while deleting a Tour: ' + err.message);
    }
  }
}

export default new TourService();
