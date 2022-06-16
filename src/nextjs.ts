// TODO remove the Hasura specific config and allow the user to specify the config.

import { Duration } from 'cdk8s';
import * as kplus from 'cdk8s-plus-24';
import { Construct } from 'constructs';

export interface NextjsProps {
  /**
   * The image to use for the Nextjs container.
   */
  readonly image: string;

  /**
   * The URL of the Hasura instance.
   *
   * Should be in the format `https://${HASURA_HOST}/v1/graphql`.
   */
  readonly hasuraUrl: string;

  /**
  * Secret passphrase used to authenticate the admin user with the Hasura instance.
  */
  readonly hasuraAdminSecret: string;

  /**
   * The URL where Nextjs is being served from.
   */
  readonly baseUrl?: string;

  /**
   * Labels to apply to all Nextjs resources.
   *
   * @default - { app: "nextjs" }
   */
  readonly labels?: { [name: string]: string };

  /**
   * Namespace to apply to all Nextjs resources. The Hasura instance must be
   * created in this namespace so that they may connect.
   *
   * @default - undefined (will be assigned to the 'default' namespace)
   */
  readonly namespace?: string;
}

/**
 * A Kubernetes Nextjs instance.
 */
export class Nextjs extends Construct {
  private readonly labels: { [name: string]: string };
  private readonly namespace?: string;
  config: kplus.ConfigMap;
  secret: kplus.Secret;
  deployment: kplus.Deployment;
  service: kplus.Service;

  constructor(scope: Construct, id: string, props: NextjsProps) {
    super(scope, id);
    this.labels = props.labels ?? { app: 'nextjs' };
    this.namespace = props.namespace;

    const {
      image,
      hasuraAdminSecret,
      hasuraUrl,
      baseUrl = 'nextjs:3000',
    } = props;

    this.config = new kplus.ConfigMap(this, 'Nextjs-config', {
      metadata: {
        namespace: this.namespace,
        labels: this.labels,
      },
      data: {
        NEXT_PUBLIC_BASE_URL: baseUrl,
        NEXT_PUBLIC_HASURA_GRAPHQL_URL: hasuraUrl,
      },
    });

    this.secret = new kplus.Secret(this, 'Nextjs-secret', {
      metadata: {
        namespace: this.namespace,
        labels: this.labels,
      },
      stringData: {
        HASURA_ADMIN_SECRET: hasuraAdminSecret,
      },
    });


    this.deployment = new kplus.Deployment(this, 'Nextjs-deployment', {
      metadata: {
        namespace: this.namespace,
        labels: this.labels,
      },
      containers: [
        {
          name: 'nextjs',
          image,
          imagePullPolicy: kplus.ImagePullPolicy.IF_NOT_PRESENT,
          readiness: kplus.Probe.fromHttpGet('/healthz', {
            port: 3000,
            successThreshold: 1,
            failureThreshold: 3,
            initialDelaySeconds: Duration.seconds(5),
            periodSeconds: Duration.seconds(10),
            timeoutSeconds: Duration.seconds(1),
          }),
          envVariables: {
            NEXT_PUBLIC_BASE_URL: kplus.EnvValue.fromConfigMap(this.config, 'NEXT_PUBLIC_BASE_URL'),
            NEXT_PUBLIC_HASURA_GRAPHQL_URL: kplus.EnvValue.fromConfigMap(this.config, 'NEXT_PUBLIC_HASURA_GRAPHQL_URL'),
            HASURA_ADMIN_SECRET: kplus.EnvValue.fromSecretValue({
              secret: this.secret,
              key: 'HASURA_ADMIN_SECRET',
            }),
          },
        },
      ],
    });

    this.service = this.deployment.exposeViaService({
      ports: [
        {
          port: 80,
          targetPort: 3000,
        },
      ],
    });
  }
}
