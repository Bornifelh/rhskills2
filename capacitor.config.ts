import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'rh.skills',
  appName: 'rh-skills',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
