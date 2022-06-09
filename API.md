# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Postgres <a name="Postgres" id="cdk8s-web-app.Postgres"></a>

#### Initializers <a name="Initializers" id="cdk8s-web-app.Postgres.Initializer"></a>

```typescript
import { Postgres } from 'cdk8s-web-app'

new Postgres(scope: Construct, id: string, props: PostgresProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-web-app.Postgres.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk8s-web-app.Postgres.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-web-app.Postgres.Initializer.parameter.props">props</a></code> | <code><a href="#cdk8s-web-app.PostgresProps">PostgresProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk8s-web-app.Postgres.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk8s-web-app.Postgres.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk8s-web-app.Postgres.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk8s-web-app.PostgresProps">PostgresProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-web-app.Postgres.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk8s-web-app.Postgres.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.




## Structs <a name="Structs" id="Structs"></a>

### HasuraProps <a name="HasuraProps" id="cdk8s-web-app.HasuraProps"></a>

#### Initializer <a name="Initializer" id="cdk8s-web-app.HasuraProps.Initializer"></a>

```typescript
import { HasuraProps } from 'cdk8s-web-app'

const hasuraProps: HasuraProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-web-app.HasuraProps.property.adminSecret">adminSecret</a></code> | <code>string</code> | Secret passphrase used to authenticate the admin user with the Hasura instance. |
| <code><a href="#cdk8s-web-app.HasuraProps.property.databaseUrl">databaseUrl</a></code> | <code>string</code> | The database connection URL that you want to use for the Hasura database. |
| <code><a href="#cdk8s-web-app.HasuraProps.property.enableConsole">enableConsole</a></code> | <code>boolean</code> | Enable the web UI for Hasura. |
| <code><a href="#cdk8s-web-app.HasuraProps.property.image">image</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-web-app.HasuraProps.property.logLevel">logLevel</a></code> | <code>string</code> | Log level for Hasura. |

---

##### `adminSecret`<sup>Required</sup> <a name="adminSecret" id="cdk8s-web-app.HasuraProps.property.adminSecret"></a>

```typescript
public readonly adminSecret: string;
```

- *Type:* string

Secret passphrase used to authenticate the admin user with the Hasura instance.

---

##### `databaseUrl`<sup>Required</sup> <a name="databaseUrl" id="cdk8s-web-app.HasuraProps.property.databaseUrl"></a>

```typescript
public readonly databaseUrl: string;
```

- *Type:* string

The database connection URL that you want to use for the Hasura database.

---

*Example*

```typescript
`postgresql://${USER}:${PASSWORD}@postgres:${PORT}/${DATABASE}`
```


##### `enableConsole`<sup>Optional</sup> <a name="enableConsole" id="cdk8s-web-app.HasuraProps.property.enableConsole"></a>

```typescript
public readonly enableConsole: boolean;
```

- *Type:* boolean
- *Default:* true

Enable the web UI for Hasura.

---

##### `image`<sup>Optional</sup> <a name="image" id="cdk8s-web-app.HasuraProps.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string
- *Default:* 'hasura/graphql-engine:latest'

---

##### `logLevel`<sup>Optional</sup> <a name="logLevel" id="cdk8s-web-app.HasuraProps.property.logLevel"></a>

```typescript
public readonly logLevel: string;
```

- *Type:* string
- *Default:* info

Log level for Hasura.

Possible values are: "debug", "info", "warn", "error".

---

### PostgresProps <a name="PostgresProps" id="cdk8s-web-app.PostgresProps"></a>

#### Initializer <a name="Initializer" id="cdk8s-web-app.PostgresProps.Initializer"></a>

```typescript
import { PostgresProps } from 'cdk8s-web-app'

