import { createServer } from 'node:http';
import logger from './app/utils/logger.js';
import 'dotenv/config';

import app from './app/index.app.js';

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    logger.info(`🚀 HTTP Server launched at http://localhost:${PORT} 🎉`);
  }
});
// Bonne pratique de ne pas faire une sortie terminal non indispensable en production
// Sin il rempli un potentiel fichier de log pour rien
// npm start >  /var/log/oblog/node.process.log
