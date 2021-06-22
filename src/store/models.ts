export enum IssueState {
  open = "open",
  pending = "pending",
  closed = "closed",
}

export interface IssueData {
  id?: string;
  title: string;
  state: IssueState;
  description: string;

  openDate?: Date;
  pendingDate?: Date;
  closedDate?: Date;
}

// ISsue class
export class Issue {
  id: string;
  title: string;
  state: IssueState;
  description: string;
  openDate?: Date;
  pendingDate?: Date;
  closedDate?: Date;

  constructor(issue: IssueData) {
    this.id = issue.id || "";
    this.title = issue.title;
    this.state = issue.state;
    this.description = issue.description;

    this.openDate = issue.openDate;
    this.pendingDate = issue.pendingDate;
    this.closedDate = issue.closedDate;
  }
}
