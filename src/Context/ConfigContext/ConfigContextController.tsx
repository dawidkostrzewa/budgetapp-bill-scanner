import React, { ReactNode, useMemo, useState } from 'react';
import { ConfigContext } from './ConfigContext';

export const ConfigContextController = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [env, setEnv] = useState<'dev' | 'production'>('dev');

  const value = useMemo(() => ({ env, setEnv }), [env]);

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};
