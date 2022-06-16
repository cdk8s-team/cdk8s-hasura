const { cdk8s, DependencyType } = require('projen');
const project = new cdk8s.ConstructLibraryCdk8s({
  author: 'Ryan Parker',
  authorAddress: 'parkerzr@amazon.com',
  cdk8sVersion: '2.3.21',
  defaultReleaseBranch: 'main',
  name: 'cdk8s-jamstack',
  repositoryUrl: 'git@github.com:cdk8s-team/cdk8s-jamstack.git',

  // deps: [],
  // devDeps: [], /* Build dependencies for this module. */
  peerDeps: [
    'cdk8s-plus-24',
  ],
  description: 'CDK8s construct for deploying a full stack web app.',
  packageName: 'cdk8s-jamstack',
});
project.deps.removeDependency('constructs', DependencyType.PEER);
project.deps.addDependency('constructs', DependencyType.PEER);
project.synth();
