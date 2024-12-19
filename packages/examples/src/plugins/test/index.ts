import { IApplication, Plugin } from "dill-pixel";

export default class TestPlugin extends Plugin{
    public initialize(_app: IApplication) {
        console.log('TestPlugin initialized', _app);
    }
}
