import * as kplus from 'cdk8s-plus-24';
import { Construct } from 'constructs';
import { Postgresql as RawPostgres } from './imports/postgresql-acid.zalan.do';

/**
 * Supported PostgreSQL versions.
 */
export enum PostgresVersion {
  /** 9.5 */
  VALUE_9_5 = '9.5',
  /** 9.6 */
  VALUE_9_6 = '9.6',
  /** 10 */
  VALUE_10 = '10',
  /** 11 */
  VALUE_11 = '11',
  /** 12 */
  VALUE_12 = '12',
  /** 13 */
  VALUE_13 = '13',
  /** 14 */
  VALUE_14 = '14',
}

/**
 * User flags that are assigned to users to grant them privileges.
 */
export enum UserFlags {
  BYPASSRLS = 'BYPASSRLS',
  NOBYPASSRLS = 'NOBYPASSRLS',
  CREATEDB = 'CREATEDB',
  NOCREATEDB = 'NOCREATEDB',
  CREATEROLE = 'CREATEROLE',
  NOCREATEROLE = 'NOCREATEROLE',
  INHERIT = 'INHERIT',
  NOINHERIT = 'NOINHERIT',
  LOGIN = 'LOGIN',
  NOLOGIN = 'NOLOGIN',
  REPLICATION = 'REPLICATION',
  NOREPLICATION = 'NOREPLICATION',
  SUPERUSER = 'SUPERUSER',
  NOSUPERUSER = 'NOSUPERUSER',
}

export interface PostgresProps {
  /**
   * Name of the team that the cluster belongs to. You cannot change this after the
   * cluster is created. Clusters will be prefixed with this team id.
   *
   * The name will be lower cased.
   */
  readonly teamId: string;

  /**
   * A map of usernames to user flags.
   *
   * @default - 'postgres' is created with the following flag LOGIN
   */
  readonly users?: { [username: string]: UserFlags[] };


  // TODO Evaluate better solutions for the default behavior here. Is this the best default?
  /**
   * A map of database names to database owners.
   *
   * @default - if not provided the default database will be created with the
   * name "postgres" and if no users are provided it will be assigned to the
   * default user "dbadmin", if users are provided it will default to the first entry.
   */
  readonly databases?: { [database: string]: string };

  /**
   * The number of Postgres instances to create.
   *
   * @default 1
   */
  readonly numberOfInstances?: number;

  /**
   * The size of the target volume. Can be in Gi or Mi units.
   *
   * @default 1Gi
   */
  readonly volumeSize?: string;

  /**
   * Postgres Version
   * Defaults to latest version.
   *
   * @default - PostgresVersion.VALUE_14
   */
  readonly version?: PostgresVersion;

  /**
   * Labels to apply to all Postgres resources.
   *
   * @default - { app: "postgres" }
   */
  readonly labels?: { [name: string]: string };

  /**
   * Namespace to apply to all Postgresql resources. The Postgres Operator must be
   * installed in this namespace for resources to be recognized.
   *
   * @default - undefined (will be assigned to the 'default' namespace)
   */
  readonly namespace?: string;
}

export class Postgres extends Construct {
  private readonly labels: { [name: string]: string };
  private readonly namespace?: string;
  private readonly teamId: string;
  public readonly clusterName: string;

  constructor(scope: Construct, id: string, props: PostgresProps) {
    super(scope, id);
    this.labels = props.labels ?? { app: 'postgres' };
    this.namespace = props.namespace;
    this.teamId = props.teamId;

    /**
     * TODO: Get this programmatically. If there are replica clusters then the cluster name
     * could end with `-n` (n being a number) this needs to be handled so that we only use
     * the master cluster name.
     *
     * This value can be manually retrieved using the following (replace <team-id> with the team id):
     * @example
     * ```sh
     * kubectl get pods -o jsonpath={.items..metadata.name} -l application=spilo,cluster-name=<team-id>-cluster,spilo-role=master -n default
     * ```
     */
    this.clusterName = `${this.teamId.toLowerCase()}-cluster`;

    new RawPostgres(this, 'Postgres', {
      metadata: {
        // Name is required for the Postgres Operator to recognize the resource.
        name: this.clusterName,
        namespace: this.namespace,
        labels: this.labels,
      },
      spec: {
        // @ts-expect-error - We copied the enum but TS thinks they're different.
        users: props.users,
        databases: props.databases,
        numberOfInstances: props.numberOfInstances || 1,
        postgresql: {
          // @ts-expect-error - We copied the enum but TS thinks they're different.
          version: props.version ?? PostgresVersion.VALUE_14,
        },
        teamId: props.teamId,
        volume: {
          size: props.volumeSize ?? '1Gi',
        },
      },
    });
  }

  /**
   *
   * @param username
   * @default - postgres
   */
  public userCredentials(username?: string) {
    const user = username ?? 'postgres';

    return new kplus.Secret(this, `${user}-credentials`, {
      stringData: {
        user,
        /**
         * TODO Need way of importing secret values for interpolation in database URL.
         *
         * This is what I originally was using but it doesn't seem like values can
         * be retrieved using this.
         * @example
         * ```ts
         * return kplus.Secret.fromSecretName(
         *  this,
         *  'credentials',
         *  `${user}.${this.clusterName}.credentials.postgresql.acid.zalan.do`,
         * );
         * ```
         *
         * For now this value has to be manually retrieved using the following command:
         * @example
         * ```sh
         * kubectl get secret postgres.<cluster-name>.credentials.postgresql.acid.zalan.do -o 'jsonpath={.data.password}' | base64 -d
         * ```
         */
        password: '96TQRv1y030LbnkmrESu0U20wxxsQ2XmVe1NSBFKP5ktuBrVZ4i4b805LWhaACs0',
      },
    });
  }
}
