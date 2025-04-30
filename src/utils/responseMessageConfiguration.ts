import nconf  from 'nconf';
import * as path from 'path';

// Setup nconf to use command-line arguments, environment variables, and a JSON file for configuration
nconf.argv().env();
nconf.file('responseMessage', path.join(__dirname,'../../', 'src/config/responseMessage.json'));

// Export the nconf instance for use in other modules
export default nconf;
