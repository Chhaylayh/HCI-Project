type Users = { [username: string]: User };
type User = {
  accountDate?: Date,
  inProgress: string[],
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