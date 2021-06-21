import { reactive, readonly } from "vue";
import { Issue, IssueData, IssueState } from "./models";

// constants
const server = process.env.VUE_APP_SERVER;

// Helper functions
const printError = (error: Error) => {
  console.log(error);
};

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

  //Store methods
  addIssue(issue: Issue) {
    this.state.issues.push(issue);
  }

  getIssues(): Issue[] {
    return this.getState().issues;
  }

  getIssueWithState(state: IssueState) {
    return this.getState().issues.filter((issue) => issue.state == state);
  }

  // Server methods
  // Fetch issues from server
  fetchIssues() {
    fetch(`${server}issues`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          data.forEach((issue: IssueData) => {
            this.addIssue(new Issue(issue));
          });
        } else {
          console.log("Data is not an array");
        }
      })
      .catch(printError);
  }

  createIssue(issue: Issue) {
    fetch(`${server}issue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issue),
    })
      .then((response) => response.json())
      .then((data: IssueData) => {
        const issue = new Issue(data);
        this.addIssue(issue);
      })
      .catch(printError);
  }
}

export const appStore: AppStore = new AppStore();
