# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Breaking Changes
- Dependency update to PIXI.js version 5.x
---
## [0.29.0] - 2020-12-16
### Added
- VoiceOverManager emits `VOICEOVER_STARTED` and `VOICEOVER_ENDED` events (useful for lip sync)
### Fixed
- Prevent Hover VOs from playing when keyboard refocuses
---
## [0.28.0] - 2020-09-16
### Added
- VoiceOverManager debug logging
- LoadScreen Factory
- RotatePromptManager
### Changed
- Bugfix to PixelPerfectHitArea
- Bugfixes to VoiceOverManager
### Breaking Changes
- OrientationManager is no longer inherited from PIXI.Contatiner
---
## [0.27.1] - 2020-02-28
### Changed
- `FORCE_FOCUS` event works only if the keyboard is active and has no effect otherwise
## [0.27.0] - 2020-02-27
### Breaking Changes
- Updated Spine runtime dependency; we only support files exported from **Spine version 3.8** and above
### Added
- Added Specific classes for asset types (e.g. `TextureAsset("foo")` instead of `AssetMapData("foo", AssetType.Texture)`).
- Added `AssetFactory`, which is a handy way to define an array of similarly-named assets
- Added VoiceOverManager (`Application.instance.voiceover`)
- Added SaveManager (`Application.instance.saveManager`)
- Added KeyboardFocusManager (see [boilerplate](https://bitbucket.org/relishinc/relish-hlf-boilerplate/commits/2e0eb2aa89db0756ce6c3a78de156027a20cbf35#Lsrc/scripts/Application.tsT129) for example `IKeyboardFocus` usage)
- Added `RectUtils.size()`
- Added `Button.changetext()`
- Added `LogUtils.log()`, `.logError()`, and `.logWarning()`
- Added support for binary (.skel) Spine exports
- Added ability to pass data between States, using `StateToken` (the data is passed to `State.init()`)
- Added ability to pass data into Popups, using `PopupToken` (the data is passed to `Popup.show()`)

### Changed
- `KeyboardMap` and `KeyboardManager` have been modified internally, but usage and behaviour should stay the same
### Deprecated
- Deprecated `Topics.RE_MAP_KEYBOARD` and `Topics.SET_KEYBOARD_AUTOMAP`
- `AssetMapData` is still supported but will be removed in a future release
---
## [0.26.0] - 2020-02-03
### Added
- Add ability to have multiple spine .json files share a .atlas (and .png files)
- Added `Topics.AUDIO_LOAD_ERROR`
### Changed
- `HowlerManager` will try to load webm, mp3, ogg, and m4a (in that order), even if some files are missing
## [0.25.0] - 2020-01-24
### Added
- `Topics.SET_KEYBOARD_ENABLED` that allows to disable handling of `keydown` events in `KeyboardManger`
---
## [0.24.0] - 2020-01-07
### Fixed
- `Selectable` and `Receptacle` now correctly return global coordinates for `getFocusSize` and `getFocusPosition`
### Changed
- `LoadManager` now calls `spineAtlas.dispose()` when unloading Spine resources. This unloads the `baseTexture`s from PIXI's texture cache.
### Added
- Added `PixiUtils.getGlobalBounds`
---
## [0.23.0] - 2019-12-03
### Added
- Keyboard navigation now skips disabled or hidden (`worldVisible: false`) nodes
- `OrientationManager` Handles orientation prompts
___
## [0.22.0] - 2019-09-26
### Fixed
- Fixed a bug where IFocusable items could still be selected by the keyboard system if their `interactive` flag was set to `false`.
- Fixed a bug where the constructor of `AppConfig` was incorrectly setting the resolution parameter in an event where the `pConfig` file was passing in something that was not a number.

### Added
- `AppConfig` now has a section at the beginning of the constructor that if a config is provided but particular properties are not set that need to be, sanity checks can be done in the `else` block.
___
## [0.21.0] - 2019-09-17
### Added
- Added a setter to `SpriteAnimation.framerate`
### Changed
- `LoadScreen.onLoadProgress` is now called for audio file loads as well. Note that this starts back at zero (i.e. the bar will fill twice).
___
## [0.20.0] - 2019-08-22
### Fixed
- `StateManager` now skips any files specified in `Application.requiredAssets` when determining which assets to unload as part of a state transition.
- `LoadManager` now loads audio last, instead of first. This fixes an issue with PIXI loaders that request additional assets asynchronously (e.g. `PIXI.SpritesheetLoader`)
___
## [0.19.0] - 2019-08-13
### Added
- Expanded functionality for `PopupManager`
### Fixed
- Updated documentation for `Random.floatBetween` and `Random.intBetween`
___
## [0.18.0] - 2019-08-02
### Added
- Added `PixiUtils.getTexture`, which supports multi-page spritesheets.
- Added an optional starting frame parameter to `SpriteAnimation`.
### Changed
- `PixiUtils.makeSprite` now supports multi-page spritesheets, by passing an array of spritesheet names instead of just one.
### Fixed
- Fixed a bug (possibly indroduced by 0.17.1) that prevented the first `State` after `SplashScreen` (often called `LandingPage`) from loading any assets.
___
## [0.17.1] - 2019-07-03
### Fixed
- Removed an errant callback causing transitions to continue before all loading was finished.
___
## [0.17.0] - 2019-07-02
### Added
- Added a `WebEventsManager` that allows interested parties to register to browser events.
- Basic language support for the CopyManager with Canadian english as the default.
### Changed
- Replaced the browser blur and focus audio handling with browser visibility api.
- Asset loading is more general now and can load audio tracks. All assets added to the `AssetMap` will have to be an `AssetMapData` object or a derived class.
### Removed
- `IAudioManager.isInFocus` and `HowlerManager._isInFocus`
___
## [0.16.1] - 2019-06-25
### Fixed
- Audio track volumes are now updated even if they aren't playing. This fixes a bug where tracks that weren't playing during a browser blur event wouldn't get their audio updated. This could cause tracks to incorrectly play at their full volume if the browser was not in focus.
___
## [0.16.0] - 2019-06-03
### Added
- `SplashScreen` is now part of the framework as every project will have a splash screen to load required assets. Return the splash screen to be used in `Application.createSplashScreen`, which gets passed into the `LoadManager`s constructor. It does not need to be registered as a load screen.
- A special transition flow for the splash screen that runs as follows:
    1. Load splash screen assets.
    2. Create and show splash screen.
    3. Load required and persistent assets.
    4. Hide splash screen.
- An asset map class that replaces all `getRequiredAssets` functions. This is defined in `Application.createAssetMap` per project.
- A to hex conversion function in `Colour` that will return a 6 digit hex string like `00a020`
- `makeText` helper function added to `PixiUtils`.
- Enum defining standard definition of spine tracks for characters.
- `TextureSwapButton`. This button has textures set for different input states and swaps between them.

### Changed
- State transition is no longer set automatically and must be described using transition steps.
    - Preset transitions exist in `StateToken`.
    - Steps can been seen in the `StateManager.TransitionStep` enum.
- App required and persistant assets, such as fonts and load screen assets, are now defined in `Application.requiredAssets` instead of the splash screens required assets.
- Managers are now created in the `constructor` instead of the `init` function. This is to allow the setting of debug flag before the managers are first used but after they are created.
- Button text colour now defaults to black instead of white.
- Renamed managers in `Application` from `_foo` to `_fooManager`.
___
## [0.15.0] - 2019-05-17
### Added
- `LogUtils` class to hold useful styling for logs.
- `isMobile` wrapper to `PlatformUtils`.
- `pColor` parameter to `Button.addText`.
- `pFontSize` parameter to `Button.addText`.
- Documentation to `LoadManager`.
- Documentation to `StateManager`.
- Optional logs to `LoadManager`.
- Optional logs to `StateManager`.

### Changed
- State transition flow. It's now as follows:
    1. Transition requested.
    2. Current state animates out.
    3. Load screen animates in.
    4. Current state cleaned up.
    5. Unused assets are unloaded.
    6. New state assets loaded.
    7. New state created.
    8. Load screen animate out.
    9. New state animate in.
- `AppConfig` now automatically sets `transparent` to true on Amazon OS instead of `preserveDrawingBuffer`.

### Removed
- `pOnce` parameter from `IAudioTrack` as it was not being used.
___
## [0.14.1] - 2019-05-06
### Fixed
- The `_currState` property in `StateManager` is no longer deleted but instead it's value is set to `undefined`.
___
## [0.14.0] - 2019-04-05
### Added
- `AppConfig` PIXI app configuration flow. Create a JSON object and pass it into the Application to configure PIXI.
- `CopyManager` that takes a JSON object to populate.
- Documentation to `Colour`.

### Changed
- Refactored `BrowserUtils` to `PlatformUtils` and added further platform queries.

### Deprecated
- `IAudioManager.isInFocus`.
___
## [0.13.0] - 2019-03-14
### Added
- Changelog to track all changes.
- New generalized audio manager implementation.
- `readonly AudioManager.isInFocus` added.

### Changed
- `AudioManager` is now `HowlerManager`.
- `Application.instance.audio` now returns an `IAudioManager`.
- `AudioManager.play` no longer returns an `IAudioTrack`.
- `AudioManager.preload` renamed to `IAudioManager.load`.

[0.29.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.29.0
[0.28.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.28.0
[0.27.1]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.27.1
[0.27.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.27.0
[0.26.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.26.0
[0.25.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.25.0
[0.24.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.24.0
[0.23.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.23.0
[0.22.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.22.0
[0.21.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.21.0
[0.20.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.20.0
[0.19.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.19.0
[0.18.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.18.0
[0.17.1]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.17.1
[0.17.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.17.0
[0.16.1]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.16.1
[0.16.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.16.0
[0.15.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.15.0
[0.14.1]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.14.1
[0.14.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.14.0
[0.13.0]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/0.13.0
[Unreleased]: https://bitbucket.org/relishinc/html-living-framework/commits/tag/develop
