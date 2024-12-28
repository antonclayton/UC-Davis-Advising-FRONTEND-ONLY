import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import RoadmapContainer from "./RoadmapContainer/RoadmapContainer";

const MainContainer = () => {
  const [selectedMajor, setSelectedMajor] = useState(null);

  const handleMajorSelection = (major) => {
    setSelectedMajor(major);
  };

  return (
    <div className="justify-center items-center h-full w-full flex-col">
      <h1 className="font-bold flex justify-center items-center text-lg m-1">
        Generate Roadmap
      </h1>
      <div className="flex justify-center items-center">
        <button
          className="p-2 bg-blue-900 hover:bg-blue-950 text-white mr-2 rounded-md font-bold text-xs"
          onClick={() => handleMajorSelection("Mechanical Engineering")}
        >
          Mechanical Engineering
        </button>
        <button
          className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white mr-2 rounded-md font-bold text-xs"
          onClick={() => handleMajorSelection("Aerospace Engineering")}
        >
          Aerospace Engineering
        </button>
      </div>

      {/* <ul>
        {courses.map((course, index) => (
          <li key={index}>{course.course}</li> // Display each course name
        ))}
      </ul> */}

      {/*Render only if selectedMajor is not null*/}
      {selectedMajor && <RoadmapContainer major={selectedMajor} />}
    </div>
  );
};

export default MainContainer;
