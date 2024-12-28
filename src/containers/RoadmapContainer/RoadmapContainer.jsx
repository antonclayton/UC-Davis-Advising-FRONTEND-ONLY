import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import RoadmapGraph from "../../components/RoadmapGraph/RoadmapGraph";
import { processCourseData } from "../../utils/courseData";

// import course data
import MechECourses from "../../data/MechE.json";
import AeroECourses from "../../data/AeroE.json";

const RoadmapContainer = ({ major }) => {
  const [courses, setCourses] = useState([]);
  const [processedCourses, setProcessedCourses] = useState([]);

  useEffect(() => {
    // Based on major, set the course data
    if (major === "Mechanical Engineering") {
      setCourses(MechECourses);
    } else if (major === "Aerospace Engineering") {
      setCourses(AeroECourses);
    }
  }, [major]);

  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:5000/api/courses/${major.replace(" ", "-")}`)
  //     .then((response) => {
  //       // console.log("Response data type:", typeof response.data);
  //       // console.log("Raw response data:", response.data);
  //       setCourses(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching course data!", error);
  //     });

  //   // console.log(courses);
  // }, [major]);

  useEffect(() => {
    if (courses.length > 0) {
      const processed = processCourseData(courses);
      //   processed.forEach((course) => {
      //     console.log(`Course Code: ${course.courseCode}`);
      //     console.log(`Units: ${course.units}`);
      //     console.log(
      //       `Prerequisites: ${course.prerequisites.join(", ") || "None"}`
      //     );
      //     console.log("-----------");
      //   });
      setProcessedCourses(processed);
    }
  }, [courses]);

  return (
    <div className="mb-0">
      <h2 className="ml-2">Course Roadmap</h2>
      <h1
        className={`text-lg ${
          major == "Mechanical Engineering"
            ? "text-blue-700"
            : "text-yellow-600"
        } font-bold ml-2 mb-1`}
      >
        {major}
      </h1>
      <div className="bg-slate-100">
        {processedCourses.length > 0 ? (
          <RoadmapGraph courses={processedCourses} />
        ) : (
          <p>Loading courses...</p>
        )}
      </div>
    </div>
  );
};

export default RoadmapContainer;
