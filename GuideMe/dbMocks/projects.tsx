import { TaskStep } from "./tasks";

export type Projects = { [id: string]: Project };
export type Project = {
  app: string;
  title: string;
  published?: boolean;
  date?: Date;
  steps: TaskStep[];
};

const projects: Projects = {
  "0": {
    app: "VS Code",
    title: "hello",
    steps: [
      {
        title: "start",
        description: "sign up",
        imageURL:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fen.opensuse.org%2Fimages%2Fa%2Fa8%2FVS_Code_screenshot.png&f=1&nofb=1&ipt=ca1d56bb9cd0fe1585b88221fa54be2cedac4a0bc76a2eddb49168e683468944&ipo=images",
      },
    ],
  },
};
export default projects;
