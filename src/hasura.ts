import { Names } from 'cdk8s';
import { Construct } from 'constructs';
import {
  IntOrString, KubeConfigMap, KubeDeployment, KubeSecret, KubeService,
} from './imports/k8s';

export interface HasuraProps {
  /**
   * Secret passphrase used to authenticate the admin user with the Hasura instance.
   */
  readonly adminSecret: string;

  /**
   * The database connection URL that you want to use for the Hasura database.
   *
   * @example
   * `postgresql://${USER}:${PASSWORD}@postgres:${PORT}/${DATABASE}`
   */
  readonly databaseUrl: string;

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
}

export default class Hasura extends Construct {
  config: KubeConfigMap;
  secret: KubeSecret;
  deployment: KubeDeployment;
  service: KubeService;

  constructor(scope: Construct, id: string, props: HasuraProps) {
    super(scope, id);

    const {
      adminSecret,
      databaseUrl,
      enableConsole=true,
      logLevel='info',
      image='hasura/graphql-engine:latest',
    } = props;

    const label = { app: Names.toDnsLabel(this) };

    this.config = new KubeConfigMap(this, 'hasura-config', {
      metadata: {
        labels: label,
      },
      data: {
        HASURA_GRAPHQL_ENABLE_CONSOLE: String(enableConsole),
        HASURA_GRAPHQL_LOG_LEVEL: logLevel,
      },
    });

    this.secret = new KubeSecret(this, 'hasura-secret', {
      metadata: {
        labels: label,
      },
      stringData: {
        HASURA_GRAPHQL_ADMIN_SECRET: adminSecret,
        HASURA_GRAPHQL_DATABASE_URL: databaseUrl,
      },
    });


    this.deployment = new KubeDeployment(this, 'hasura-deployment', {
      metadata: {
        labels: label,
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: label,
        },
        template: {
          metadata: {
            labels: label,
          },
          spec: {
            containers: [
              {
                name: 'hasura',
                image: image,
                imagePullPolicy: 'IfNotPresent',
                ports: [
                  {
                    protocol: 'TCP',
                    containerPort: 8080,
                  },
                ],
                readinessProbe: {
                  failureThreshold: 3,
                  initialDelaySeconds: 5,
                  periodSeconds: 10,
                  successThreshold: 1,
                  timeoutSeconds: 1,
                  httpGet: {
                    path: '/health',
                    port: IntOrString.fromNumber(8080),
                  },
                },
                env: [
                  {
                    name: 'HASURA_GRAPHQL_ENABLE_CONSOLE',
                    valueFrom: {
                      configMapKeyRef: {
                        name: this.config.name,
                        key: 'HASURA_GRAPHQL_ENABLE_CONSOLE',
                      },
                    },
                  },
                  {
                    name: 'HASURA_GRAPHQL_LOG_LEVEL',
                    valueFrom: {
                      configMapKeyRef: {
                        name: this.config.name,
                        key: 'HASURA_GRAPHQL_LOG_LEVEL',
                      },
                    },
                  },
                  {
                    name: 'HASURA_GRAPHQL_UNAUTHORIZED_ROLE',
                    valueFrom: {
                      configMapKeyRef: {
                        name: this.config.name,
                        key: 'HASURA_GRAPHQL_UNAUTHORIZED_ROLE',
                      },
                    },
                  },
                  {
                    name: 'HASURA_GRAPHQL_DATABASE_URL',
                    valueFrom: {
                      secretKeyRef: {
                        name: this.secret.name,
                        key: 'HASURA_GRAPHQL_DATABASE_URL',
                      },
                    },
                  },
                  {
                    name: 'HASURA_GRAPHQL_ADMIN_SECRET',
                    valueFrom: {
                      secretKeyRef: {
                        name: this.secret.name,
                        key: 'HASURA_GRAPHQL_ADMIN_SECRET',
                      },
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    });

    this.service = new KubeService(this, 'Hasura-service', {
      metadata: {
        labels: label,
      },
      spec: {
        type: 'ClusterIP',
        selector: label,
        ports: [
          {
            port: 80,
            targetPort: IntOrString.fromNumber(8080),
          },
        ],
      },
    });
  }
}
