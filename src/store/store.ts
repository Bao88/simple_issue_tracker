import { reactive, readonly } from "vue";
import { Issue } from "./models";

// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class Store<T extends Object> {
  protected state: T;
  constructor() {
    const data = this.data();
    this.state = reactive(data) as T;
  }

  protected abstract data(): T;

  public getState(): T {
    return readonly(this.state) as T;
  }
}

interface App extends Object {
  // States interface
  issues: Issue[];
}

class AppStore extends Store<App> {
  protected data(): App {
    return {
      // States
      issues: new Array<Issue>(),
    };
  }

  // Methods
}

export const appStore: AppStore = new AppStore();
