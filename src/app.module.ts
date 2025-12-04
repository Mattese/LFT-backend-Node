import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // prefer explicit process.env values in CI (CI=true) so workflow-provided env vars win
      // fall back to local files for developer convenience
      envFilePath: ['.env.local', '.env'],
      ignoreEnvFile: !!process.env.CI,
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
