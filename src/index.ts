import express from 'express';

import '../env';
import loaders from './loaders';

async function init() {
  const app: express.Application = express();
  const server = await loaders({ app });

  server.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
}

init();
