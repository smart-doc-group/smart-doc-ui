import fs from 'fs';
import path from 'path';

interface TypeGenerationConfig {
  baseUrl: string;
  swaggerList: {
    dir: string;
    name: string;
  }[];
}

/**
 * obtain configuration
 * @return {Promise<TypeGenerationConfig>} custom configuration
 */
export const getConfig = (): Promise<TypeGenerationConfig> => {
  return new Promise((resolve) => {
    let configFile = path.join(process.cwd(), 'type-generation.js');
    if (!fs.existsSync(configFile)) {
      configFile = path.join(process.cwd(), 'config', 'type-generation.js');
      if (fs.existsSync(configFile)) {
        import(configFile).then((res) => {
          resolve(res);
        });
      }
    } else {
      import(configFile).then((res) => {
        resolve(res);
      });
    }
  });
};
