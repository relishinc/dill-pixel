# Changelog

## [2.1.1](https://github.com/relishinc/hlf/compare/v2.1.0...v2.1.1) (2023-08-30)


### Bug Fixes

* release-please flow ([34a17e4](https://github.com/relishinc/hlf/commit/34a17e4d71a6ca6f7607bfb734444ac373a1175a))

## [2.1.0](https://github.com/relishinc/hlf/compare/v2.0.4...v2.1.0) (2023-08-30)


### Features

* adding the creation and saving of version.ts to the release-please workflow ([76ed31f](https://github.com/relishinc/hlf/commit/76ed31fd9ca801c96d31348e6161ef42bb1fab60))
* merged cavlfo upgrades ([980c6eb](https://github.com/relishinc/hlf/commit/980c6eb546d97c44baf44edaa01bcc8afa25bd95))
* remove the need for the lib folder ([5fabdb7](https://github.com/relishinc/hlf/commit/5fabdb780af312f2c0b206d7b2f80fc28d9a2577))
* switched from pubsub to signals, feat: re-vamped state manager a bit, chore: code cleanup ([874881b](https://github.com/relishinc/hlf/commit/874881b91a594e7fbc43bc0ead2c8d862058da4f))


### Bug Fixes

* github action ([b562ced](https://github.com/relishinc/hlf/commit/b562ced12712adfb7c854628f7169bfc3b1f57f6))

## [2.0.4](https://github.com/relishinc/hlf/compare/v2.0.3...v2.0.4) (2023-08-14)


### Bug Fixes

* spritesheet multipack implementation pulling texture from multipack implementation ([ee539bc](https://github.com/relishinc/hlf/commit/ee539bca6108f947342bd49b830990d103a023c1))

## [2.0.3](https://github.com/relishinc/hlf/compare/v2.0.2...v2.0.3) (2023-08-14)


### Bug Fixes

* spritesheet multipack implementation ([a2ae5b4](https://github.com/relishinc/hlf/commit/a2ae5b43969e8ced4286f4e87cdb60ec048b146c))

## [2.0.2](https://github.com/relishinc/hlf/compare/v2.0.1...v2.0.2) (2023-08-09)


### Bug Fixes

* ticker not starting in some cases ([34169e3](https://github.com/relishinc/hlf/commit/34169e3958d154edd9ce13640e4af63f93e4d6ca))

## [2.0.1](https://github.com/relishinc/hlf/compare/v2.0.0...v2.0.1) (2023-08-08)


### Bug Fixes

* topics export weirdness ([636b8c8](https://github.com/relishinc/hlf/commit/636b8c8cc9562a7f1f4f6705321b389ac90dd2e7))

## [2.0.0](https://github.com/relishinc/hlf/compare/v1.6.2...v2.0.0) (2023-08-08)


### ⚠ BREAKING CHANGES

* changed Popup class to be non-abstract

### Features

* added access to popupmanager via app.popups, ([eaf5a5a](https://github.com/relishinc/hlf/commit/eaf5a5a88bd4d6d4dd06e730a618073ace86633f))


### Bug Fixes

* fixed StateManager error on initial transition ([eaf5a5a](https://github.com/relishinc/hlf/commit/eaf5a5a88bd4d6d4dd06e730a618073ace86633f))

## [1.6.2](https://github.com/relishinc/hlf/compare/v1.6.1...v1.6.2) (2023-08-04)


### Bug Fixes

* changed pubsub implementation ([cd006e9](https://github.com/relishinc/hlf/commit/cd006e96b05804aaab38f01d0c21a1ba4595da80))

## [1.6.1](https://github.com/relishinc/hlf/compare/v1.6.0...v1.6.1) (2023-07-11)


### Bug Fixes

* default load screen in state manager ([22ace40](https://github.com/relishinc/hlf/commit/22ace405dde487275d75c7fb1bf403b967dc58fe))
* merged ([7810dfd](https://github.com/relishinc/hlf/commit/7810dfdf3c9d137d8deb386a548fefa7a860b70f))

## [1.6.0](https://github.com/relishinc/hlf/compare/v1.5.0...v1.6.0) (2023-06-26)


### Features

* add circular graphics based sprite, more work on rapier composite gameobject ([f55b44b](https://github.com/relishinc/hlf/commit/f55b44b8566134888c1ad3712c5e486f5a37df27))

## [1.5.0](https://github.com/relishinc/hlf/compare/v1.4.0...v1.5.0) (2023-06-26)


### Features

* rapier physics settings, composite gameobject ([759b935](https://github.com/relishinc/hlf/commit/759b935c414b959da4481dc1a80d12b56f5b5c22))

## [1.4.0](https://github.com/relishinc/hlf/compare/v1.3.0...v1.4.0) (2023-06-23)


### Features

* added bare bones rapier physics example ([04dbef8](https://github.com/relishinc/hlf/commit/04dbef858f4c20d15cf881be098f542917e9fcb3))

## [1.3.0](https://github.com/relishinc/hlf/compare/v1.2.11...v1.3.0) (2023-06-23)


### Features

* workin on adding opt-in physics libraries - making sure they code-split properly ([83b764a](https://github.com/relishinc/hlf/commit/83b764ab71630bd49d3473b5e325bcfbf42732c7))


### Bug Fixes

* proper code splitting from physics libraries (tested with builds) ([0ce2c4b](https://github.com/relishinc/hlf/commit/0ce2c4bec53d42928fce74a664427c3a1d90b8d3))
* removed examples/dist folder from git ([7b2a4c8](https://github.com/relishinc/hlf/commit/7b2a4c8ff5f35ce7ff40a30bb4038c5e0b14be16))

## [1.2.11](https://github.com/relishinc/hlf/compare/v1.2.10...v1.2.11) (2023-06-21)


### Bug Fixes

* trying release notification hook using a delay ([97c10f5](https://github.com/relishinc/hlf/commit/97c10f5906d4e3aad6b99343119af1e4f1c7e804))

## [1.2.10](https://github.com/relishinc/hlf/compare/v1.2.9...v1.2.10) (2023-06-21)


### Bug Fixes

* trying release notification hook using github api ([db5ffa7](https://github.com/relishinc/hlf/commit/db5ffa760150b5584ff8feb2d5c5fc61b0c9b44e))

## [1.2.9](https://github.com/relishinc/hlf/compare/v1.2.8...v1.2.9) (2023-06-21)


### Bug Fixes

* trying release notification hook using github api ([03b30ff](https://github.com/relishinc/hlf/commit/03b30fffaf8b181585245e3d3373061cddc82222))

## [1.2.8](https://github.com/relishinc/hlf/compare/v1.2.7...v1.2.8) (2023-06-21)


### Bug Fixes

* fixing the notification action to pull the latest tag ([ebf3a1e](https://github.com/relishinc/hlf/commit/ebf3a1ef592deef24fbc8de3f0659b855738778d))

## [1.2.7](https://github.com/relishinc/hlf/compare/v1.2.6...v1.2.7) (2023-06-21)


### Bug Fixes

* changed notification action ([cab4492](https://github.com/relishinc/hlf/commit/cab44929ce277523b0db8535a5b4959b93197a18))

## [1.2.6](https://github.com/relishinc/hlf/compare/v1.2.5...v1.2.6) (2023-06-21)


### Bug Fixes

* added fetch-depth:0 to notification action ([fbd2fc3](https://github.com/relishinc/hlf/commit/fbd2fc31a192f7accab6688827516f34e29cf54e))

## [1.2.5](https://github.com/relishinc/hlf/compare/v1.2.4...v1.2.5) (2023-06-21)


### Bug Fixes

* docs deploy and release notifications should only run when PR is merged ([809ff1e](https://github.com/relishinc/hlf/commit/809ff1ecb77384a554cfd369802b156c2d0f368b))

## [1.2.4](https://github.com/relishinc/hlf/compare/v1.2.3...v1.2.4) (2023-06-21)


### Bug Fixes

* docs deploy and release notifications should only run when PR is merged ([50e9c98](https://github.com/relishinc/hlf/commit/50e9c982f2a357f30121d27017c698f7f4c83257))

## [1.2.3](https://github.com/relishinc/hlf/compare/v1.2.2...v1.2.3) (2023-06-21)


### Bug Fixes

* docs deploy and release notifications should only run when PR is merged ([c1a1779](https://github.com/relishinc/hlf/commit/c1a1779e401ce5e0adb0c401e87e85727a4f2f46))

## [1.2.2](https://github.com/relishinc/hlf/compare/v1.2.1...v1.2.2) (2023-06-21)


### Bug Fixes

* docs deploy and release notifications should only run when PR is merged ([b4999a2](https://github.com/relishinc/hlf/commit/b4999a25a09c37da34fab35c5261ab464770acab))

## [1.2.1](https://github.com/relishinc/hlf/compare/v1.2.0...v1.2.1) (2023-06-21)


### Bug Fixes

* added release google chat notification ([26b3ce8](https://github.com/relishinc/hlf/commit/26b3ce835d022f46719152974201d4cf1f05e92f))

## [1.2.0](https://github.com/relishinc/hlf/compare/v1.1.1...v1.2.0) (2023-06-21)


### Features

* added commitlint, docs:added a different github action for docs ([8ee69e3](https://github.com/relishinc/hlf/commit/8ee69e337c7e89e7fd35eef6fae2b7781c4b1f1a))

## [1.1.1](https://github.com/relishinc/hlf/compare/v1.1.0...v1.1.1) (2023-06-16)


### Bug Fixes

* typo in readme ([30d5df8](https://github.com/relishinc/hlf/commit/30d5df8606a846243e4dcb205bce1dd8e574aa4d))

## [1.1.0](https://github.com/relishinc/hlf/compare/v1.0.0...v1.1.0) (2023-06-16)


### Features

* updated readme ([#3](https://github.com/relishinc/hlf/issues/3)) ([1853a31](https://github.com/relishinc/hlf/commit/1853a314e9ae5b2eac53d4e70d8d7180d7b6d8de))

## 1.0.0 (2023-06-16)


### Features

* allow application creation with one line ([#1](https://github.com/relishinc/hlf/issues/1)) ([aced7ec](https://github.com/relishinc/hlf/commit/aced7ecff29da817d4062875ed228374e09a1907))

## Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
