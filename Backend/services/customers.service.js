const { Customer } = require('../models');
const { Op, fn, col, where } = require('sequelize');
const AppError = require('../utils/appError.utils');

class CustomerService {
  async getAllCustomers(page = 1, limit = 10, search = '') {
    const offset = (page - 1) * limit;
    const whereClause = { is_active: true };

    if (search) {
      Object.assign(whereClause, {
        [Op.or]: [
          where(fn('LOWER', col('full_name')), { [Op.like]: `%${search.toLowerCase()}%` }),
          where(fn('LOWER', col('document_number')), { [Op.like]: `%${search.toLowerCase()}%` })
        ]
      });
    }

    const { count, rows } = await Customer.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset,
      order: [['created_at', 'DESC']]
    });

    return {
      customers: rows,
      pagination: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        pages: Math.ceil(count / limit)
      }
    };
  }

  async getCustomerById(id) {
    const customer = await Customer.findByPk(id);
    
    if (!customer || !customer.is_active) {
      throw AppError.notFound('Cliente no encontrado', 'CUSTOMER_NOT_FOUND');
    }

    return customer;
  }

  async createCustomer(customerData) {
    // Check if document already exists
    const existingCustomer = await Customer.findOne({
      where: { document_number: customerData.document_number }
    });

    if (existingCustomer) {
      if (existingCustomer.is_active) {
        throw AppError.badRequest('Ya existe un cliente con este número de documento', null, 'CUSTOMER_EXISTS');
      } else {
        throw AppError.badRequest('Ya existe un cliente inactivo con este número de documento', null, 'CUSTOMER_EXISTS');
      }
    }

    // Check if email exists if provided
    if (customerData.email) {
       const existingEmail = await Customer.findOne({
        where: { email: customerData.email }
       });
       if (existingEmail) {
          throw AppError.badRequest('Ya existe un cliente con este correo electrónico', null, 'EMAIL_EXISTS');
       }
    }

    const customer = await Customer.create(customerData);
    return customer;
  }

  async updateCustomer(id, customerData) {
    const customer = await Customer.findByPk(id);

    if (!customer || !customer.is_active) {
      throw AppError.notFound('Cliente no encontrado', 'CUSTOMER_NOT_FOUND');
    }

    // Check unique document if changed
    if (customerData.document_number && customerData.document_number !== customer.document_number) {
      const existingCustomer = await Customer.findOne({
        where: { document_number: customerData.document_number }
      });
      if (existingCustomer) {
        throw AppError.badRequest('Ya existe un cliente con este número de documento', null, 'CUSTOMER_EXISTS');
      }
    }

    // Check unique email if changed
    if (customerData.email && customerData.email !== customer.email) {
      const existingEmail = await Customer.findOne({
        where: { email: customerData.email }
      });
      if (existingEmail && existingEmail.id !== parseInt(id)) {
        throw AppError.badRequest('Ya existe un cliente con este correo electrónico', null, 'EMAIL_EXISTS');
      }
    }

    const updatedCustomer = await customer.update(customerData);
    return updatedCustomer;
  }

  // Soft delete
  async deleteCustomer(id) {
    const customer = await Customer.findByPk(id);

    if (!customer) {
       throw AppError.notFound('Cliente no encontrado', 'CUSTOMER_NOT_FOUND');
    }

    await customer.update({ is_active: false });
    return { message: 'Cliente eliminado correctamente' };
  }

  async toggleCustomerStatus(id) {
    const customer = await Customer.findByPk(id);
    
    if (!customer) {
      throw AppError.notFound('Cliente no encontrado', 'CUSTOMER_NOT_FOUND');
    }

    const updatedCustomer = await customer.update({ is_active: !customer.is_active });
    return { 
      message: `Cliente ${updatedCustomer.is_active ? 'activado' : 'desactivado'} correctamente`,
      is_active: updatedCustomer.is_active
    };
  }
}

module.exports = new CustomerService();
