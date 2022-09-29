import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [CoreModule, EmployeeModule],
})
export class AppModule {}
