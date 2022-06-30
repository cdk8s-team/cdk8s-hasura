const { cdk8s, DependencyType } = require('projen');
const project = new cdk8s.ConstructLibraryCdk8s({
  author: 'Ryan Parker',
  authorAddress: 'parkerzr@amazon.com',
  cdk8sVersion: '2.3.21',
  defaultReleaseBranch: 'main',
  name: 'cdk8s-hasura',
  repositoryUrl: 'git@github.com:cdk8s-team/cdk8s-hasura.git',
  peerDeps: [
    'cdk8s-plus-24',
  ],
  description: 'CDK8s construct for deploying a Hasura instance.',
  packageName: 'cdk8s-hasura',
});
project.deps.removeDependency('constructs', DependencyType.PEER);
project.deps.addDependency('constructs', DependencyType.PEER);
project.tryRemoveFile('.DS_Store');
project.synth();
