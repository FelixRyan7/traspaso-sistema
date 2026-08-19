'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

// ===============================
// COMPANIES
// ===============================
await queryInterface.createTable('companies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  code: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },

  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// ===============================
// PRODUCTS
// ===============================
await queryInterface.createTable('products', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  category: {
    type: Sequelize.ENUM(
      'alcohol',
      'soft_drink',
      'beer',
      'wine',
      'food',
      'supplies',
      'other'
    ),
    allowNull: false,
  },

  subcategory: {
    type: Sequelize.ENUM(
      'vodka',
      'gin',
      'rum',
      'whisky',
      'tequila',
      'aperitif',
      'liqueur',
      'beer',
      'water',
      'juice',
      'soda',
      'energy_drink',
      'coffee',
      'cleaning',
      'fruit',
      'ice',
      'other'
    ),
    allowNull: false,
  },

  unitType: {
    type: Sequelize.ENUM(
      'can',
      'bottle',
      'box',
      'bag',
      'unit',
      'barril',
      'bib'
    ),
    allowNull: false,
  },

  quantity: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

  quantityUnit: {
    type: Sequelize.ENUM(
      'ml',
      'l',
      'g',
      'kg',
      'unit'
    ),
    allowNull: false,
  },

  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// ===============================
// USERS
// ===============================
await queryInterface.createTable('users', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  role: {
    type: Sequelize.ENUM(
      'superadmin',
      'admin',
      'manager',
      'staff'
    ),
    allowNull: false,
    defaultValue: 'staff',
  },

  companyId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'companies',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// ===============================
// Locations
// ===============================
await queryInterface.createTable('locations', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'companies',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  type: {
    type: Sequelize.ENUM(
      'bar',
      'kitchen',
      'storage',
      'restaurant',
      'beach_bar',
      'rooftop',
      'other'
    ),
    allowNull: false,
    defaultValue: 'bar',
  },

  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// ===============================
// Company Products
// ===============================
await queryInterface.createTable('company_products', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'companies',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },

  suggestedQuantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

  isStockLow: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

await queryInterface.addIndex(
  'company_products',
  ['companyId', 'productId'],
  {
    unique: true,
    name: 'company_products_company_product_unique',
  }
);

// ===============================
// LOCATION PRODUCTS
// ===============================
await queryInterface.createTable('location_products', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  locationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'locations',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  companyProductId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'company_products',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

  priceOverride: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// Evita que un mismo producto pueda asignarse más de una vez
// a la misma ubicación. Cada combinación ubicación-producto
// debe ser única.
await queryInterface.addIndex(
  'location_products',
  ['locationId', 'companyProductId'],
  {
    unique: true,
    name: 'location_products_location_company_product_unique',
  }
);

// ===============================
// LOCATION REQUESTS
// ===============================
await queryInterface.createTable('location_requests', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },

  locationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'locations',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },

  status: {
    type: Sequelize.ENUM(
      'pending',
      'delivered'
    ),
    allowNull: false,
    defaultValue: 'pending',
  },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },

  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },

  deliveredAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },

  userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// Evita registros duplicados del mismo producto para la misma ubicación,
// estado y fecha. En su lugar se incrementará la cantidad.
await queryInterface.addIndex(
  'location_requests',
  ['locationId', 'productId', 'status', 'date'],
  {
    unique: true,
    name: 'location_requests_unique_daily',
  }
);

// ===============================
// SESSIONS
// ===============================
await queryInterface.createTable('sessions', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },

  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  refreshToken: {
    type: Sequelize.STRING(128),
    allowNull: false,
  },

  expiresAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  revoked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  suspicious: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  userAgent: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  ip: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

// Cada refresh token debe ser único en todo el sistema.
// Un mismo token nunca puede pertenecer a dos sesiones.
await queryInterface.addIndex(
  'sessions',
  ['refreshToken'],
  {
    unique: true,
    name: 'sessions_refresh_token_unique',
  }
);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('sessions');
    await queryInterface.dropTable('location_requests');
    await queryInterface.dropTable('location_products');
    await queryInterface.dropTable('company_products');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('locations');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('companies');
  }
};
