# Postgres Operator

Installation and important configuration notes for Postgres Operator.

## Installation

For the latest installation instructions see [Postgres Operator Quickstart guide](https://postgres-operator.readthedocs.io/en/latest/quickstart/).

To install using kubectl, run the following command:

```sh
kubectl apply -k github.com/zalando/postgres-operator/manifests
```
_You should consider adjusting the manifests to your K8s environment (e.g. namespaces)._

Then to check if it is running:

```sh
kubectl get pod -l name=postgres-operator
```

**2. Deploy the Postgres Operator UI**

```sh
kubectl apply -k github.com/zalando/postgres-operator/ui/manifests
```

Verify it is running:

```sh
kubectl get pod -l name=postgres-operator-ui
```

_Using Minikube? You'll need to enable the ingress Minikube addon `minikube addons enable ingress` then start the Minikube tunnel proxy service by running `minikube tunnel`. If you are using a Mac you'll also need to add `127.0.0.1 ui.example.org` to `/etc/hosts`. See this [GitHub comment](https://github.com/kubernetes/minikube/issues/7332#issuecomment-890110258)._

The UI should now be available at [`http://ui.example.org/`](http://ui.example.org/).

**3. Create a Postgres cluster**

```sh
kubectl create -f manifests/minimal-postgres-manifest.yaml
```

Verify everything is running:

```sh
# check the deployed cluster
kubectl get postgresql

# check created database pods
kubectl get pods -l application=spilo -L spilo-role

# check created service resources
kubectl get svc -l application=spilo -L spilo-role
```

_If you are running into problems then check out the ["Local testing" section of the operator docs](https://postgres-operator.readthedocs.io/en/latest/administrator/)_



## Postgres Operator

The Postgres operator manages PostgreSQL clusters on Kubernetes (K8s):

The operator watches additions, updates, and deletions of PostgreSQL cluster manifests and changes the running clusters accordingly. For example, when a user submits a new manifest, the operator fetches that manifest and spawns a new Postgres cluster along with all necessary entities such as K8s StatefulSets and Postgres roles. See this Postgres cluster manifest for settings that a manifest may contain.

The operator also watches updates to its own configuration and alters running Postgres clusters if necessary. For instance, if the Docker image in a pod is changed, the operator carries out the rolling update, which means it re-spawns pods of each managed StatefulSet one-by-one with the new Docker image.

Finally, the operator periodically synchronizes the actual state of each Postgres cluster with the desired state defined in the cluster's manifest.

The operator aims to be hands free as configuration works only via manifests. This enables easy integration in automated deploy pipelines with no access to K8s directly.

### [Configurable operator parameters](https://postgres-operator.readthedocs.io/en/latest/reference/operator_parameters/)
Configuring the Postgres Operator is only possible before deploying a new Postgres cluster. This can work in two ways: via a ConfigMap or a custom OperatorConfiguration object.

### How to Delete the Postgres cluster

This should remove the associated StatefulSet, database Pods, Services and Endpoints. The PersistentVolumes are released and the PodDisruptionBudget is deleted. Secrets however are not deleted and backups will remain in place.

```sh
kubectl delete postgresql acid-minimal-cluster
```

_When deleting a cluster while it is still starting up or got stuck during that phase it can happen that the postgresql resource is deleted leaving orphaned components behind. This can cause troubles when creating a new Postgres cluster. For a fresh setup you can delete your local minikube or kind cluster and start again._

### Postgres roles supported by the operator

[See "Postgres roles supported by the operator" docs](https://postgres-operator.readthedocs.io/en/latest/administrator/)

The operator is capable of maintaining roles of multiple kinds within a Postgres database cluster:

System roles are roles necessary for the proper work of Postgres itself such as a replication role or the initial superuser role. The operator delegates creating such roles to Patroni and only establishes relevant secrets.

Infrastructure roles are roles for processes originating from external systems, e.g. monitoring robots. The operator creates such roles in all Postgres clusters it manages, assuming that K8s secrets with the relevant credentials exist beforehand.

Per-cluster robot users are also roles for processes originating from external systems but defined for an individual Postgres cluster in its manifest. A typical example is a role for connections from an application that uses the database.

Human users originate from the Teams API that returns a list of the team members given a team id. The operator differentiates between (a) product teams that own a particular Postgres cluster and are granted admin rights to maintain it, (b) Postgres superuser teams that get superuser access to all Postgres databases running in a K8s cluster for the purposes of maintaining and troubleshooting, and (c) additional teams, superuser teams or members associated with the owning team. The latter is managed via the PostgresTeam CRD.

The operator accepts the following Manifest role flags:
- superuser
- inherit
- login
- nologin
- createrole
- createdb
- replication
- bypassrls

The operator automatically generates a password for each manifest role and places it in the secret named {username}.{team}-{clustername}.credentials.postgresql.acid.zalan.do in the same namespace as the cluster. This way, the application running in the K8s cluster and connecting to Postgres can obtain the password right from the secret, without ever sharing it outside of the cluster.

### In-place downgrades are not supported
[operator docs](https://postgres-operator.readthedocs.io/en/latest/user/)
It is your responsibility to test your applications against the new version before the upgrade; downgrading is not supported.
