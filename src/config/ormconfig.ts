import { configService } from './config.service';

const connectionOptions = configService.getTypeOrmConfig();

export default connectionOptions;
