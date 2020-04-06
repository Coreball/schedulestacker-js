export function generateSchedules(size) {
  let lastPost = 0;
  let delay = 500;

  const run = (size) => {
    let myArray = Array(size).fill().map(() => Math.random() * 1000);
    console.log("Initial array generated as", myArray);
    myArray = sort(myArray);
    return myArray;
  }

  const sort = (input) => {
    let arr = [...input];
    let len = arr.length;
    const inner = (i) => {
      let min = i;
      for (let j = i + 1; j < len; j++) {
          if (arr[min] > arr[j]) {
              min = j;
          }
      }
      if (min !== i) {
          let tmp = arr[i];
          arr[i] = arr[min];
          arr[min] = tmp;
      }
    }
    for (let i = 0; i < len; i++) {
      if (Date.now() - lastPost >= delay) { // If no delay all the console logs lag out the browser
        lastPost = Date.now();
        postMessage(i); // use for progress display
      }
      inner(i);
    }
    return arr;
  }

  return (
    run(size)
  )
}
