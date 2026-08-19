'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = await queryInterface.sequelize.query(
      `
        SELECT id, defaultSuggestedQuantity
        FROM products
      `,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (!products.length) {
      throw new Error(
        'No hay productos para asociar a HM Martinique'
      );
    }

    const now = new Date();

    await queryInterface.bulkInsert(
      'company_products',
      products.map((product) => ({
        companyId: 1,
        productId: product.id,
        suggestedQuantity:
          product.defaultSuggestedQuantity ?? null,

        // Se definirá durante el primer inventario
        inventoryUnit: null,

        // Configuración inicial
        operationalArea: 'bar',

        isActive: true,
        isStockLow: false,

        createdAt: now,
        updatedAt: now,
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('company_products', {
      companyId: 1,
    });
  },
};
