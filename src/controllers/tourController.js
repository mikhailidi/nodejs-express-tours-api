const tourService = require('../services/tour.service');

class TourController {
  async index(req, res) {
    const tours = await tourService.findAll();

    return res.json({
      status: 'success',
      data: tours,
    });
  }

  async get(req, res) {
    const tour = await tourService.findById(req.params.id);

    return res.json({
      status: 'success',
      data: tour,
    });
  }

  async update(req, res) {
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

  async delete(req, res) {
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

  async store(req, res) {
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

  handleInvalidIdParam(req, res, next, id) {
    if (Number.isInteger(Number(id))) {
      return res.status(400).json({
        status: 'failed',
        message: 'The :id parameter is invalid',
      });
    }

    next();
  }

  async handleNotExistingTour(req, res, next, id) {
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

module.exports = new TourController();
