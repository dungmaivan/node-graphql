import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly oderService: OrderService) {}

  @Mutation(() => String)
  async createPayment(@Args('useId') userId: string) {
    return await this.oderService.upgradeToPremium(userId);
  }
}
