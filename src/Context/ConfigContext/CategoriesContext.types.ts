export interface ConfigContextValue {
  env: 'dev' | 'production';
  setEnv: (env: 'dev' | 'production') => void;
}
