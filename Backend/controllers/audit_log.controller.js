const auditLogService = require('../services/audit_log.service');
const catchAsync = require('../utils/catchAsync.utils');

exports.getLogs = catchAsync(async (req, res, next) => {
  const logs = await auditLogService.findAll(req.query);
  res.json(logs);
});
