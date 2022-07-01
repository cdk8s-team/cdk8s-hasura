import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus-24';
import { Hasura } from '../src/index';

test('generates manifest, when provided the minimal parameters', () => {
  const app = new cdk8s.App();
  const chart = new cdk8s.Chart(app, 'chart');

  new Hasura(chart, 'hasura', {
    adminSecret: 'admin-secret',
    host: 'postgres',
    database: 'postgres',
    postgresUsername: kplus.EnvValue.fromValue('postgres'),
    postgresPassword: kplus.EnvValue.fromValue('postgres'),
  });

  app.synth();
});