const postgresProps: PostgresProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-web-app.PostgresProps.property.teamId">teamId</a></code> | <code>string</code> | Name of the team that the cluster belongs to. |
| <code><a href="#cdk8s-web-app.PostgresProps.property.databases">databases</a></code> | <code>{[ key: string ]: string}</code> | A map of database names to database owners. |
| <code><a href="#cdk8s-web-app.PostgresProps.property.labels">labels</a></code> | <code>{[ key: string ]: string}</code> | Labels to apply to all Postgres resources. |
| <code><a href="#cdk8s-web-app.PostgresProps.property.namespace">namespace</a></code> | <code>string</code> | Namespace to apply to all Postgresql resources. |
| <code><a href="#cdk8s-web-app.PostgresProps.property.numberOfInstances">numberOfInstances</a></code> | <code>number</code> | The number of Postgres instances to create. |
| <code><a href="#cdk8s-web-app.PostgresProps.property.users">users</a></code> | <code>{[ key: string ]: <a href="#cdk8s-web-app.UserFlags">UserFlags</a>[]}</code> | A map of usernames to user flags. |
| <code><a href="#cdk8s-web-app.PostgresProps.property.version">version</a></code> | <code><a href="#cdk8s-web-app.PostgresVersion">PostgresVersion</a></code> | Postgres Version Defaults to latest version. |
| <code><a href="#cdk8s-web-app.PostgresProps.property.volumeSize">volumeSize</a></code> | <code>string</code> | The size of the target volume. |

---

##### `teamId`<sup>Required</sup> <a name="teamId" id="cdk8s-web-app.PostgresProps.property.teamId"></a>

```typescript
public readonly teamId: string;
```

- *Type:* string

Name of the team that the cluster belongs to.

You cannot change this after the
cluster is created. Clusters will be prefixed with this team id.

The name must be lowercase.

---

##### `databases`<sup>Optional</sup> <a name="databases" id="cdk8s-web-app.PostgresProps.property.databases"></a>

