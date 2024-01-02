import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { CreateSession } from 'src/lib/interface/stripe';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.shema';
import mongoose from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private readonly stripeService: StripeService,
  ) {}
  async upgradeToPremium(userId: string) {
    const payload: CreateSession = {
      userId,
      paymentType: 'payment',
      priceId: process.env.PREMIUM_PRICE_ID,
    };
    const rerult = await this.stripeService.upgradeToPremium(payload);
    if (rerult) {
      await this.userModel.findByIdAndUpdate(userId, {
        isPremium: true,
      });
      return rerult.url;
    } else {
      return 'payment error';
    }
  }
}
