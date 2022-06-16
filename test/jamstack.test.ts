import * as cdk8s from 'cdk8s';
import Jamstack from '../src/index';

test('generates manifest, when provided the minimal parameters', () => {
  const app = new cdk8s.App();
  const chart = new cdk8s.Chart(app, 'chart');

  new Jamstack(chart, 'jamstack', {
    teamId: 'goldfish',
    hasuraAdminSecret: 'admin-secret',
    nextjsImage: '495634646531.dkr.ecr.us-east-1.amazonaws.com/democracy-website:latest',
  });

  app.synth();
});
