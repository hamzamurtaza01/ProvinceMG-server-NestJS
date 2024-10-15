import { Controller, Post, Body, Logger, Req, Res } from '@nestjs/common';
import { RingCentralService } from './ringcentral.service';
import { WebhookGateway } from '../webhook-gateway';

@Controller('webhook')
export class RingCentralController {
  constructor(
    private readonly ringCentralService: RingCentralService,
    private readonly webhookGateway: WebhookGateway,
  ) {}
  private readonly logger = new Logger(RingCentralController.name);

  @Post()
  async handleWebhook(@Body() body: any, @Req() req: any, @Res() res: any) {
    if (req.headers.hasOwnProperty('validation-token')) {
      res.setHeader('Content-type', 'application/json');
      res.setHeader('Validation-Token', req.headers['validation-token']);
      res.statusCode = 200;
      res.end();
    }
    this.logger.log('Webhook received:', body);
    await this.webhookGateway.send(body.contactId, 'Contacts');
    // this.logger.log(`Call event for extension: ${body.body.extensionId}`);
    // Process call event here
    // return { status: 'received' };
  }
}
