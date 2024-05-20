# Tennis SPA

This is a React-based frontend for the [Tennis web app](https://github.com/cwd18/Tennis-web-app). The frontend is implemented as a single page application (SPA). The SPA includes a user view and an admin view.

This project is based on the [Vite build tool](https://main.vitejs.dev/), which was installed with 'npm create vite@latest' and selecting the 'react-swc' template.

It uses the [pure.css library](https://purecss.io/), which was installed with 'npm install purecss --save'

It also uses [React Router](https://reactrouter.com/en/main), which was installed with 'npm install react-router-dom localforage match-sorter sort-by'

The deploy.sh script builds the app for production and then copies the build to a react directory in the 'Tennis web app" project workspace, where it is uploaded by a 'gcloud app deploy' and served as a static file.