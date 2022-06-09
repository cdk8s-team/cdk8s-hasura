const { cdk8s } = require('projen');
const project = new cdk8s.ConstructLibraryCdk8s({
  author: 'Ryan Parker',
  authorAddress: 'ryan.parker3@outlook.com',
  cdk8sVersion: '1.4.10',
  defaultReleaseBranch: 'main',
  name: 'cdk8s-web-app',
  repositoryUrl: 'git@github.com:cdk8s-team/cdk8s-web-app.git',

  // deps: [],
  peerDeps: [
    'cdk8s',
    'constructs',
  ],
  bundledDeps: [
    'cdk8s-plus-24',
  ],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [], /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
