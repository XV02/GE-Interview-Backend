import { config } from "dotenv";
import path from "path";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Tenant } from "src/tenants/entities/tenant.entity";
import { TenantTable1712032616820 } from "src/migration/1712032616820-TenantTable";
import { Employee } from "src/employee/entities/employee.entity";
import { EmployeeTable1712033468576 } from "src/migration/1712033468576-EmployeeTable";
import { TableRelation1712033682196 } from "src/migration/1712033682196-TableRelation";
import { AddNullableFields1712036474111 } from "src/migration/1712036474111-AddNullableFields";
import { LastInteractionAdded1712120220066 } from "src/migration/1712120220066-LastInteractionAdded";


config();

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) { }

    public getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue("PORT", true);
    }

    public isProduction() {
        const mode = this.getValue("MODE", false);
        return mode != "DEV";
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: "postgres",
            host: this.getValue("DB_HOST"),
            port: parseInt(this.getValue("DB_PORT")),
            username: this.getValue("DB_USERNAME"),
            password: this.getValue("DB_PASSWORD"),
            database: this.getValue("DB_DATABASE"),
            synchronize: true,
            logging: true,
            migrationsTableName: "migration",
            
            entities: [
                Tenant,
                Employee,
            ],
            migrations: [
                TenantTable1712032616820,
                EmployeeTable1712033468576,
                TableRelation1712033682196,
                AddNullableFields1712036474111,
                LastInteractionAdded1712120220066,
            ],

            cli: {
                migrationsDir: "src/migration",
            },
        };
    }
}

const configService = new ConfigService(process.env)
    .ensureValues([
        "DB_HOST",
        "DB_PORT",
        "DB_USERNAME",
        "DB_PASSWORD",
        "DB_DATABASE",
    ]);

export { configService };