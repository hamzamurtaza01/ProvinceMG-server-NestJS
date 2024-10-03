import prompts from 'prompts';
import removeInstallScripts from './scripts/remove-install-scripts';
// import removePostgreSql from './scripts/remove-postgresql';
// import removeRelationalResourceGeneration from './scripts/resource-generation-scripts/remove-relational';
import removeAllDbResourceGeneration from './scripts/resource-generation-scripts/remove-all-db';

(async () => {
  const response = await prompts(
    [
      {
        type: 'select',
        name: 'database',
        message: 'Which database do you want to use?',
        choices: [
          // { title: 'PostgreSQL and MongoDB', value: 'pg-mongo' },
          { title: 'PostgreSQL', value: 'pg' },
          // { title: 'MongoDB', value: 'mongo' },
        ],
      },
    ],
    {
      onCancel() {
        process.exit(1);
      },
    },
  );

  // if (response.database === 'pg-mongo') {
  //   removeRelationalResourceGeneration();
  //   removeDocumentResourceGeneration();
  // }

  // if (response.database === 'mongo') {
  //   removePostgreSql();
  //   removeRelationalResourceGeneration();
  //   removeAllDbResourceGeneration();
  // }

  if (response.database === 'pg') {
    // removeMongoDb();
    // removeDocumentResourceGeneration();
    removeAllDbResourceGeneration();
  }

  removeInstallScripts();
  process.exit(0);
})();
