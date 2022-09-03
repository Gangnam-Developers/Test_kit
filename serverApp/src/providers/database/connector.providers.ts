import * as mongoose from 'mongoose';

export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE_NAME}?authSource=admin&readPreference=primary&directConnection=true&ssl=false`,
      ),
  },
];
