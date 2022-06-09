# TODO

A list of TODOs for this project.

- [ ] Setup Infrastructure role

An infrastructure role is a role that should be present on every PostgreSQL cluster managed by the operator. An example of such a role is a monitoring user. There are two ways to define them:

With the infrastructure roles secret only
With both the the secret and the infrastructure role ConfigMap.
[See docs](https://postgres-operator.readthedocs.io/en/latest/user/)

- [ ] Setup "Per-cluster robot users" role for Hasura

- [ ] Define API that allows users to add postgres users by providing a Users/Team API. [See "Teams API roles" docs](https://postgres-operator.readthedocs.io/en/latest/user/)

- [ ] Setup Node-affinity to make sure all postgres clusters are running on their own pod or at least not the same as Nextjs. [See "Use taints and tolerations for dedicated PostgreSQL nodes" docs](https://postgres-operator.readthedocs.io/en/latest/administrator/)

- [ ] Define API that clones a cluster from an S3 bucket. [see "Clone from S3" docs](https://postgres-operator.readthedocs.io/en/latest/user/) and [see "Access to cloud resources from clusters in non-cloud environment" docs](https://postgres-operator.readthedocs.io/en/latest/administrator/) and [see "Using AWS S3 or compliant services
" docs](https://postgres-operator.readthedocs.io/en/latest/administrator/)

- [ ] Support increasing volume size [See "Increase volume size" docs](https://postgres-operator.readthedocs.io/en/latest/user/)

- [ ] Support logical backups. [See "Logical backups" docs](https://postgres-operator.readthedocs.io/en/latest/user/)

- [ ] Support delete protection. [See "Delete protection via annotations" docs](https://postgres-operator.readthedocs.io/en/latest/administrator/)

- [ ] Support password rotation. [See "Password rotation in K8s secrets" docs](https://postgres-operator.readthedocs.io/en/latest/administrator/)

- [ ] Support configurable min max instances. [See "Limiting the number of min and max instances in clusters" docs](https://postgres-operator.readthedocs.io/en/latest/administrator/)

- [ ] Use latest password encryption SCRAM-SHA-256. [See "Password encryption" docs](https://postgres-operator.readthedocs.io/en/latest/user/)