```typescript
public readonly databases: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* if not provided the default database will be created with the name "postgres" and if no users are provided it will be assigned to the default user "dbadmin".

A map of database names to database owners.

---

##### `labels`<sup>Optional</sup> <a name="labels" id="cdk8s-web-app.PostgresProps.property.labels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* { app: "postgres" }

Labels to apply to all Postgres resources.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="cdk8s-web-app.PostgresProps.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* undefined (will be assigned to the 'default' namespace)

Namespace to apply to all Postgresql resources.

The Postgres Operator must be
installed in this namespace for resources to be recognized.

---

##### `numberOfInstances`<sup>Optional</sup> <a name="numberOfInstances" id="cdk8s-web-app.PostgresProps.property.numberOfInstances"></a>

```typescript
public readonly numberOfInstances: number;
```

- *Type:* number
- *Default:* 1

The number of Postgres instances to create.

---

##### `users`<sup>Optional</sup> <a name="users" id="cdk8s-web-app.PostgresProps.property.users"></a>

```typescript
public readonly users: {[ key: string ]: UserFlags[]};
```

- *Type:* {[ key: string ]: <a href="#cdk8s-web-app.UserFlags">UserFlags</a>[]}
- *Default:* A "dbadmin" user will be created for you with the SUPERUSER and CREATEDB flags.

A map of usernames to user flags.

---

##### `version`<sup>Optional</sup> <a name="version" id="cdk8s-web-app.PostgresProps.property.version"></a>

```typescript
public readonly version: PostgresVersion;
```

- *Type:* <a href="#cdk8s-web-app.PostgresVersion">PostgresVersion</a>
- *Default:* PostgresVersion.VALUE_14

Postgres Version Defaults to latest version.

---

##### `volumeSize`<sup>Optional</sup> <a name="volumeSize" id="cdk8s-web-app.PostgresProps.property.volumeSize"></a>

```typescript
public readonly volumeSize: string;
```

- *Type:* string
- *Default:* 1Gi

The size of the target volume.

Can be in Gi or Mi units.

---



## Enums <a name="Enums" id="Enums"></a>

### PostgresVersion <a name="PostgresVersion" id="cdk8s-web-app.PostgresVersion"></a>

Supported PostgreSQL versions.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-web-app.PostgresVersion.VALUE_9_5">VALUE_9_5</a></code> | 9.5. |
| <code><a href="#cdk8s-web-app.PostgresVersion.VALUE_9_6">VALUE_9_6</a></code> | 9.6. |
| <code><a href="#cdk8s-web-app.PostgresVersion.VALUE_10">VALUE_10</a></code> | 10. |
| <code><a href="#cdk8s-web-app.PostgresVersion.VALUE_11">VALUE_11</a></code> | 11. |
| <code><a href="#cdk8s-web-app.PostgresVersion.VALUE_12">VALUE_12</a></code> | 12. |
| <code><a href="#cdk8s-web-app.PostgresVersion.VALUE_13">VALUE_13</a></code> | 13. |
| <code><a href="#cdk8s-web-app.PostgresVersion.VALUE_14">VALUE_14</a></code> | 14. |

---

##### `VALUE_9_5` <a name="VALUE_9_5" id="cdk8s-web-app.PostgresVersion.VALUE_9_5"></a>

9.5.

---


##### `VALUE_9_6` <a name="VALUE_9_6" id="cdk8s-web-app.PostgresVersion.VALUE_9_6"></a>

9.6.

---


##### `VALUE_10` <a name="VALUE_10" id="cdk8s-web-app.PostgresVersion.VALUE_10"></a>

10.

---


##### `VALUE_11` <a name="VALUE_11" id="cdk8s-web-app.PostgresVersion.VALUE_11"></a>

11.

---


##### `VALUE_12` <a name="VALUE_12" id="cdk8s-web-app.PostgresVersion.VALUE_12"></a>

12.

---


##### `VALUE_13` <a name="VALUE_13" id="cdk8s-web-app.PostgresVersion.VALUE_13"></a>

13.

---


##### `VALUE_14` <a name="VALUE_14" id="cdk8s-web-app.PostgresVersion.VALUE_14"></a>

14.

---


### UserFlags <a name="UserFlags" id="cdk8s-web-app.UserFlags"></a>

User flags that are assigned to users to grant them privileges.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-web-app.UserFlags.BYPASSRLS">BYPASSRLS</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.NOBYPASSRLS">NOBYPASSRLS</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.CREATEDB">CREATEDB</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.NOCREATEDB">NOCREATEDB</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.CREATEROLE">CREATEROLE</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.NOCREATEROLE">NOCREATEROLE</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.INHERIT">INHERIT</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.NOINHERIT">NOINHERIT</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.LOGIN">LOGIN</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.NOLOGIN">NOLOGIN</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.REPLICATION">REPLICATION</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.NOREPLICATION">NOREPLICATION</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.SUPERUSER">SUPERUSER</a></code> | *No description.* |
| <code><a href="#cdk8s-web-app.UserFlags.NOSUPERUSER">NOSUPERUSER</a></code> | *No description.* |

---

##### `BYPASSRLS` <a name="BYPASSRLS" id="cdk8s-web-app.UserFlags.BYPASSRLS"></a>

---


##### `NOBYPASSRLS` <a name="NOBYPASSRLS" id="cdk8s-web-app.UserFlags.NOBYPASSRLS"></a>

---


##### `CREATEDB` <a name="CREATEDB" id="cdk8s-web-app.UserFlags.CREATEDB"></a>

---


##### `NOCREATEDB` <a name="NOCREATEDB" id="cdk8s-web-app.UserFlags.NOCREATEDB"></a>

---


##### `CREATEROLE` <a name="CREATEROLE" id="cdk8s-web-app.UserFlags.CREATEROLE"></a>

---


##### `NOCREATEROLE` <a name="NOCREATEROLE" id="cdk8s-web-app.UserFlags.NOCREATEROLE"></a>

---


##### `INHERIT` <a name="INHERIT" id="cdk8s-web-app.UserFlags.INHERIT"></a>

---


##### `NOINHERIT` <a name="NOINHERIT" id="cdk8s-web-app.UserFlags.NOINHERIT"></a>

---


##### `LOGIN` <a name="LOGIN" id="cdk8s-web-app.UserFlags.LOGIN"></a>

---


##### `NOLOGIN` <a name="NOLOGIN" id="cdk8s-web-app.UserFlags.NOLOGIN"></a>

---


##### `REPLICATION` <a name="REPLICATION" id="cdk8s-web-app.UserFlags.REPLICATION"></a>

---


##### `NOREPLICATION` <a name="NOREPLICATION" id="cdk8s-web-app.UserFlags.NOREPLICATION"></a>

---


##### `SUPERUSER` <a name="SUPERUSER" id="cdk8s-web-app.UserFlags.SUPERUSER"></a>

---


##### `NOSUPERUSER` <a name="NOSUPERUSER" id="cdk8s-web-app.UserFlags.NOSUPERUSER"></a>

---

