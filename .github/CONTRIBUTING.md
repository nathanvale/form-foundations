# Contributing to Form Foundations

1. Fork this repository to your own GitHub account and then clone it to your local device.
2. Install the dependencies: `yarn install`.
3. Run `yarn bootstrap` to bootstrap the packages in the current Lerna repo. Installing all their dependencies and linking any cross-dependencies.
4. Run `yarn start` to build and watch for code changes.
5. Run `yarn test` to start Jest.
6. Then yarn link any package inside any other project on your local dev with `yarn link @form-foundations/{your package name here}`
7. Then you can use your local version of your Form Foundations package within your project
