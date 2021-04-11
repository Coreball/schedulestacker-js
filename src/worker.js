const assert = require('assert')

export function generateSchedules(wantedCourses, wantedOffPeriods, availableTeachers) {
  const postDelay = 100;
  let lastPost = 0;
  let results = [];

  const doublePer = (period) => period + '-' + (period + 1);

  const wantsOffPeriod = (period) => wantedOffPeriods[period - 1];

  const alreadyContains = (schedule, course) => (
    schedule.some((period) =>
      period.some((instance) =>
        instance && instance.name === course.name))
  );

  const computeForPeriod = (schedule, period) => {
    // If schedule is done add
    if (period > 8) {
      if (!wantedCourses.every((course) => alreadyContains(schedule, course))) return;
      schedule.shift(); // Get rid of the leading empty list because of how I did this
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
      let newSchedule = [...schedule];
      newSchedule[period] = [];
      computeForPeriod(newSchedule, period + 1);
      return;
    }
    // Sometimes have this as a wildcard off period
    let newSchedule = [...schedule];
    newSchedule[period] = [];
    computeForPeriod(newSchedule, period + 1);
    // Sometimes first semester can be off period and have class second semester
    solveSecondSemester(schedule, period, null);

    // Loop through the courses we want
    wantedCourses.forEach((wantedCourse) => {
      if (!alreadyContains(schedule, wantedCourse)) {
        if (wantedCourse.year) {
          assert(Object.keys(wantedCourse.year).length > 0);
          // Check if it's 1 period long and available this period
          if (wantedCourse.year[period]) {
            assert(wantedCourse.year[period].length > 0);
            // Go through all specific courses
            wantedCourse.year[period].forEach((course) => {
              if (availableTeachers[course.name][course.teacher]) {
                let newSchedule = [...schedule];
                newSchedule[period] = [course];
                computeForPeriod(newSchedule, period + 1);
              }
            });
          }
          // For double period courses and we don't want that off period
          else if (wantedCourse.year[doublePer(period)] && !wantsOffPeriod(period + 1)) {
            assert(wantedCourse.year[doublePer(period)].length > 0);
            // Go through all specific courses
            wantedCourse.year[doublePer(period)].forEach((course) => {
              if (availableTeachers[course.name][course.teacher]) {
                let newSchedule = [...schedule];
                newSchedule[period] = [course];
                newSchedule[period + 1] = [course]; // Occupy two slots
                computeForPeriod(newSchedule, period + 2);
              }
            });
          }
        }

        else if (wantedCourse.s1 && wantedCourse.s1[period]) {
          assert(wantedCourse.s1[period].length > 0);
          wantedCourse.s1[period].forEach((s1) => {
            if (availableTeachers[s1.name][s1.teacher]) {
              solveSecondSemester(schedule, period, s1); // Send to figure out s2
            }
          });
        }
      }
    });
  }

  const solveSecondSemester = (schedule, period, s1) => {
    // Second semester could also be empty iff there is a class in s1
    if (s1 != null) {
      let newSchedule = [...schedule];
      newSchedule[period] = [s1, null];
      computeForPeriod(newSchedule, period + 1);
    }
    // Go through s2 courses
    wantedCourses.forEach((wantedCourse) => {
      if (!alreadyContains(schedule, wantedCourse) && wantedCourse.s2
        && wantedCourse.s2[period] && (s1 === null || s1.name !== wantedCourse.name)) {
        assert(wantedCourse.s2[period].length > 0);
        // Go through all specific courses
        wantedCourse.s2[period].forEach((s2) => {
          if (availableTeachers[s2.name][s2.teacher]) {
            let newSchedule = [...schedule];
            newSchedule[period] = [s1, s2];
            computeForPeriod(newSchedule, period + 1);
          }
        });
      }
    });
  }

  const makeSchedules = () => {
    computeForPeriod([[]], 1);
    return results;
  }

  return makeSchedules();
}
