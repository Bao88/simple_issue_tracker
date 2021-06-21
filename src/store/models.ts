export enum IssueState {
  open = "open",
  pending = "pending",
  closed = "closed",
}

export interface IssueData {
  title: string;
  state: IssueState;
  description: string;

  openDate?: Date;
  pendingDate?: Date;
  closedDate?: Date;
}

// ISsue class
export class Issue {
  title: string;
  state: IssueState;
  description: string;
  openDate?: Date;
  pendingDate?: Date;
  closedDate?: Date;

  constructor(issue: IssueData) {
    this.title = issue.title;
    this.state = issue.state;
    this.description = issue.description;

    this.openDate = issue.openDate;
    this.pendingDate = issue.pendingDate;
    this.closedDate = issue.closedDate;
  }
}
