import { MarkerType } from "reactflow";

const colorPalette = [
  "#ff0000", // Color 0
  "#00ff00", // Color 1
  "#0000ff", // Color 2
  "#ffff00", // Color 3
  "#ff00ff", // Color 4
  "#00ffff", // Color 5
  "#ff7f00", // Color 6
  "#7f00ff", // Color 7
];

export const prepareReactFlowData = (
  courses,
  completedCourses,
  canCompleteCourse
) => {
  const HORIZONTAL_SPACING = 250;
  const VERTICAL_SPACING = 150;

  // 1. courses with no prereqs start at level 0 (level based roadmap)
  const levelMap = {};
  courses.forEach((course) => {
    if (course.prerequisites.length === 0) {
      levelMap[course.courseCode] = 0;
    }
  });

  // 2. assign levels to courses
  let changed = true;
  while (changed) {
    changed = false;
    courses.forEach((course) => {
      // if course hasnt been assigned a level yet
      if (levelMap[course.courseCode] === undefined) {
        // get levels of all prerequisites
        const prereqLevels = course.prerequisites
          .map((p) => levelMap[p])
          .filter((l) => l !== undefined);

        // if all prereqs have levels assigned
        if (prereqLevels.length === course.prerequisites.length) {
          levelMap[course.courseCode] = Math.max(...prereqLevels) + 1;
          changed = true;
        }
      }
    });
  }

  //   // Debug log to check level assignments
  //   console.log("Level assignments:", levelMap);

  // 3. calculate positions based on level
  const nodes = courses.map((course) => {
    const level = levelMap[course.courseCode] || 0; // Ensure we have a valid level

    // Get all courses at this level
    const coursesAtThisLevel = courses.filter(
      (c) => levelMap[c.courseCode] === level
    );

    // Find index of current course in its level
    const indexInLevel = coursesAtThisLevel.findIndex(
      (c) => c.courseCode === course.courseCode
    );

    const isCompleted = completedCourses.has(course.courseCode);
    const isAvailable = canCompleteCourse(course.courseCode);

    return {
      id: course.courseCode,
      type: "custom",
      data: {
        label: `${course.courseCode} (${course.units} units)`,
        label2: `Availability: ${course.availability}`,
        color: `${course.color}`,
        id: course.courseCode,
        isCompleted,
        isAvailable,
      },
      sourcePosition: "right",
      targetPosition: "left",

      // x position determined by level (columns left -> right layout)
      // y position determined by index within that level of the course

      position: {
        x: level * HORIZONTAL_SPACING,
        y: indexInLevel * VERTICAL_SPACING,
      },
      style: {
        width: 150,
        height: 75,
        padding: "4px",
        border: "1.5px solid black",
        borderRadius: "5px",
        backgroundColor: isCompleted
          ? "#90EE90"
          : isAvailable
          ? "white"
          : "#E0E0E0",
        color: "black",
        fontSize: "10px",
        fontWeight: "bold",
        opacity: isAvailable ? 1 : 0.6,
        transition: "all 0.5s ease",
      },
    };
  });

  const edges = courses.flatMap((course, index) =>
    course.prerequisites.map((prereq, edgeIndex) => ({
      id: `edge-${prereq}-${course.courseCode}`,
      source: prereq,
      target: course.courseCode,
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      animated:
        completedCourses.has(prereq) &&
        !completedCourses.has(course.courseCode),
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "black",
        width: 10,
        height: 10,
      },
      style: {
        stroke: colorPalette[(index + edgeIndex) % colorPalette.length],
        strokeWidth: 5,
        opacity: canCompleteCourse(course.courseCode) ? 1 : 0.25,
      },
    }))
  );

  //   const nodes = [];
  //   const edges = [];

  //   courses.forEach((course, index) => {
  //     nodes.push({
  //       id: course.courseCode,
  //       data: { label: `${course.courseCode} (${course.units} units)` },
  //       style: { width: "175px", height: "25px", border: "1px solid red" },
  //       position: { x: 50 * index, y: 50 * index },
  //     });

  //     course.prerequisites.forEach((prereq) => {
  //       edges.push({
  //         id: `edge-${prereq}-${course.courseCode}`,
  //         source: prereq,
  //         target: course.courseCode,
  //       });
  //     });
  //   });

  //   console.log("Final node positions:");
  //   nodes.forEach((node) => {
  //     console.log(`${node.id}: x=${node.position.x}, y=${node.position.y}`);
  //   });

  //   console.log("Nodes:", nodes);
  //   console.log("Edges:", edges);
  return { nodes, edges };
};
