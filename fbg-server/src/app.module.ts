import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { MatchModule } from './match/match.module';
import { HealthzController } from './healthz.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';
import { ComplexityPlugin } from './complexity.plugin';

const CONNECTION: any = process.env.POSTGRES_URL
  ? {
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      ssl: false,
      extra: {
        max: 22,
      },
    }
  : {
      type: 'sqlite',
      database: 'dev.db',
    };

const isProd = process.env.NODE_ENV === 'production';

@Module({
  providers: [ComplexityPlugin],
  imports: [
    TypeOrmModule.forRoot({
      ...CONNECTION,
      autoLoadEntities: true,
      synchronize: !isProd,
      logging: false,
    }),
    GraphQLModule.forRoot({
      debug: !isProd,
      playground: !isProd,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), '../common/gql/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    UsersModule,
    RoomsModule,
    MatchModule,
    ChatModule,
    HttpModule.register({
      timeout: 2000,
      maxRedirects: 5,
    }),
  ],
  controllers: [HealthzController],
})
export class AppModule {}
