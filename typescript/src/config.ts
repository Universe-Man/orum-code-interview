const env = process.env;

const config = {
  itemsPerPage: env.ITEMS_PER_PAGE || 10,
};

module.exports = config;