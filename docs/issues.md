# Issues

A list of issues that i've ran into while developing this project.

## Unable to connect to postgres using psql

[Postgres Operator docs](https://postgres-operator.readthedocs.io/en/latest/quickstart/) say to run the following

```sh
export HOST_PORT=$(minikube service acid-minimal-cluster --url | sed 's,.*/,,')
export PGHOST=$(echo $HOST_PORT | cut -d: -f 1)
export PGPORT=$(echo $HOST_PORT | cut -d: -f 2)
```

However this ends up throwing an error

```sh
acid-minimal-cluster has no node port
panic: runtime error: index out of range [3] with length 3

goroutine 1 [running]:
k8s.io/minikube/cmd/minikube/cmd.glob..func35(0x103759800, {0x140006a6ee0, 0x1, 0x2})
        /private/tmp/minikube-20220224-22619-1l4wp0k/cmd/minikube/cmd/service.go:138 +0x6a8
github.com/spf13/cobra.(*Command).execute(0x103759800, {0x140006a6ec0, 0x2, 0x2})
        /Users/brew/Library/Caches/Homebrew/go_mod_cache/pkg/mod/github.com/spf13/cobra@v1.3.0/command.go:860 +0x640
github.com/spf13/cobra.(*Command).ExecuteC(0x103759300)
        /Users/brew/Library/Caches/Homebrew/go_mod_cache/pkg/mod/github.com/spf13/cobra@v1.3.0/command.go:974 +0x410
github.com/spf13/cobra.(*Command).Execute(...)
        /Users/brew/Library/Caches/Homebrew/go_mod_cache/pkg/mod/github.com/spf13/cobra@v1.3.0/command.go:902
k8s.io/minikube/cmd/minikube/cmd.Execute()
        /private/tmp/minikube-20220224-22619-1l4wp0k/cmd/minikube/cmd/root.go:157 +0xdb8
main.main()
        /private/tmp/minikube-20220224-22619-1l4wp0k/cmd/minikube/main.go:86 +0x2a0
```

**UPDATE: Found Workaround**

Setup a port forward on the database pods

```sh
# get name of master pod of acid-minimal-cluster
export PGMASTER=$(kubectl get pods -o jsonpath={.items..metadata.name} -l application=spilo,cluster-name=acid-minimal-cluster,spilo-role=master -n default)

# set up port forward
kubectl port-forward $PGMASTER 6432:5432 -n default
```

Connect to database

```sh
export PGPASSWORD=$(kubectl get secret postgres.acid-minimal-cluster.credentials.postgresql.acid.zalan.do -o 'jsonpath={.data.password}' | base64 -d)
export PGSSLMODE=require
psql -U postgres -h localhost -p 6432
```

## Cannot use cdk8s-plus-24

```sh
❯ yb
yarn run v1.22.15
$ npx projen build
👾 build » default | node .projenrc.js
[1/4] 🔍  Resolving packages...
success Already up-to-date.
👾 build » compile | jsii --silence-warnings=reserved-word
[2022-06-08T18:52:36.584] [ERROR] jsii/compiler - Type model errors prevented the JSII assembly from being created
src/postgres.ts:139:7 - error JSII9000: Encountered use of module that is not declared in "dependencies" or "peerDependencies": "cdk8s-plus-24"

139   get credentials() {
          ~~~~~~~~~~~
👾 Task "build » compile" failed when executing "jsii --silence-warnings=reserved-word" (cwd: /Users/ryanparker/GitHub/cdk8s-web-app)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

Solved by removing cdk8s and constructs from the .porjen.js deps.

## Cannot get value from imported secret

I need a way of retrieving the secret that postgres-operator creates for the postgres user. I need to use this secret to form the database URL for Hasura.

To workaround this for now

1. I am retrieving the user password manually

```sh
kubectl get secret postgres.<cluster-name>.credentials.postgresql.acid.zalan.do -o 'jsonpath={.data.password}' | base64 -d
```

2. Hard-code the password in the [Postgres.credentials()](../src/postgres.ts) method.

```ts
// src/postgres.ts

...

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
```

## Cannot return JS object from class method

```sh
👾 compile | jsii --silence-warnings=reserved-word
[2022-06-15T15:45:20.645] [ERROR] jsii/compiler - Type model errors prevented the JSII assembly from being created
src/postgres.ts:151:10 - error JSII3001: Type "__object" cannot be used as the return type because it is private or @internal

151   public userCredentials(username?: string) {
             ~~~~~~~~~~~~~~~

  src/postgres.ts:155:12
    155     return {
                   ~
    156       username: user,
        ~~~~~~~~~~~~~~~~~~~~~
    157       password: 'KsIBrzRZXiygi8T2tvSfKLYAXanmt8eMKh871IDo4cA6KtEOpWLv25jywmaGWRfb',
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    158     };
        ~~~~~
```

This isn't a blocker but I would like to know why JSII doesn't like this.
