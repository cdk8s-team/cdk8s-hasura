# cdk8s-jamstack

Deploy a Jamstack application to Kubernetes.

This Jamstack application consists of:

- NextJS - React Frontend
- Hasura - GraphQL Server
- Postgres - Database

## ❗ Prerequisites

You'll need to have the Postgres Operator installed in your Kubernetes cluster.

See [Postgres Operator Quickstart guide](https://postgres-operator.readthedocs.io/en/latest/quickstart/).

## :rocket: Quick start

**1. Add dependency to you project**

```ts
yarn add cdk8s-jamstack
```

**2. Initalize the Jamstack construct**

```ts
import Jamstack from 'cdk8s-jamstack';

new Jamstack(this, 'my-jamstack', {
  teamId: 'goldfish', // Team that will have access to the postgres-cluster
  adminSecret: 'admin-secret', // Secret used to authenticate the Hasura admin user
  nextjsImage: '1234567891234.dkr.ecr.us-east-1.amazonaws.com/nextjs-website:latest', // Nextjs image
});
```

> There is a known bug where Hasura will not be able to connect with the Postgres cluster. This is explained in the [issues doc](./docs/issues.md#cannot-get-value-from-imported-secret) under "Cannot get value from imported secret".

## :classical_building: License

This project is licensed under the Apache-2.0 license.
