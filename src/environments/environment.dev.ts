// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `index.ts`, but if you do
// `ng build --env=prod` then `index.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const AppConfig = {
  production: false,
  environment: 'DEV',
  firebase: {
    apiKey: 'AIzaSyB24xJP2SDk0jfkVGjgpR3vCvczSYllNjk',
    authDomain: 'dariwholesales.firebaseapp.com',
    databaseURL: 'https://dariwholesales.firebaseio.com',
    projectId: 'dariwholesales',
    storageBucket: 'dariwholesales.appspot.com',
    messagingSenderId: '646419101066'
  }
};
