# careaxiom-coding-task

1. Implement the above task using plain node.js callbacks (you can use e
xpress or http or any other helper module but nothing which
absracts control flow).
2. Implement the above using some kind of flow library e.g. async.js or st
ep.js
3. Implement the above using Promises. You could use any library e.g. R
SVP or Q

All the above tasks have been accomplished in this repo. Details for the tasks and their respective code is:
For task 1 use file: http.js
For task 2 use file: async.js
For task 3 use file: q.js

to run the project use command like "node <filename>", e.g. node http.js

the project is currently set to run on the Port 5000. After starting the project hit the url,
  http://localhost:5000/I/want/title?address=google.com&address=www.dawn.com/events&address=www.arslan-ishrat.com&address=asdasdasd
 
 the above url will return the required HTML response. e.g.
  Following are the titles of given websites:
    google.com - "Google"
    www.dawn.com/events - "Events - DAWN.COM - DAWN.COM"
    www.arslan-ishrat.com - "Arslan Ishrat | Portfolio"
    asdasdasd - NO RESPONSE
  
The address query parameter is changable to any desired url.
