type Users = { [username: string]: User };
export type User = {
  accountDate?: number,
  inProgress: (string|{id: string, step: number})[],
  contributed: string[],
  relevantApps: string[],
  score: number,
};

const users : Users = {
    'emma': {
        inProgress: ['0'],
        contributed: [],
        relevantApps: [],
        score: 0,
    }
}
export default users