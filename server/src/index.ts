import app from './app';
import config from './config/config';
import { initRateLimiter } from './config/rate-limiter';
import databaseService from './service/databaseService';
import logger from './utils/logger';
const server = app.listen(config.PORT);

(async () => {
  try {

    // database connection
    const connection = await databaseService.connect()
    logger.info('DATABASE_CONNECTION',{
      meta:{
        CONNECTION_NAME: connection.name
      }
    })

    initRateLimiter(connection)
    
    logger.info('🚀 Application Started', {
      meta: {
        PORT: config.PORT,
        SERVER_URL: config.SERVER_URL,
      },
    });
  } catch (error) {
    logger.error('❌ Application Startup Error', { meta: error });

    server.close((err) => {
      if (err) {
        logger.error('❌ Error closing the server', { meta: err });
        process.exit(1);
      } else {
        logger.info('🛑 Server closed gracefully due to startup failure');
        process.exit(1);
      }
    });
  }
})();
