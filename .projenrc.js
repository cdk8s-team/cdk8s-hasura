const { Cdk8sTeamJsiiProject } = require('@cdk8s/projen-common');

const project = new Cdk8sTeamJsiiProject({
  defaultReleaseBranch: 'main',
  name: 'cdk8s-hasura',
  peerDeps: [
    'cdk8s-plus-24',
    'cdk8s',
    'constructs',
  ],
  devDeps: [
    '@cdk8s/projen-common',
  ],
  description: 'CDK8s construct for deploying a Hasura instance.',
});

project.synth();
