import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.shema';
import { UserService } from './user.service';
import { AuthResolver } from './user.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { JWTStrategy } from 'src/modules/auth/jwt.strategy';
import { EmailService } from 'src/lib/send-email-service/emailResetPassword/email.service';
import { EmailProcessor } from 'src/lib/send-email-service/emailResetPassword/email.processor';

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
      name: 'emailSending',
    }),
  ],
  providers: [
    UserService,
    AuthResolver,
    JWTStrategy,
    EmailService,
    EmailProcessor,
  ],
  exports: [],
})
export class UserModule {}
