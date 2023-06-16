# HTML Living Framework (2023)#

Framework for HTML game development, made by Relish Digital [https://reli.sh].

### Introduction

#### Why make this game framework?

PIXI.js is a great rendering engine, but it is not a game engine. It is not opinionated about projectr structure, and it
does not provide any common game development tools. This framework is designed to fill
that gap. It is Relish's opinionated approach to game development using PIXI.js.

### Documentation

* Available here: [Docs]
* Documentation is a work in progress and is incomplete. Speak to [Anthony](mailto:anthony@reli.sh)
  or [Rick](mailto:rick@reli.sh) if the information needed is not
  present.

### Development / Release Process

#### Feature development

##### Note: Please follow the [Conventional Commits Specification](https://conventionalcommits.org).

1. Develop your features in a separate branch in a feature or fix folder, E.G.: `git checkout -b feature/feature-name`
   or `git checkout -b fix/fix-name`.
2. As you're working on your feature, commit the branch to origin, E.G.: `git push -u origin feature/feature-name` (
   first commit) or `git push` (subsequent commits).
3. When ready with the feature or fix, create a PR against develop for others to review.
4. When PR is approved, merge the feature branch into develop, fix any merge conflicts.
5. Finish the PR.

#### New Version Release

1. When a release is ready, create a release branch off develop, E.G.: `git checkout develop && git pull`,
   then `git checkout -b release/release-name`.
2. Test and fix any bugs.
4. Merge the release branch into main, via PR? Or just merge?
5. The CI/CD pipeline should trigger Semantic Release on the main branch. Semantic Release will analyze the commit
   messages, increment the version number, generate the changelog, and publish the new version.

### Who do I talk to? ###

[Anthony Sapp](mailto:anthony@reli.sh) or [Rick Mason](mailto:rick@reli.sh)

#### Vite

Vite is used to build and bundle your project.

```Typescript
// Relish TODO: RM => Fill in this section
```

#### FFMPEG

* Audio compression requires that FFMPEG is installed. If you use Homebrew on OS X, this is as easy
  as: `brew install ffmpeg`. If you are on Windows, download FFMPEG [here][ffmpeg download].
* On Mac OS, the audio compression script in your project will also need executable permissions. Open a terminal and go
  to the `src/audio` directory in the project. `ls -lisa` will likely show the permissions on `compress_audio.sh`
  as `-rw-r--r--`. If this is the case run `chmod 755 compress_audio.sh` to make it executable.

#### Application

* Much of your application setup is done here.
* PIXI configuration options can be passed to `HLF.Application` during construction. `AppConfig` has properties for all
  settings, which can be found [here][pixi settings]. To override a default setting, pass in a json object with the
  appropriate keys and values.
* A static instance getter is required in all projects that are based on this framework. The getter should return the
  instance cast as the project's `Application` type. The application is created in the `src/index.ts` file.

```ts
import {Application} from "./scripts/Application";
// create the application with default settings
Application.create();
```

* Since the instance is used to retrieve the `Application`, the easiest way to tie this all together is to create a
  getter in the project `Application.ts` that looks like:

```ts
public static get
instance()
{
	if (HLF.Application._instance === undefined) {
		HLF.Application._instance = new Application();
	}
	return HLF.Application._instance as Application;
}
```

* `HLF.Application.createSplashScreen` should be overridden to customize the splashscreen. The splashscreen returned
  will need to inherit from `HLF.Splashscreen`.
* `HLF.Application.createAssetMap` should be overriden to populate the asset map.
* Any load screens should be registered in `HLF.Application.registerLoadScreens`.
* Any popups should be registered in `HLF.Application.registerPopups`.
* Any states should be registered in `HLF.Application.registerStates`.
* The `HLF.Application.requiredAssets` getter should be overridden to set assets than should never be unloaded. These
  could be common ui elements, fonts, etc...
* `HLF.Application.onLoadRequiredAssetsComplete` is where the splash screen transition to the first state is described.
* Some managers have formatted and coloured debug logs. Those that do can have them enabled by turning on their `debug`
  flag. This will show logs and warnings. Errors are always shown.

#### package.json

