import { Request, Response, NextFunction } from 'express';
import tourService from '../services/tour.service';
import {
  RequestSearchParams,
  FilteringParams,
} from '../interfaces/request-search-params.interface';

class TourController {
  async index(req: Request, res: Response) {
    // Build query
    const query = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    const filteringParams: FilteringParams = {};
    excludedFields.forEach((el) => {
      if (query[el]) {
        filteringParams[el] = query[el];
        delete query[el];
      }
    });

    // Filtering
    let querySting = JSON.stringify(query);
    querySting.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const requestSearchParams: RequestSearchParams = JSON.parse(querySting);

    try {
      const tours = await tourService.search(
        requestSearchParams,
        filteringParams
      );

      return res.json({
        status: 'success',
        data: tours,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'fail',
        data: err.message,
      });
    }
  }

  async get(req: Request, res: Response) {
    const tour = await tourService.findById(req.params.id);

    return res.json({
      status: 'success',
      data: tour,
    });
  }

  async update(req: Request, res: Response) {
    try {
      await tourService.updateById(req.params.id, req.body);
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({
        status: 'fail',
        message: err.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await tourService.deleteById(req.params.id);

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({
        status: 'fail',
        message: err.message,
      });
    }
  }

  async store(req: Request, res: Response) {
    try {
      await tourService.add(req.body);

      return res.status(201).send();
    } catch (err) {
      // Throw specific exception here
      return res.status(500).json({
        status: 'failed',
        error: err.message,
      });
    }
  }

  handleInvalidIdParam(
    req: Request,
    res: Response,
    next: NextFunction,
    id: any
  ) {
    if (Number.isInteger(Number(id))) {
      return res.status(400).json({
        status: 'failed',
        message: 'The :id parameter is invalid',
      });
    }

    next();
  }

  async handleNotExistingTour(
    req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) {
    const tour = await tourService.findById(id);
    if (!tour) {
      return res.status(404).json({
        status: 'not_found',
        message: 'Tour not found',
      });
    }

    next();
  }
}

export default new TourController();
