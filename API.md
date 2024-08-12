# cdk8s-hasura

Deploy a Hasura graphql instance to Kubernetes using CDK8s+.

> Under development. Not yet published.
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Hasura <a name="Hasura" id="cdk8s-hasura.Hasura"></a>

A Kubernetes Hasura instance.

#### Initializers <a name="Initializers" id="cdk8s-hasura.Hasura.Initializer"></a>

```typescript
import { Hasura } from 'cdk8s-hasura'

new Hasura(scope: Construct, id: string, props: HasuraProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-hasura.Hasura.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk8s-hasura.Hasura.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-hasura.Hasura.Initializer.parameter.props">props</a></code> | <code><a href="#cdk8s-hasura.HasuraProps">HasuraProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk8s-hasura.Hasura.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk8s-hasura.Hasura.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk8s-hasura.Hasura.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk8s-hasura.HasuraProps">HasuraProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-hasura.Hasura.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk8s-hasura.Hasura.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-hasura.Hasura.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk8s-hasura.Hasura.isConstruct"></a>

```typescript
import { Hasura } from 'cdk8s-hasura'

Hasura.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk8s-hasura.Hasura.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-hasura.Hasura.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk8s-hasura.Hasura.property.config">config</a></code> | <code>cdk8s-plus-28.ConfigMap</code> | *No description.* |
| <code><a href="#cdk8s-hasura.Hasura.property.deployment">deployment</a></code> | <code>cdk8s-plus-28.Deployment</code> | *No description.* |
| <code><a href="#cdk8s-hasura.Hasura.property.secret">secret</a></code> | <code>cdk8s-plus-28.Secret</code> | *No description.* |
| <code><a href="#cdk8s-hasura.Hasura.property.service">service</a></code> | <code>cdk8s-plus-28.Service</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk8s-hasura.Hasura.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `config`<sup>Required</sup> <a name="config" id="cdk8s-hasura.Hasura.property.config"></a>

```typescript
public readonly config: ConfigMap;
```

- *Type:* cdk8s-plus-28.ConfigMap

---

##### `deployment`<sup>Required</sup> <a name="deployment" id="cdk8s-hasura.Hasura.property.deployment"></a>

```typescript
public readonly deployment: Deployment;
```

- *Type:* cdk8s-plus-28.Deployment

---

##### `secret`<sup>Required</sup> <a name="secret" id="cdk8s-hasura.Hasura.property.secret"></a>

```typescript
public readonly secret: Secret;
```

- *Type:* cdk8s-plus-28.Secret

---

##### `service`<sup>Required</sup> <a name="service" id="cdk8s-hasura.Hasura.property.service"></a>

```typescript
public readonly service: Service;
```

- *Type:* cdk8s-plus-28.Service

---


## Structs <a name="Structs" id="Structs"></a>

### HasuraProps <a name="HasuraProps" id="cdk8s-hasura.HasuraProps"></a>

#### Initializer <a name="Initializer" id="cdk8s-hasura.HasuraProps.Initializer"></a>

```typescript
import { HasuraProps } from 'cdk8s-hasura'

const hasuraProps: HasuraProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-hasura.HasuraProps.property.adminSecret">adminSecret</a></code> | <code>string</code> | Secret passphrase used to authenticate the admin user with the Hasura instance. |
| <code><a href="#cdk8s-hasura.HasuraProps.property.database">database</a></code> | <code>string</code> | The name of the Postgres Database. |
| <code><a href="#cdk8s-hasura.HasuraProps.property.host">host</a></code> | <code>string</code> | The host of the Postgres database. |
| <code><a href="#cdk8s-hasura.HasuraProps.property.postgresPassword">postgresPassword</a></code> | <code>cdk8s-plus-28.EnvValue</code> | Env variable for the Postgres password. |
| <code><a href="#cdk8s-hasura.HasuraProps.property.postgresUsername">postgresUsername</a></code> | <code>cdk8s-plus-28.EnvValue</code> | Env variable for the Postgres username. |
| <code><a href="#cdk8s-hasura.HasuraProps.property.enableConsole">enableConsole</a></code> | <code>boolean</code> | Enable the web UI for Hasura. |
| <code><a href="#cdk8s-hasura.HasuraProps.property.image">image</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-hasura.HasuraProps.property.labels">labels</a></code> | <code>{[ key: string ]: string}</code> | Labels to apply to all Hasura resources. |
| <code><a href="#cdk8s-hasura.HasuraProps.property.logLevel">logLevel</a></code> | <code>string</code> | Log level for Hasura. |
| <code><a href="#cdk8s-hasura.HasuraProps.property.namespace">namespace</a></code> | <code>string</code> | Namespace to apply to all Hasura resources. |

---

##### `adminSecret`<sup>Required</sup> <a name="adminSecret" id="cdk8s-hasura.HasuraProps.property.adminSecret"></a>

```typescript
public readonly adminSecret: string;
```

- *Type:* string

Secret passphrase used to authenticate the admin user with the Hasura instance.

---

##### `database`<sup>Required</sup> <a name="database" id="cdk8s-hasura.HasuraProps.property.database"></a>

```typescript
public readonly database: string;
```

- *Type:* string

The name of the Postgres Database.

---

##### `host`<sup>Required</sup> <a name="host" id="cdk8s-hasura.HasuraProps.property.host"></a>

```typescript
public readonly host: string;
```

- *Type:* string

The host of the Postgres database.

---

##### `postgresPassword`<sup>Required</sup> <a name="postgresPassword" id="cdk8s-hasura.HasuraProps.property.postgresPassword"></a>

```typescript
public readonly postgresPassword: EnvValue;
```

- *Type:* cdk8s-plus-28.EnvValue

Env variable for the Postgres password.

---

##### `postgresUsername`<sup>Required</sup> <a name="postgresUsername" id="cdk8s-hasura.HasuraProps.property.postgresUsername"></a>

```typescript
public readonly postgresUsername: EnvValue;
```

- *Type:* cdk8s-plus-28.EnvValue

Env variable for the Postgres username.

---

##### `enableConsole`<sup>Optional</sup> <a name="enableConsole" id="cdk8s-hasura.HasuraProps.property.enableConsole"></a>

```typescript
public readonly enableConsole: boolean;
```

- *Type:* boolean
- *Default:* true

Enable the web UI for Hasura.

---

##### `image`<sup>Optional</sup> <a name="image" id="cdk8s-hasura.HasuraProps.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string
- *Default:* 'hasura/graphql-engine:latest'

---

##### `labels`<sup>Optional</sup> <a name="labels" id="cdk8s-hasura.HasuraProps.property.labels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* { app: "hasura" }

Labels to apply to all Hasura resources.

---

##### `logLevel`<sup>Optional</sup> <a name="logLevel" id="cdk8s-hasura.HasuraProps.property.logLevel"></a>

```typescript
public readonly logLevel: string;
```

- *Type:* string
- *Default:* info

Log level for Hasura.

Possible values are: "debug", "info", "warn", "error".

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="cdk8s-hasura.HasuraProps.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* undefined (will be assigned to the 'default' namespace)

Namespace to apply to all Hasura resources.

The Postgres instance must be
created in this namespace so that they may connect.

---



