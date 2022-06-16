import * as kplus from 'cdk8s-plus-24';
import { Construct } from 'constructs';
import { Postgres, PostgresProps, Hasura, HasuraProps, Nextjs, NextjsProps } from '../src/index';

export interface JamstackProps {
  readonly teamId: PostgresProps['teamId'];
  readonly hasuraAdminSecret: HasuraProps['adminSecret'];
  readonly nextjsImage: NextjsProps['image'];

  /**
  * Labels to apply to all Jamstack resources.
  *
  * @default - { app: "jamstack" }
  */
  readonly labels?: { [name: string]: string };

  /**
   * Namespace to apply to all Jamstack resources. The Postgres Operator must be
   * installed in this namespace for resources to be recognized.
   *
   * @default - undefined (will be assigned to the 'default' namespace)
   */
  readonly namespace?: string;
}

/**
 * A Kubernetes Jamstack instance.
 * Under the hood this deploys a Nextjs, Hasura, and Postgres instance.
 */
export class Jamstack extends Construct {
  private readonly labels: { [name: string]: string };
  private readonly namespace?: string;

  constructor(scope: Construct, id: string, props: JamstackProps) {
    super(scope, id);
    this.labels = props.labels ?? { app: 'jamstack' };
    this.namespace = props.namespace;

    const {
      teamId,
      hasuraAdminSecret,
      nextjsImage,
    } = props;

    // Create a Postgres instance
    const postgres = new Postgres(this, 'postgres', {
      namespace: this.namespace,
      labels: this.labels,
      teamId,
    });
    const credentials = postgres.userCredentials();

    // Create a Hasura instance
    const hasura = new Hasura(this, 'hasura', {
      namespace: this.namespace,
      labels: this.labels,
      adminSecret: hasuraAdminSecret,
      databaseUrl: `postgresql://${credentials.getStringData('user')}:${credentials.getStringData('password')}@${postgres.clusterName}:5432/postgres`,
    });

    // Expose hasura so that nextjs can connect and allow health checks to pass
    const ingress = new kplus.Ingress(this, 'ingress', {
      metadata: {
        namespace: this.namespace,
        labels: this.labels,
        // TODO is this necessary?
        annotations: {
          'nginx.ingress.kubernetes.io/rewrite-target': '/$1',
        },
      },
    });
    // The host we want to expose the hasura instance on
    const hasuraHost = 'hasura';
    ingress.addHostRule(
      hasuraHost,
      '/(.*)',
      kplus.IngressBackend.fromService(hasura.service),
      kplus.HttpIngressPathType.PREFIX,
    );

    // Create a Nextjs instance
    const nextjs = new Nextjs(this, 'nextjs', {
      namespace: this.namespace,
      labels: this.labels,
      image: nextjsImage,
      hasuraAdminSecret: hasuraAdminSecret,
      hasuraUrl: `${hasuraHost}/v1/graphql`,
    });

    // Expose nextjs as default route
    ingress.addDefaultBackend(kplus.IngressBackend.fromService(nextjs.service));
  }
}
