import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JWTStrategy } from './jwt.strategy';
import { BullModule } from '@nestjs/bull';
import { UserSchema } from '../../modules/user/schema/user.shema';
import { EmailWelcomeService } from '../../lib/send-email-service/emailWelcom/email-welcome.service';
import { EmailWelcomeProcessor } from '../../lib/send-email-service/emailWelcom/email-welcome.processor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES'),
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: 'emailWelcomeSending',
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JWTStrategy,
    EmailWelcomeService,
    EmailWelcomeProcessor,
  ],
  exports: [],
})
export class AuthModule {}
