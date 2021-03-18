module.exports = async (db) => {
    console.log('Starting seeder.......................');

    try {
        const syncResult = await db.sync({ force: true });
        console.log(`Recreated all tables: ${syncResult}`);
    } catch (err) {
        console.log(`ERROR: on sync process - ${err.message}`);
    }

    try {
        await db.models.Location.bulkCreate(
            
            [
                // list of locations
                { locationId: 1, locationName: 'Horizons West Apartments', locationLatitude: 40.356145, locationLongitude: -94.881934, radius: 30 },
                { locationId: 2, locationName: 'B.D Owens Library', locationLatitude: 40.353808, locationLongitude: -94.885997, radius: 30 },
                { locationId: 3, locationName: 'Colden Pond', locationLatitude: 40.350127, locationLongitude: -94.882995, radius: 30 },

            ],
            { validate: true } // add options object to call new model validators
        );

        const num = await db.models.Location.count();
        console.log(`Seeded ${num} locations.`);
    } catch (err) {
        console.log(`ERROR: Location seeding - ${err.message}`);
    }

    console.log('Done with seeder................');

    return db;
};