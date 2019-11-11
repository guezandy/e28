export const programProgressJson = (student, courses, programs) => {
  const NOT_MET = "Not satisfied";

  const courseNameMap = {};
  courses.forEach(course => (courseNameMap[course.id] = course.name));

  // Basically merge certificate requirements with courses students taken to return
  // A json to be used by the UI
  return programs.reduce((summary, program) => {
    // List of courses taken by the student
    const studentsCompletedCourses = student.completedCourses.map(
      course => course.id
    );
    const usedCourses = [];

    // For each requirement in this certificate compile list of courses that satisfy it
    const requirementsSummary = [];

    for (let i = 0; i < program.requirements.length; i++) {
      const req = program.requirements[i];
      // List of courses of the options that satisfy this req that have been taken by the student
      for (let j = 0; j < req.options.length; j++) {
        const course = req.options[j];
        if (
          // If course is not used already
          !usedCourses.includes(course) &&
          // Student has taken the course
          studentsCompletedCourses.includes(course)
        ) {
          requirementsSummary.push({
            requirement: req.name,
            status: "Satisfied",
            course: courseNameMap[course] || "Unknown course"
          });
          usedCourses.push(course);
        }
      }
      // Just to have a visual enter "Missing requirement" rows into this list
      while (requirementsSummary.length < req.count) {
        requirementsSummary.push({
          requirement: req.name,
          status: NOT_MET,
          course: `Possible course(s): ${req.options
            .filter(option => !studentsCompletedCourses.includes(option))
            .map(option => courseNameMap[option] || "Unknown course")
            .join(", ")}`
        });
      }
    }
    summary[program.id] = {
      // To be used by progress bar to show progress in the certificate program
      completedCount: requirementsSummary.filter(req => req.status !== NOT_MET)
        .length,
      // To be used to render the table
      tableRows: requirementsSummary
    };
    return summary;
  }, {});
};
