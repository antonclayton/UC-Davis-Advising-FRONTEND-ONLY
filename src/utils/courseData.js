// extract course ID (ex. MAT 021A) and number of units ( 3,4, etc)
const extractCourseDetails = (courseString) => {
  const [courseCode, theRest] = courseString.split(" - ", 2);

  // find first occurrence of parenthesis and extract the units of the course
  const unitMatch = theRest.match(/\((\d+)\)/);
  const units = unitMatch ? parseInt(unitMatch[1], 10) : null; // unitMatch = ['(4)', '4']

  return {
    courseCode: courseCode.trim(),
    units: units,
  };
};

export const processCourseData = (courses) => {
  return courses.map((course) => {
    const courseDetails = extractCourseDetails(course.course);

    return {
      ...course, // keep the previous properties the same (just adding on more)
      courseCode: courseDetails ? courseDetails.courseCode : course.course, // store course code
      units: courseDetails ? courseDetails.units : 0,
      prerequisites:
        course.prerequisites === "NONE"
          ? []
          : course.prerequisites.split(",").map((prereq) => prereq.trim()),
    };
  });
};
