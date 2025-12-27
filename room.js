var mostBooked = function (n, meetings) {
  meetings.sort((a, b) => a[0] - b[0]);

  // available rooms (min room number)
  let available = [];
  for (let i = 0; i < n; i++) available.push(i);

  // busy rooms: [endTime, room]
  let busy = [];

  let count = Array(n).fill(0);

  for (let [start, end] of meetings) {
    // free rooms
    while (busy.length && busy[0][0] <= start) {
      let [, room] = busy.shift();
      available.push(room);
      available.sort((a, b) => a - b);
    }

    let duration = end - start;

    if (available.length) {
      let room = available.shift();
      busy.push([end, room]);
      count[room]++;
    } else {
      let [finish, room] = busy.shift();
      busy.push([finish + duration, room]);
      count[room]++;
    }

    // keep busy sorted by end time then room number
    busy.sort((a, b) =>
      a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
    );
  }

  let maxMeetings = Math.max(...count);
  return count.indexOf(maxMeetings);
};
