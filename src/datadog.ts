import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
  clientToken: 'pubb87aed4a5c0b0a22e1287fc31320aa20',
  site: 'datadoghq.com',
  service: 'app01',
  env: 'dev',
  forwardErrorsToLogs: true,
  sampleRate: 100,
});

const dd = datadogLogs.logger;

export default dd;