* Available npm commands can be found in the scripts section near the top.
* The commands in the framework include:
    * `build`
        * Builds the project by compiling all `ts` files to `js` files.
        * This is done using Vite.
    * `build:watch`
        * Runs the above `build` command and then watches for any source changes. It rebuilds the framework on change.
    * `lint`
        * Runs the typescript linter to check for format infractions.
        * All rules used can be found [here][lint-rules].
        * Any exceptions to the rules are found in the `tslint.json` file.
    * `docs`
        * Generates html documention using [Typedoc][typedoc].
    * `start`
        * Starts the vite dev server using the info in the `vite.config.js` file.
        * Opens a browser window/tab at the url of the dev server (localhost:3000 by default).
    * `build:debug`
        * Runs the `lint` command below.
        * Runs the webpack build process with the `env.dev` variable.
        * This variable can be used to optimize the built project. How we use this is still being determined. Rick has
          more information on the specifics at the moment.
    * `build:release`
        * Runs the `lint` command below.
        * Runs the `audio` command below.
        * Runs the webpack build process with the `env.prod` variable.
        * This variable can be used to optimize the built project. How we use this is still being determined. Rick has
          more information on the specifics at the moment.
    * `lint`
        * Same as the framework `lint` command.
    * `audio`
        * Runs the `cross-os audio` command that runs through all the `.wav` files in the src/audio/source folder,
          compresses and exports an `mp4` and `ogg` file into the `src/audio/output` folder. The output folder is
          deleted and remade during this command. The future plan is to have this command only generate output for any
          source that hasn't already been generated.

#### tsconfig.json

* Holds all of the typescript compiler options. The full set can be found [here][typescript-compiler-options].

#### tslint.json

* Describes the ruleset used for the typescript linter.
* Boilerplate and Framework ruleset both extend the recommended ruleset [here][typescript-recommended-ruleset].
* Exceptions to any rules in the `rules` or `jsRules` section in the above link are put in this file.

#### Audio

* All audio files need to be in the `src/assets/audio/source` folder. Any folder structure beyond that is purely
  organizational
  and will not affect the outcome of the `audio` command. This means that all audio files need to have a unique name.
  Currently, all audio tracks must be in the `.wav` format.

#### Fonts

* Current tool used to create bitmaptext is [Littera][littera]
    * Requires flash player to work and is not maintained as far as I can tell.
    * We’ve run into issues getting it to work with some fonts.
* There is a free alternative for Windows called [BM Font Generator][bm-font-generator]. I have not tried this
  alternative out.
    * There appears to be a way to generate a bitmap font through code [here][bm-font-code]. I have not looked into this
      much.
* There is a paid alternative for Mac called [BM Glyph][bm-glyph]. I have not tried this alternative out either.

#### Images

