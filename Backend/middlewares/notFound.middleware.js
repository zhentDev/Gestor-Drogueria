// middlewares/notFound.middleware.js
module.exports = function notFound(req, res, next) {
    res.status(404).json({
      success: false,
      message: `Ruta ${req.originalUrl} no encontrada`
    });
  };
  