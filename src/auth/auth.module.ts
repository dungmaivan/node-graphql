import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schema/auth.shema';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JWTStrategy } from './jwt.strategy';
import { EmailService } from 'src/send-email-service/email.service';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from 'src/send-email-service/email.processor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
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
      name: 'emailSending',
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JWTStrategy,
    EmailService,
    EmailProcessor,
  ],
  exports: [],
})
export class AuthModule {}
