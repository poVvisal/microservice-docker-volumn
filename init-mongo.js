// MongoDB initialization script
db = db.getSiblingDB('sportsmanagement');

// Create collections
db.createCollection('people');
db.createCollection('schedules');
db.createCollection('vods');

// Create indexes for better performance
db.people.createIndex({ "emailid": 1 }, { unique: true });
db.people.createIndex({ "role": 1 });
db.schedules.createIndex({ "matchId": 1 }, { unique: true });
db.schedules.createIndex({ "matchDate": 1 });
db.vods.createIndex({ "vodId": 1 }, { unique: true });
db.vods.createIndex({ "assignedToPlayerEmail": 1 });

print('Database sportsmanagement initialized successfully!');
