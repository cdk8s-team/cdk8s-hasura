# cdk8s-hasura

<<<<<<< Updated upstream
Deploy a Jamstack application to Kubernetes.

This Jamstack application consists of:

- NextJS - React Frontend
- Hasura - GraphQL Server
- Postgres - Database

## ❗ Prerequisites

You'll need to have the Postgres Operator installed in your Kubernetes cluster.

See [Postgres Operator Quickstart guide](https://postgres-operator.readthedocs.io/en/latest/quickstart/).
=======
Deploy a hasura application to Kubernetes using CDK8s+.
>>>>>>> Stashed changes

## :rocket: Quick start

**1. Add dependency to you project**

```ts
<<<<<<< Updated upstream
yarn add cdk8s-jamstack
=======
npm install cdk8s-hasura
>>>>>>> Stashed changes
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
