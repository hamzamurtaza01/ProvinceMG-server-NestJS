import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { RingCentralService } from './ringcentral.service';
import { RingCentralController } from './ringcentral.controller';
import { WebhookGateway } from '../webhook-gateway';

@Module({
  controllers: [RingCentralController],
  providers: [RingCentralService, WebhookGateway],
})
export class RingCentralModule implements OnModuleInit {
  constructor(private readonly ringCentralService: RingCentralService) {}
  private readonly logger = new Logger(RingCentralService.name);
  private subscriptionRetryInterval: NodeJS.Timeout;

  async onModuleInit() {
    await this.ringCentralService.authenticate();
    await this.startSubscriptionRetryTask(); // Retry until succeed
  }
  // This function will periodically retry the subscription creation
  startSubscriptionRetryTask() {
    const retryInterval = 5000; // Retry every 5 seconds
    this.subscriptionRetryInterval = setInterval(async () => {
      try {
        this.logger.log('Attempting to create subscription...');
        await this.ringCentralService.createSubscription();
        this.logger.log('Subscription created successfully.');
        clearInterval(this.subscriptionRetryInterval); // Stop retrying if successful
      } catch (error) {
        this.logger.error('Subscription creation failed, retrying...', error);
        // The retry task continues until it succeeds or the server shuts down
      }
    }, retryInterval);
  }
}
