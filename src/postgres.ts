// import * as kplus from 'cdk8s-plus-24';
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
   * The name must be lowercase.
   */
  readonly teamId: string;

  /**
   * A map of usernames to user flags.
   *
   * @default - A "dbadmin" user will be created for you with the SUPERUSER
   * and CREATEDB flags.
   */
  readonly users?: {[username:string]: UserFlags[]};


  /**
   * A map of database names to database owners.
   *
   * @default - if not provided the default database will be created with the
   * name "postgres" and if no users are provided it will be assigned to the
   * default user "dbadmin".
   */
  readonly databases?: {[database:string]: string};

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
  private readonly clusterName: string;

  constructor(scope: Construct, id: string, props: PostgresProps) {
    super(scope, id);
    this.labels = props.labels ?? { app: 'postgres' };
    this.teamId = props.teamId;
    this.clusterName = `${this.teamId.toLowerCase()}-cluster`;

    new RawPostgres(this, 'Postgres', {
      metadata: {
        labels: this.labels,
        name: this.clusterName,
        namespace: this.namespace,
      },
      spec: {
        // @ts-expect-error - We copied the enum but TS thinks they're different.
        users: props.users ?? { dbadmin: [UserFlags.SUPERUSER, UserFlags.CREATEDB] },
        databases: props.databases ?? { postgres: 'dbadmin' },
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

  // get credentials() {
  //   return kplus.Secret.fromSecretName(this, 'credentials', this.clusterName);
  // }
}
