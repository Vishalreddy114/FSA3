const LOG = require('./logger');

module.exports = async (db) => {
  LOG.info('Starting seeder.......................');
  try {
    const syncResult = await db.sync({ force: true });
    LOG.info(`Recreated all tables: ${syncResult}`);
  } catch (err) {
    LOG.error(`ERROR: on sync process - ${err.message}`);
  }


  try {
    await db.models.Location.bulkCreate(
      [
        // list of locations
        { locationId: 1, locationName: 'Colden Pond',locationLatitude: 40.35112,locationLongitude: -94.88220,radius:25 },
        { locationId: 2, locationName: 'Horizons West Apartments',locationLatitude:41.31447 ,locationLongitude: -95.05660, radius:25 },
        { locationId: 3, locationName: 'B.D Owens Library' ,locationLatitude: 40.35380,locationLongitude: -94.88598, radius:25},


    ],
    { validate: true } // add options object to call new model validators
  );
  const num = await db.models.Location.count();
  LOG.info(`Seeded ${num} locations.`);
} catch (err) {
  LOG.error(`ERROR: Location seeding - ${err.message}`);
}

LOG.info('Done with seeder................');

  return db;
};