* TexturePacker is used to create atlases.
* Two folders:
    * `spritesheets`
        * This is where you organize your sheets. For each spritesheet you should have a folder of the source assets for
          the sheet and the texture packer project file (`.tps`)

      ![spritesheet-source](http://hlf.reli.sh/assets/images/spritesheet-source.png)

        * The project should output to the `spritesheets/_output` folder with the name `foo{v}.json`. The `{v}` will be
          replaced by either the `@2x` or `@1x` variant when you publish the sheet. These should already be setup in the
          boilerplate `ui.tps` so that file should just be duplicated when adding a new spritesheet.

      ![spritesheet-output](http://hlf.reli.sh/assets/images/spritesheet-output.png)

        * Sheets should be set to PNG-8 (indexed) if the quality of the asset does not suffer noticeably. Otherwise
          PNG-32 can be used. Other texture compression settings should be researched.
    * `static`
        * Any large images that can’t really fit on a spritesheet should be included here.

#### Spine

* To successfully load and use a spine character, a `.atlas`, `.png` and `.json` file are needed. There needs to be
  a `@1x` and `@2x` version of all three as well.

![spine-files](http://hlf.reli.sh/assets/images/spine-files.png)

* The only difference between the two variants is the size of the `.png` and which `.png` the `.atlas` file references.
  If the files need to be renamed, don’t forget to update the first line in the `.atlas` file to point to the
  correct `.png`:

![atlas-file](http://hlf.reli.sh/assets/images/atlas-file.png)

* **Note for any animators** - there should be no extension in the names of the regions in both the `.atlas` and `.json`
  files.

![spine-no-png](http://hlf.reli.sh/assets/images/spine-no-png.png)

#### StateManager and Transitions

* Handles all states and the transitions between them.
* Transitions are described using steps. This allows for fully customizable state transitions. Common transitions have
  been defined in `StateToken.ts`. Definitions of each step are in `StateManager.ts`.
* Current practice is to put state ids in the `Constants.ts` file to be easily used in the asset map and when requesting
  transitions.

#### Asset Map

* Abstract static class that holds a map of all the assets that each state, popup, or load screen needs.
* The map is a collection of `string` id and `AssetMapData[]` pairs.
* `AssetMapData` contains the name of the asset and the type of the asset.
* Current supported asset types are:
    * TEXTURE_ATLAS
    * PNG
    * JPG
    * FONT
    * SPINE
    * AUDIO
* The map is populated in `Application.createAssetMap`

```ts
createAssetMap()
{
	HLF.AssetMap.addAssetGroup(HLF.SplashScreen.NAME, [
		new HLF.AssetMapData("splash", HLF.AssetType.JPG),
		new HLF.AssetMapData(Constants.FONT_LUNA, HLF.AssetType.FONT),
	]);
	HLF.AssetMap.addAssetGroup(Constants.STATE_LANDING_PAGE, [
		new HLF.AssetMapData("splash", HLF.AssetType.JPG),
	]);
	HLF.AssetMap.addAssetGroup(Constants.STATE_GAME, [
		new HLF.AssetMapData("menu-bg", HLF.AssetType.PNG),
		new HLF.AssetMapData("game", HLF.AssetType.TEXTURE_ATLAS),
		new HLF.AssetMapData("instrument-keyboard-bg", HLF.AssetType.PNG),
		new HLF.AssetMapData("instrument-keyboard", HLF.AssetType.TEXTURE_ATLAS),
		new HLF.AssetMapData("andy", HLF.AssetType.SPINE),
		new HLF.AssetMapData("carmen", HLF.AssetType.SPINE),
		new HLF.AssetMapData("luna", HLF.AssetType.SPINE),
		new HLF.AssetMapData("leo", HLF.AssetType.SPINE),
		new HLF.AssetMapAudioData("backing_loop_0", HLF.AssetType.AUDIO, HLF.AudioCategory.BGM),
		new HLF.AssetMapAudioData("backing_loop_1", HLF.AssetType.AUDIO, HLF.AudioCategory.BGM),
		new HLF.AssetMapAudioData("pad_0", HLF.AssetType.AUDIO, HLF.AudioCategory.SFX),
		new HLF.AssetMapAudioData("pad_1", HLF.AssetType.AUDIO, HLF.AudioCategory.SFX),
		new HLF.AssetMapAudioData("pad_2", HLF.AssetType.AUDIO, HLF.AudioCategory.SFX),
		new HLF.AssetMapAudioData("pad_3", HLF.AssetType.AUDIO, HLF.AudioCategory.SFX),
		new HLF.AssetMapAudioData("pad_4", HLF.AssetType.AUDIO, HLF.AudioCategory.SFX),
		new HLF.AssetMapAudioData("pad_5", HLF.AssetType.AUDIO, HLF.AudioCategory.SFX),
		new HLF.AssetMapAudioData("solo_0_0_B", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_0_0_A", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_0_1_A", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_0_1_B", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_0_2_A", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_0_2_B", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_1_0_A", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_1_0_B", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_1_1_A", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_1_1_B", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_1_2_A", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_1_2_B", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_2_0_A", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_2_0_B", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_2_1_A", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_2_1_B", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_2_2_A", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
		new HLF.AssetMapAudioData("solo_2_2_B", HLF.AssetType.AUDIO, Constants.AUDIO_CATEGORY_SOLO),
	]);
}
```

#### Splashscreen

* Every project requires a splashscreen. This does not mean it has to have any visual aspect. All of the
  persistent/required assets are loaded on this screen. Each project’s implementation should inherit
  from `HLF.Splashscreen`.
* Override `HLF.Application.createSplashscreen` to use custom screen

#### Copy Manager

* The copy manager is meant to be the home for all copy in a game. This makes it easy to change and update copy as it
  all lives in one place. In addition to copy management, basic language support exists as well. A json object is passed
  in to `CopyManager.setData` to populate the dictionary.

```JSON
{
  "copy": {
    "loading": {
      "en_ca": "Loading..."
    }
  }
}
```

* Above is an example of a single entry. In this case, the `copy` object would be passed in to the `setData` function.
* This makes it quite versatile in that the copy object can be retrieved from anywhere and then passed in at any point
  before copy is required.
* The default language is `en_ca`, but the current language can be changed on the fly. Interested classes can register
  for language changed events.

#### Web Events Manager

* This is intended to handle most web events and trigger callbacks on interested class. The only events handled at the
  moment are the [Visibility Changed][page-visibility-api] and [Resize][resize-api] events.
* Interested class register callbacks to be run when events occur.

#### Modifying the Framework

* Pull the repo.
* Run `npm install`.
* Modify typescript files.
* Run `npm run build:watch`.
* This will build the framework and watch for any future changes. When a change occurs, the framework is rebuilt.

#### Testing the framework locally

* Since the framework can't run on it's own, there is a process to have a project use a local version of the repo
  instead of pulling a remote one.
* In your local copy of the framework, run `npm link`
* Inside a project that depends on the framework, run `npm link html-living-framework`
* This sometimes requires a refresh of VSCode. You may even have to delete the node-modules folder and run `npm install`
  to install all dependencies fresh.
* Run `npm start` in the project that uses the framework, and `npm build:watch` in the framework folder
* With the framework built with the watch parameter, changes to it will cause a recompilation, which in turn will cause
  a recompilation of the project.

#### Starting a new project

* Get repo created, this usually falls to Rick.
* Clone the boilerplate project, copy it into the repo and commit + push.
* Run `npm install`.
* Run `npm run start` to test the project.
* Modify the following lines in `package.json`:

![new-project-package-json](http://hlf.reli.sh/assets/images/new-project-package-json.png)

* Modify the title in the `template/index.html` file:

![new-project-index-ts](http://hlf.reli.sh/assets/images/new-project-index-ts.png)

* Create a state using the instructions in [Creating a State](#creating-a-state).
* Set new state as default state using the instructions
  in [Setting the first scene to load](#setting-the-first-scene-to-load).

#### Creating a State

* Create a class that extends `HLF.State`.
* Register that class in `Application.registerState`.
* Add an id for the state to `Constants.ts`.
* Add a section in `Application.createAssetMap` for the new state.

#### Creating a Popup

* Create a class that extends `HLF.Popup`.
* Register that class in `Application.registerPopup`.
* Add an id for the popup to `Constants.ts`.
* **Note** - The popup system has not been used since PBS Chef Leo and should be looked at and tested.

#### Creating a Load Screen

* Create a class that extends `HLF.LoadScreen`.
* Register that class in `Application.registerLoadScreens`.
* Add an id for the load screen to `Constants.ts`.
* Assets required for the load screen should be added to the `Application.requiredAssets` getter.

#### Setting the Splashscreen

* Create a class that extends `HLF.Splashscreen`.
* Create and return an instance of the class in `Application.createSplashscreen`.
* Add a section in `Application.createAssetMap` for the splashscreen using `HLF.Splashscreen.NAME` as the id.

#### Setting the required assets

* Return an array of `HLF.AssetMapData` objects in `Application.requiredAssets`.

#### Setting the first scene to load

* For development, the Constants.DEBUG_DEFAULT_STATE can be set to any state. If it is set, it will be the state that is
  transitioned to after the splashscreen loading is complete.
* This occurs in `Application.onLoadRequiredAssetsComplete`. If the debug state is undefined, whatever state is desired
  should be transitioned to from here.

![new-project-change-first-state](http://hlf.reli.sh/assets/images/new-project-change-first-state.png)

#### HLF urls for installation

* Use the latest release of HLF:

```npm
"html-living-framework":"git+https://github.com/relishinc/hlf#release",
```

* Use a specific version of HLF:

```npm
"html-living-framework": "git+https://github.com/relishinc/hlf#0.12.5",
```

* Use a local version of HLF:

```npm
"html-living-framework": "file:../hlf",
```

* **Note** - Committing the local url to your repo will always cause a jenkins build to fail.

[Docs]: http://hlf.reli.sh/docs/

[ffmpeg download]: https://ffmpeg.org/download.html

[pixi settings]: http://pixijs.download/dev/docs/PIXI.Application.html

[lint-rules]: https://palantir.github.io/tslint/rules/

[typedoc]: https://typedoc.org/

[typescript-compiler-options]: https://www.typescriptlang.org/docs/handbook/compiler-options.html

[typescript-recommended-ruleset]: https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts

[littera]: http://kvazars.com/littera/

[bm-font-code]: https://github.com/Jam3/msdf-bmfont

[bm-font-generator]: http://www.angelcode.com/products/bmfont/

[bm-glyph]: https://apps.apple.com/us/app/bmglyph/id490499048?l=us&ls=1&mt=12

[page-visibility-api]: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API

[resize-api]: https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
