import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateSession } from 'src/lib/interface/stripe';
import { Stripe } from 'stripe';
import * as util from 'util';

@Injectable()
export class StripeService {
  readonly stripe: Stripe;

  constructor(readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async upgradeToPremium(
    payload: CreateSession,
  ): Promise<Stripe.Checkout.Session> {
    if (!payload.userId) {
      throw new UnprocessableEntityException(
        'The payment could not be created',
      );
    }

    try {
      const session = await this.stripe.checkout.sessions.create({
        success_url: `${process.env.DOMAIN_URL}/success`,
        cancel_url: `${process.env.DOMAIN_URL}/cancel`,
        mode: payload.paymentType,
        line_items: [
          {
            price: payload.priceId,
            quantity: 1,
          },
        ],
      });

      return session;
    } catch (error) {
      Logger.error(
        '[stripeService] Error creating a payment ',
        util.inspect(error),
      );
      throw new UnprocessableEntityException(
        'The payment could not be created',
      );
    }
  }
}
