const { Cdk8sCommon } = require('@cdk8s/projen-common');
const { cdk } = require('projen');

const project = new cdk.JsiiProject({
  ...Cdk8sCommon.props,

  name: 'cdk8s-nextjs-web-app',
  description: 'nextjs-web-app construct for cdk8s.',
  author: 'Amazon Web Services',
  authorUrl: 'https://aws.amazon.com',
  keywords: [
    'kubernetes',
    'nextjs-web-app',
    'cdk8s',
    'dashboards',
    'observability',
  ],

  defaultReleaseBranch: 'main',
  repositoryUrl: 'https://github.com/cdk8s-team/cdk8s-nextjs-web-app.git',
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  peerDeps: [
    'cdk8s',
    'constructs',
  ],

  devDeps: [
    '@cdk8s/projen-common',
  ],

  publishToMaven: {
    javaPackage: 'org.cdk8s.nextjs-web-app',
    mavenGroupId: 'org.cdk8s',
    mavenArtifactId: 'cdk8s-nextjs-web-app',
  },

  publishToPypi: {
    distName: 'cdk8s-nextjs-web-app',
    module: 'cdk8s_nextjs-web-app',
  },

  publishToNuget: {
    dotNetNamespace: 'Org.Cdk8s.nextjs-web-app',
    packageId: 'Org.Cdk8s.nextjs-web-app',
  },

  depsUpgradeOptions: {
    workflowOptions: {
      schedule: Cdk8sCommon.upgradeScheduleFor('cdk8s-nextjs-web-app'),
    },
  },
});

new Cdk8sCommon(project);

project.synth();
