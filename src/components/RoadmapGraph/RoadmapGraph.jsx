import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import { useState } from "react";
import "reactflow/dist/style.css";

import { topologicalSort } from "../../utils/topologicalSort";
import { prepareReactFlowData } from "../../utils/prepareReactFlowData";
import CustomNode from "./CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

const RoadmapGraph = ({ courses }) => {
  const [completedCourses, setCompletedCourses] = useState(new Set());

  const canCompleteCourse = (courseCode) => {
    const course = courses.find((c) => c.courseCode === courseCode);
    if (!course) return false;
    if (course.prerequisites.length === 0) return true;
    return course.prerequisites.every((prereq) => completedCourses.has(prereq));
  };

  const handleNodeClick = (courseCode) => {
    if (!canCompleteCourse(courseCode)) return; // do nothing if course cannot be completed at this time

    setCompletedCourses((prev) => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(courseCode)) {
        newCompleted.delete(courseCode);

        courses.forEach((course) => {
          if (course.prerequisites.includes(courseCode)) {
            newCompleted.delete(course.courseCode);
          }
        });
      } else {
        newCompleted.add(courseCode);
      }
      return newCompleted;
    });
  };

  const calculateCompletedUnits = () => {
    let totalUnits = 0;
    completedCourses.forEach((courseCode) => {
      const course = courses.find((c) => c.courseCode === courseCode);
      if (course) {
        totalUnits += course.units; // Sum the units of completed courses
      }
    });
    return totalUnits;
  };

  try {
    // const sortedCourses = topologicalSort(courses);
    // console.log("Topologically sorted courses:", sortedCourses);

    const { nodes, edges } = prepareReactFlowData(
      courses,
      completedCourses,
      canCompleteCourse //passing function
    );

    const nodesWithHandlers = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onNodeClick: handleNodeClick,
      },
    }));

    const totalCompletedUnits = calculateCompletedUnits(); // Calculate completed units

    return (
      <div style={{ height: "70vh", width: "100%", overflow: "auto" }}>
        <h1 className="font-bold ml-2 mt-4 text-xs">
          Total Completed Units: {totalCompletedUnits}
        </h1>
        <h5 className="text-xs ml-2 mb-1">(Click courses to complete them!)</h5>
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          nodeTypes={nodeTypes}
          style={{ stroke: "black" }}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
};

export default RoadmapGraph;
