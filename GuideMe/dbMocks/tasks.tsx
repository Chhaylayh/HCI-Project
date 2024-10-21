type Tasks = {[key:string]: Task};
type taskStep = {
  title: string,
  description: string,
  imageURL:
    string};
type Task = {id: string, steps: taskStep[]};
let tasks : Tasks = {
  "How to set up VS Code": {id: "1", steps:[
    {
      title: "hello",
      description: "hello",
      imageURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fen.opensuse.org%2Fimages%2Fa%2Fa8%2FVS_Code_screenshot.png&f=1&nofb=1&ipt=ca1d56bb9cd0fe1585b88221fa54be2cedac4a0bc76a2eddb49168e683468944&ipo=images",
    },
    {
      title: "hello",
      description: "hello",
      imageURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fen.opensuse.org%2Fimages%2Fa%2Fa8%2FVS_Code_screenshot.png&f=1&nofb=1&ipt=ca1d56bb9cd0fe1585b88221fa54be2cedac4a0bc76a2eddb49168e683468944&ipo=images",
    },
  ],}
};
export default tasks;
