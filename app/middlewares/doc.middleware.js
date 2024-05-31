import expressJSDocSwagger from "express-jsdoc-swagger";

const options = {
  info: {
    version: '1.0.0',
    title: 'Cadavre exquis API',
    description: 'La meilleure API de génération de cadavre exquis !',
  },
  // le répertoire de base ou le module ira analyser la JSdoc
  baseDir: import.meta.dirname,
  // Le motif des fichiers qu'il devra analyser dans ce repertoire global
  filesPattern: '../../**/*.js',
  // la route sur laquelle sera accessible la documentation HTML
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE || '/api-docs',
  // Est-ce que cette documentation HTML est accessible
  exposeSwaggerUI: true,
  // Est-ce que la documentation en JSON est accessible
  exposeApiDocs: false,
  // La route sur laquelle est disponible la document JSON
  apiDocsPath: '/v3/api-docs',
  // Si la valeur est true scela remplira les propriété non fourni par une valeur null
  notRequiredAsNullable: false,
  // Si on le souhaite on peut modifier l'apparence de l'interface HTML de la doc (cf. documentation du module)
  swaggerUiOptions: {},
};

/*
const generateDoc = expressJSDocSwagger(app);
generateDoc(options);
*/

export default (app) => expressJSDocSwagger(app)(options);
