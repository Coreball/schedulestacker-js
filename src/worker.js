export function generateSchedules(wantedCourses, wantedOffPeriods, availableTeachers) {
  const postDelay = 500;
  let lastPost = 0;
  let results = [];

  const wantsOffPeriod = (period) => wantedOffPeriods[period - 1];

  const computeForPeriod = (schedule, period) => {
    // Implement me
  }

  const solveSecondSemester = (schedule, period, s1) => {
    // Implement me
  }

  const makeSchedules = () => {
    computeForPeriod([], 1);
    return results;
  }

  return makeSchedules();
}
