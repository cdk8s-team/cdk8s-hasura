import { Duration } from 'cdk8s';
import * as kplus from 'cdk8s-plus-28';
import { Construct } from 'constructs';

export interface HasuraProps {
  /**
   * Secret passphrase used to authenticate the admin user with the Hasura instance.
   */
  readonly adminSecret: string;

  /**
   * The host of the Postgres database.
   */
  readonly host: string;

  /**
   * The name of the Postgres Database.
   */
  readonly database: string;

  /**
   * Env variable for the Postgres username.
   */
  readonly postgresUsername: kplus.EnvValue;

  /**
   * Env variable for the Postgres password.
   */
  readonly postgresPassword: kplus.EnvValue;

  /**
   * Enable the web UI for Hasura.
   *
   * @default true
   */
  readonly enableConsole?: boolean;

  /**
   *  Log level for Hasura. Possible values are: "debug", "info", "warn", "error".
   *
   * @default info
   */
  readonly logLevel?: string;

  /**
   * @default 'hasura/graphql-engine:latest'
   */
  readonly image?: string;

  /**
   * Labels to apply to all Hasura resources.
   *
   * @default - { app: "hasura" }
   */
  readonly labels?: { [name: string]: string };

  /**
   * Namespace to apply to all Hasura resources. The Postgres instance must be
   * created in this namespace so that they may connect.
   *
   * @default - undefined (will be assigned to the 'default' namespace)
   */
  readonly namespace?: string;
}

/**
 * A Kubernetes Hasura instance.
 */
export class Hasura extends Construct {
  private readonly labels: { [name: string]: string };
  private readonly namespace?: string;
  readonly config: kplus.ConfigMap;
  readonly secret: kplus.Secret;
  readonly deployment: kplus.Deployment;
  readonly service: kplus.Service;

  constructor(scope: Construct, id: string, props: HasuraProps) {
    super(scope, id);
    this.labels = props.labels ?? { app: 'hasura' };
    this.namespace = props.namespace;

    const {
      adminSecret,
      host,
      database,
      postgresUsername,
      postgresPassword,
      enableConsole = true,
      logLevel = 'info',
      image = 'hasura/graphql-engine:latest',
    } = props;

    this.config = new kplus.ConfigMap(this, 'hasura-config', {
      metadata: {
        namespace: this.namespace,
        labels: this.labels,
      },
      data: {
        HASURA_GRAPHQL_ENABLE_CONSOLE: String(enableConsole),
        HASURA_GRAPHQL_LOG_LEVEL: logLevel,
      },
    });

    this.secret = new kplus.Secret(this, 'hasura-secret', {
      metadata: {
        namespace: this.namespace,
        labels: this.labels,
      },
      stringData: {
        HASURA_GRAPHQL_ADMIN_SECRET: adminSecret,
      },
    });


    this.deployment = new kplus.Deployment(this, 'hasura-deployment', {
      metadata: {
        namespace: this.namespace,
        labels: this.labels,
      },
      containers: [
        {
          portNumber: 8080,
          name: 'hasura',
          image,
          imagePullPolicy: kplus.ImagePullPolicy.IF_NOT_PRESENT,
          readiness: kplus.Probe.fromHttpGet('/healthz', {
            port: 8080,
            successThreshold: 1,
            failureThreshold: 3,
            initialDelaySeconds: Duration.seconds(5),
            periodSeconds: Duration.seconds(10),
            timeoutSeconds: Duration.seconds(1),
          }),
          envVariables: {
            // Database connection
            POSTGRES_USERNAME: postgresUsername,
            POSTGRES_PASSWORD: postgresPassword,
            POSTGRES_DATABASE: kplus.EnvValue.fromValue(database),
            POSTGRES_HOST: kplus.EnvValue.fromValue(host),
            HASURA_GRAPHQL_DATABASE_URL: kplus.EnvValue.fromValue('postgres://$(POSTGRES_USERNAME):$(POSTGRES_PASSWORD)@$(POSTGRES_HOST):5432/$(POSTGRES_DATABASE)'),
            // Config
            HASURA_GRAPHQL_ADMIN_SECRET: kplus.EnvValue.fromSecretValue({
              secret: this.secret,
              key: 'HASURA_GRAPHQL_ADMIN_SECRET',
            }),
            HASURA_GRAPHQL_ENABLE_CONSOLE: kplus.EnvValue.fromConfigMap(this.config, 'HASURA_GRAPHQL_ENABLE_CONSOLE'),
            HASURA_GRAPHQL_LOG_LEVEL: kplus.EnvValue.fromConfigMap(this.config, 'HASURA_GRAPHQL_LOG_LEVEL'),
          },
        },
      ],
    });

    this.service = this.deployment.exposeViaService({
      ports: [
        {
          port: 80,
          targetPort: 8080,
        },
      ],
    });
  }
}
