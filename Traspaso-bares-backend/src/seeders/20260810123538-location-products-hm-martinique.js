'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // ==========================================
    // 1. LOCATIONS
    // ==========================================

    const locations = await queryInterface.sequelize.query(
      `
        SELECT id, name
        FROM locations
        WHERE companyId = 1
      `,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const locationMap = new Map(
      locations.map((location) => [
        location.name,
        location.id,
      ])
    );

    const chamizoId = locationMap.get('Chamizo');
    const cantinaId = locationMap.get('Cantina');
    const barSalonId = locationMap.get('Bar Salon');
    const skyBarId = locationMap.get('Sky Bar');

    if (
      !chamizoId ||
      !cantinaId ||
      !barSalonId ||
      !skyBarId
    ) {
      throw new Error(
        'No se han encontrado todos los locations de HM Martinique'
      );
    }

    // ==========================================
    // 2. COMPANY PRODUCTS
    // ==========================================

    const companyProducts =
      await queryInterface.sequelize.query(
        `
          SELECT
            cp.id AS companyProductId,
            p.name AS productName
          FROM company_products cp
          INNER JOIN products p
            ON p.id = cp.productId
          WHERE cp.companyId = 1
        `,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );

    const companyProductMap = new Map(
      companyProducts.map((cp) => [
        cp.productName,
        cp.companyProductId,
      ])
    );

    // ==========================================
    // 3. PRODUCTOS DEL POOL BAR
    // ==========================================
    const poolBarProducts = [
      // ==========================================
      // SOFT DRINKS
      // ==========================================
      'Coca cola bib',
      'Coca Cola Zero bib',
      'Fanta Naranja bib',
      'Fanta Limon bib',
      'Sprite bib',
      'Tonica bib',
      'Agua botella',
      'Agua con gas botella',

      // ==========================================
      // PURÉS ODK
      // ==========================================
      'Puré de Fresa',
      'Puré de Coco',
      'Puré de Mango',
      'Puré de Maracuya',

      // ==========================================
      // SMOOTHIES ODK
      // ==========================================
      'Smoothie Fresa',
      'Smoothie Mango',
      'Smoothie Mango-Maracuya',
      'Smoothie Melocoton',
      'Smoothie Coco-Piña',
      'Smoothie Fresa-Platano',

      // ==========================================
      // ZUMOS
      // ==========================================
      'Zumo de Manzana Brick',
      'Zumo de Naranja Brick',
      'Zumo de Melocoton Brick',
      'Zumo de Piña Brick',
      'Zumo de Arándanos Brick',

      // ==========================================
      // BEBIDAS ENERGÉTICAS
      // ==========================================
      'Redbull lata',

      // ==========================================
      // CERVEZAS
      // ==========================================
      'Barril Estrella Damm 50L',
      'Barril Carlsberg 30L',
      'Corona Botella',
      'Heineken Botella',
      'Desperados Botella',
      'Estrella Damm Lata',
      'Estrella Damm 0,0 Lata',
      'Carlsberg Botella',
      'Estrella Damm Botella',

      // ==========================================
      // KOPPARBERG / SIDRAS
      // ==========================================
      'Barril Kopparberg Mix Fruit 30L',
      'Kopparberg Strawberry-Lime Barril 30L',
      'Kopparberg Mix Fruit Lata',
      'Kopparberg Strawberry-Lime Lata',
      'Magners Botella',

      // ==========================================
      // GINEBRAS
      // ==========================================
      'Beefeater',
      'Tanqueray',
      'Bombay Sapphire',
      'Puerto de Indias Fresa',
      'Seagrams dry gin',

      // ==========================================
      // VODKAS
      // ==========================================
      'Smirnoff 1L',
      'Smirnoff 0,7L',
      'Eristoff',
      'Absolut 1L',
      'Absolut 0,7L',
      'Vodka Caramelo Moyhanoff',
      'Absolut Vainilla 1L',
      'Grey Goose 0,7L',
      'Grey Goose 1,5L',
      'Smirnoff Ice',

      // ==========================================
      // RONES
      // ==========================================
      'Breezer Lime',
      'Breezer Sandia',
      'Breezer Naranja',
      'Barceló Añejo',
      'Cachaça Velho Barreiro',
      'Captain Morgan Spiced',
      'Bacardi Carta Blanca',
      'Bacardi Spiced',
      'Bacardi Premium Black',
        // ==========================================
      // WHISKIES
      // ==========================================
      'Jack Daniels',
      'Dewars White Label',
      'Cutty Sark',
      'Red Label',

      // ==========================================
      // TEQUILAS
      // ==========================================
      'Patrón Reposado',
      'Patrón Silver',
      'Tequila Manito',
      'Jose Cuervo Silver',
      'Heroes Strawberry Cream',

      // ==========================================
      // APERITIVOS
      // ==========================================
      'Aperol',
      'Martini Rosso',
      'Martini Blanco',
      'Martini Extra Dry',

      // ==========================================
      // LICORES
      // ==========================================
      'Amaretto Disaronno',
      'After Shock azul',
      'After Shock rojo',
      'St-Germain',
      'Cointreau',
      'Jägermeister',
      'Malibu 0,7L',
      'Malibu 1L',
      'Sambuca',
      'Hierbas Mallorquinas Dulces',
      'Hierbas Mallorquinas Semisecas',
      'Hierbas Mallorquinas Secas',
      'Blue Curaçao',
        // ==========================================
      // VINOS, CAVA Y CHAMPAGNE
      // ==========================================
      'Nuviana Blanco',
      'Faustino tinto',
      'Faustino rosado',
      'Provetto Brut',
      'Roger de Flor Brut',
      'Moët & Chandon Brut Impérial',
      'Moët & Chandon Rosé Impérial',
      'Moët & Chandon Ice Impérial',

      // ==========================================
      // SNACKS
      // ==========================================
      'Almendra Comuna Frita con Sal',
      'Patata Clásica',
      'Patata Ondulada Jamón',
      'Patata Sal y Vinagre',
      'Patata Queso y Cebolla',
      'Pringles Original',
      'Pringles Cebolla',

      // ==========================================
      // LIMPIEZA
      // ==========================================
      'Abrillantador Vajillas Optimax GFA',
      'Detergente Lavado Manual Vajilla Suma',
      'Detergente Lavavajillas Automático',

      // ==========================================
      // MATERIAL AUXILIAR
      // ==========================================
      'Servilleta Kraft Nature 20x20 2 Capas',
      'Bayeta Microfibra Amapola 30x40',
      'Bolsa Basura Amarilla PEBD 85x105',
      'Bolsa Basura Negra PEBD 90x110',
      'Bobina Secamanos',
      'Carga CO₂ 37,5 kg',

      // Productos TI y Helados
      'Vodka Antartica',
      'Ron Benison',
      'Gin Benison',
      'Gin xpress',
      'Whisky Keystone',
      'Peach Schnapps',
      'Tabay',
      'Batida de Coco',
      'Amaretto Di Cardinale',
      'Triple seco',
      'Brandy Martignac',
      'Crema Irlandesa',
      'Granadina',
      'Lime Juice',

      // Granizados
      'Granizado Tropical BIB',
      'Granizado Fresa BIB',
      'Granizado Frambuesa BIB',

      // Cocktails preparados
      'Love on the Beach BIB',
      'Vodka Sun BIB',
      'Daiquiri Fresa BIB',
      'Tequila Sunrise BIB',
      'Mojito BIB',
      'Piña Colada BIB',
      'San Francisco BIB',
      'Piña Colada Sin Alcohol BIB',

      // Helados
      'Magnum Classic',
      'Magnum Almond',
      'Magnum Blanco',
      'Magnum Gold Caramel',
      'Magnum Bar',
      'Cornetto Chocolate',
      'Cornetto Pistacho',
      'Cornetto Go',
      'Calipo Fresa',
      'Calipo Cola',
      'Calipo Lima',
      'Frigo Chuches',
      'Super Twister',
      'Ben & Jerry\'s Chocolate Fudge',
      'Ben & Jerry\'s Cookies',
      'Ben & Jerry\'s Brookies',
      'Ben & Jerry\'s Dulce de Leche',
      'Ben & Jerry\'s Peanuts',
      'Ben & Jerry\'s Strawberry Cheesecake',
      'Ben & Jerry\'s Vanilla Pecan',
    ];

    // ==========================================
    // 4. PRODUCTOS DEL SKY BAR
    // ==========================================
    const skyBarProducts = [
      // AGUAS
      'Agua botella',
      'Agua con gas botella',

      // REFRESCOS
      'Coca Cola Lata',
      'Coca Cola Zero lata',
      'Fanta Limon lata',
      'Fanta Naranja lata',
      'Sprite lata',

      // OTRAS BEBIDAS
      'Aquarius Limon/Naranja lata',
      'Fuze Tea Limon lata',

      // KOPPARBERG
      'Kopparberg Mix Fruit Lata',
      'Kopparberg Strawberry-Lime Lata',

      // ENERGÉTICAS
      'Redbull lata',

      // CERVEZAS
      'Estrella Damm Lata',
      'Estrella Damm 0,0 Lata',
    ];

    const rows = [];

    // ==========================================
    // 5. BAR SALON → TODOS LOS PRODUCTOS
    // ==========================================

    for (const companyProduct of companyProducts) {
      rows.push({
        locationId: barSalonId,
        companyProductId: companyProduct.companyProductId,
        isActive: true,
        priceOverride: null,
        createdAt: now,
        updatedAt: now,
      });
    }

    // ==========================================
    // 6. CHAMIZO + CANTINA → POOL BAR
    // ==========================================

    for (const locationId of [
      chamizoId,
      cantinaId,
    ]) {
      for (const productName of poolBarProducts) {
        const companyProductId =
          companyProductMap.get(productName);

        if (!companyProductId) {
          throw new Error(
            `Producto no encontrado en company_products: ${productName}`
          );
        }

        rows.push({
          locationId,
          companyProductId,
          isActive: true,
          priceOverride: null,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    // ==========================================
    // 7. SKY BAR
    // ==========================================

    for (const productName of skyBarProducts) {
      const companyProductId =
        companyProductMap.get(productName);

      if (!companyProductId) {
        throw new Error(
          `Producto no encontrado en company_products: ${productName}`
        );
      }

      rows.push({
        locationId: skyBarId,
        companyProductId,
        isActive: true,
        priceOverride: null,
        createdAt: now,
        updatedAt: now,
      });
    }

    // ==========================================
    // 8. INSERT
    // ==========================================

    await queryInterface.bulkInsert(
      'location_products',
      rows
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM location_products
      WHERE locationId IN (
        SELECT id
        FROM locations
        WHERE companyId = 1
      )
    `);
  },
};