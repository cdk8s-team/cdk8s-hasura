# cdk8s-hasura

Deploy a Hasura graphql instance to Kubernetes using CDK8s+.

## :rocket: Quick start

**1. Add the dependency**

```ts
npm install cdk8s-hasura
```

**2. Initialize the Hasura construct**

```ts
import { Hasura } from 'cdk8s-hasura';

new Hasura(this, 'graphql-server', {
  adminSecret: 'admin-secret', // Secret used to authenticate the Hasura admin user
  host: 'postgres',
  database: 'postgres',
  postgresUsername: kplus.EnvValue.fromValue('postgres'),
  postgresPassword: kplus.EnvValue.fromValue('postgres'),
});
```
