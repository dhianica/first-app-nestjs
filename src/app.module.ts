import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { EmployeeModule } from './employee/employee.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { 

@Module({
  imports: [CatsModule, CoreModule, EmployeeModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply([])

    
  }
}
