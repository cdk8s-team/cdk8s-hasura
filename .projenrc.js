const { cdk8s } = require('projen');
const project = new cdk8s.ConstructLibraryCdk8s({
  author: 'Ryan Parker',
  authorAddress: 'parkerzr@amazon.com',
  cdk8sVersion: '1.4.10',
  defaultReleaseBranch: 'main',
  name: 'cdk8s-web-app',
  repositoryUrl: 'git@github.com:cdk8s-team/cdk8s-web-app.git',

  // deps: [],
  // devDeps: [], /* Build dependencies for this module. */
  peerDeps: [
    'cdk8s',
    'constructs',
  ],
  bundledDeps: [
    'cdk8s-plus-24',
  ],
  description: 'CDK8s construct for deploying a full stack web app.',
  packageName: 'cdk8s-web-app',
});
project.synth();
