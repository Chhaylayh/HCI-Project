type Users = { [username: string]: User };
export type User = {
  accountDate?: number,
  inProgress: (string|{id: string, step: number})[],
  finishedProjects: (string|{id: string})[],
  contributed: string[],
  relevantApps: string[],
  score: number,
};

const users : Users = {
    'emma': {
        inProgress: ['0'],
        finishedProjects: [],
        contributed: [],
        relevantApps: [],
        score: 0,
    }
}
export default users