import * as cdk8s from 'cdk8s';
// import * as kplus from 'cdk8s-plus-24';
import { Postgres } from '../src/index';

test('generates manifest, when provided the minimal parameters', () => {
  const app = new cdk8s.App();
  const chart = new cdk8s.Chart(app, 'chart');
  new Postgres(chart, 'postgres', {
    teamId: 'goldfish',
  });

  // TODO: Can't use this until the JSII / CDK8s+ bundling issue is resolved.
  // const postgresSecret = kplus.Secret.fromSecretName('')

  app.synth();
});
