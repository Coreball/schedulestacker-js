const assert = require('assert')

export function generateSchedules(wantedCourses, wantedOffPeriods, availableTeachers) {
  const postDelay = 500;
  let lastPost = 0;
  let results = [];

  const doublePer = (period) => period + '-' + (period + 1);

  const wantsOffPeriod = (period) => wantedOffPeriods[period - 1];

  const alreadyContains = (schedule, course) => (
    schedule.some((period) =>
      period.some((instance) => instance.name === course.name))
  );

  const computeForPeriod = (schedule, period) => {
    // If schedule is done add
    if (period > 8) {
      if (!wantedCourses.every((course) => alreadyContains(schedule, course))) return;
      console.log("Adding schedule", schedule);
      results.push(schedule);
      const currentTime = Date.now();
      if (currentTime - lastPost >= postDelay) {
        lastPost = currentTime;
        postMessage(results.length); // Progress display
      }
      return;
    }

    // If we want this off period, always go to next period only (skip below)
    if (wantsOffPeriod(period)) {
      // Consider adding empty list at schedule[period], (watch mutation!)
      computeForPeriod([...schedule], period + 1);
      return;
    }
    // Sometimes have this as a wildcard off period
    computeForPeriod([...schedule], period + 1);
    // Sometimes first semester can be off period and have class second semester
    solveSecondSemester(schedule, period, null);

    // Loop through the courses we want
    wantedCourses.forEach((wantedCourse) => {
      if (!alreadyContains(schedule, wantedCourse)) {
        if (wantedCourse.year) {
          assert(wantedCourse.year.length > 0);
          // Check if it's 1 period long and available this period
          if (wantedCourse.year[period]) {
            assert(wantedCourse.year[period].length > 0);
            // Go through all specific courses
            wantedCourse.year[period].forEach((course) => {
              let newSchedule = [...schedule];
              newSchedule[period] = [course];
              computeForPeriod(newSchedule, period + 1);
            });
          }
          // For double period courses and we don't want that off period
          else if (wantedCourse.year[doublePer(period)] && !wantsOffPeriod(period + 1)) {
            assert(wantedCourse.year[doublePer(period)].length > 0);
            // Go through all specific courses
            wantedCourse.year[doublePer(period)].forEach((course) => {
              let newSchedule = [...schedule];
              newSchedule[period] = [course];
              newSchedule[period + 1] = [course]; // Occupy two slots
              computeForPeriod(newSchedule, period + 2);
            });
          }
        }

        else if (wantedCourse.s1[period]) {
          assert(wantedCourse.s1[period].length > 0);
          wantedCourse.s1[period].forEach((s1) => {
            solveSecondSemester(schedule, period, s1); // Send to figure out s2
          });
        }
      }
    });
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
