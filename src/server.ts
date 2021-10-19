import { serverHTTP } from './app';

serverHTTP.listen(process.env.PORT, () =>
  console.log('listening on port ' + process.env.PORT)
);
