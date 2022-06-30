# cdk8s-hasura

Deploy a hasura graphql instance to Kubernetes using CDK8s+.

## :rocket: Quick start

**1. Add dependency to you project**

```ts
npm install cdk8s-hasura
```

**2. Initialize the hasura construct**

```ts
import hasura from 'cdk8s-hasura';

new hasura(this, 'graphql-server', {
  adminSecret: 'admin-secret', // Secret used to authenticate the Hasura admin user
  host: 'postgres',
  database: 'postgres',
  postgresUsername: kplus.EnvValue.fromValue('postgres'),
  postgresPassword: kplus.EnvValue.fromValue('postgres'),
});
```

## :classical_building: License

This project is licensed under the Apache-2.0 license.
