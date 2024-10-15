import { Injectable, Logger } from '@nestjs/common';
import { SDK } from '@ringcentral/sdk';

@Injectable()
export class RingCentralService {
  private rcsdk: SDK;
  private platform: any;
  private readonly logger = new Logger(RingCentralService.name);

  constructor() {
    this.rcsdk = new SDK({
      server: process.env.RING_CENTRAL_SERVER_URL,
      clientId: process.env.RING_CENTRAL_CLIENT_ID,
      clientSecret: process.env.RING_CENTRAL_CLIENT_SECRET,
    });

    this.platform = this.rcsdk.platform();
  }

  async authenticate() {
    try {
      /* Authenticate a user using a personal JWT token */
      const authResponse = await this.platform.login({
        jwt: process.env.RING_CENTRAL_JWT,
      });
      // Set the access token after authentication
      this.platform.auth().setData(authResponse.json());
      this.logger.log('Authenticated using JWT');
    } catch (error) {
      this.logger.error('Failed to authenticate with JWT', error);
    }
  }

  async createSubscription() {
    try {
      const response = await this.platform.post('/restapi/v1.0/subscription', {
        eventFilters: [
          '/restapi/v1.0/account/~/extension/~/telephony/sessions',
          '/restapi/v1.0/account/~/extension/~/presence',
        ],
        deliveryMode: {
          transportType: 'WebHook',
          address: `${process.env.WEBHOOK_DELIVERY_ADDRESS}/api/webhook`,
        },
        expiresIn: 3600,
      });
      const data = await response.json();
      this.logger.log('Webhook subscription created:', data);
    } catch (error) {
      this.logger.error('Failed to create subscription', error);
    }
  }

  async refreshAccessToken() {
    try {
      const refreshToken = this.platform.auth().data.refresh_token; // Retrieve the stored refresh token
      // Request a new access token using the refresh token
      const refreshResponse = await this.platform.post('/restapi/oauth/token', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        clientId: process.env.RING_CENTRAL_CLIENT_ID,
        clientSecret: process.env.RING_CENTRAL_CLIENT_SECRET,
      });

      // Update stored access and refresh tokens
      const { access_token, refresh_token } = refreshResponse.json();
      this.platform.auth().setData({ access_token, refresh_token });
      this.logger.log('Access token refreshed successfully');
    } catch (error) {
      this.logger.error('Failed to refresh access token', error);
    }
  }

  /*
   * Read all created subscriptions
   */
  async read_subscriptions() {
    try {
      const endpoint = '/restapi/v1.0/subscription';
      const resp = await this.platform.get(endpoint);
      const jsonObj = await resp.json();
      if (jsonObj.records.length == 0) console.log('No subscription.');
      else {
        for (const record of jsonObj.records) {
          console.log(record);
          // delete_subscription(record.id)
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}
