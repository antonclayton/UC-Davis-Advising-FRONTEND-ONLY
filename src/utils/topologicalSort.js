export const topologicalSort = (courses) => {
  // create adjacency list and in-degree map
  const adjacencyList = {};
  const inDegree = {};

  courses.forEach((course) => {
    adjacencyList[course.courseCode] = [];
    inDegree[course.courseCode] = 0;
  });

  // increment inDegree for however many prereqs the course has
  courses.forEach((course) => {
    course.prerequisites.forEach((prereq) => {
      if (!adjacencyList[prereq]) {
        console.error(`Prerequisite ${prereq} not found in course list`);
        return;
      }
      // console.log(`${course.courseCode} - ${prereq}`);
      adjacencyList[prereq].push(course.courseCode);
      inDegree[course.courseCode]++;
    });
  });

  //queue for nodes with no prereqs
  const queue = [];
  for (const course in inDegree) {
    if (inDegree[course] === 0) queue.push(course);
  }

  const sortedOrder = [];

  while (queue.length > 0) {
    const current = queue.shift();
    sortedOrder.push(current);

    adjacencyList[current].forEach((neighbor) => {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }

  if (sortedOrder.length !== courses.length) {
    throw new Error("Cycle detected in prerequisites!");
  }

  return sortedOrder;
};
