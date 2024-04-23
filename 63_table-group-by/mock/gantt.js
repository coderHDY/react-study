export const ganttMock = {
  data: [
    {
      id: 1,
      text: "Task #1",
      start_date: "2019-04-15",
      duration: 3,
      progress: 0.6,
    },
    {
      id: 2,
      text: "Task #2",
      start_date: "2019-04-18",
      duration: 3,
      progress: 0.4,
    },
  ],
  links: [{ id: 1, source: 1, target: 2, type: "0" }],
};
const generateMock = () => {
  for (let i = 3; i < 10; i++) {
    ganttMock.data.push({
      id: i,
      text: `Task #${i}`,
      start_date: "2019-04-15",
      duration: 3,
      progress: 0.6,
    });
    ganttMock.links.push({
      id: i,
      source: i,
      target: i + 1,
      type: "0",
    });
  }
}
generateMock();