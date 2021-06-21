export enum State {
  open = "open",
  pending = "pending",
  closed = "closed",
}

export interface IssueData {
  title: string;
  state: State;
  description: string;
}

// ISsue class
export class Issue {
  title: string;
  state: State;
  description: string;

  constructor(issue: IssueData) {
    this.title = issue.title;
    this.state = issue.state;
    this.description = issue.description;
  }
}
