const Supplier = require('../models/supplier');

class SupplierController {
    // Create a new supplier
    static async createSupplier(req, res, next) {
        try {
            const { companyName, ContactName, ContactTitle, Address, City, PostalCode, Country, Phone, Email } = req.body;
            if (!companyName || !Email) {
                return res.status(400).json({ message: 'CompanyName and Email are required' });
            }

            const supplier = await Supplier.create({ companyName, ContactName, ContactTitle, Address, City, PostalCode, Country, Phone, Email });
            res.status(201).json({ message: 'Supplier created successfully', supplier });
        } catch (error) {
            next(error);
        }
    }

    // Get all suppliers
    static async getAllSuppliers(req, res, next) {
        try {
            const suppliers = await Supplier.findAll();
            res.json(suppliers);
        } catch (error) {
            next(error);
        }
    }

    // Get a supplier by ID
    static async getSupplierById(req, res, next) {
        try {
            const { id } = req.params;
            const supplier = await Supplier.findByPk(id);

            if (!supplier) {
                return res.status(404).json({ message: 'Supplier not found' });
            }

            res.json(supplier);
        } catch (error) {
            next(error);
        }
    }

    // Update a supplier
    static async updateSupplier(req, res, next) {
        try {
            const { id } = req.params;
            const { companyName, ContactName, ContactTitle, Address, City, PostalCode, Country, Phone, Email } = req.body;

            const supplier = await Supplier.findByPk(id);
            if (!supplier) {
                return res.status(404).json({ message: 'Supplier not found' });
            }

            supplier.companyName = companyName || supplier.companyName;
            supplier.ContactName = ContactName || supplier.ContactName;
            supplier.ContactTitle = ContactTitle || supplier.ContactTitle;
            supplier.Address = Address || supplier.Address;
            supplier.City = City || supplier.City;
            supplier.PostalCode = PostalCode || supplier.PostalCode;
            supplier.Country = Country || supplier.Country;
            supplier.Phone = Phone || supplier.Phone;
            supplier.Email = Email || supplier.Email;
            await supplier.save();

            res.json({ message: 'Supplier updated successfully', supplier });
        } catch (error) {
            next(error);
        }
    }

    // Delete a supplier
    static async deleteSupplier(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Supplier.destroy({ where: { SupplierID: id } });

            if (!deleted) {
                return res.status(404).json({ message: 'Supplier not found' });
            }

            res.json({ message: 'Supplier deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SupplierController; 