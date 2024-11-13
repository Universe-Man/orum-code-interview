Greetings! Thank you for taking the time to review my submission to Orum.

I had a lot of fun building this API and am confident I would have completed all the tasks had I not ran out of time. My final commit at the two hour mark is clearly named, and any commit after which was cleaning up code and writing the README file you are reading right now.

I love constructive criticism and look forward to hearing any feedback about the submission, as well as an opportunity to explain my choices and my plan, as I wasn't able to entirely finish the goals required in the allotted time.

Sincerely,

Ian Pollack


1. After cloning my repo, run "npm install" to install all dependencies and set the project up. Once everything is installed you can run "npm run dev" to start the local server.

You can find the API's greetings page at "http://localhost:3000/", and the API can be found at "http://localhost:3000/api/<TABLE_NAME>".

Transfers: http://localhost:3000/transfers
Accounts: http://localhost:3000/accounts
Customers: http://localhost:3000/customers

NOTE: The GET all routes are currently limited to 10 as I ran into an issue getting the offset in pagination working and opted to move on and come back if time permitted.

In the browser you can GET all with the routes above, or GET an individual record by placing the item's ID at the end of the URL. eg: (http://localhost:3000/api/transfers/2466c6e6-b56b-42a3-b6a8-90146c8d623c)

You can also test on the CLI via curl (assuming you have curl installed) like this: "curl -X GET http://localhost:3000/api/transfers" or "curl -X GET http://localhost:3000/api/transfers/<ID>"

This functionality works for all three database tables.

The POST request to create a new account should be working, however, in my final tests, there seemed to be an issue with my GET request for finding if a customer exists, as it is currently returning null. This fortunately proves that the validation is preventing the account creation to the database, but also means you currently can't save an account to the database. (I tested the POST with a customer ID and it returned "Customer Not Found", but when removing the customerValidation, I got the expected 500 NOT NULL error).

For reference here is the curl command for the POST:

curl -X POST -H 'Content-Type: application/json' -d '{"customer_id": "ac3f94db-3301-475c-a8dd-9563903fb6b8", "account_number": 1234567890, "routing_number": 1234567890}' http://localhost:3000/api/accounts


2. The most difficult part of this assessment was the time limit of two hours. I felt fairly confident that had I had more time I could have completed this entirely and included tests. I anticipated the routing number validation to require some effort to wrap my head around it, but unfortunately ran out of time prior to reaching that point. I will figure that out to provide you with how I would have completed the routing number validation had I had enough time, that I'd love to share if permitted.


3. A major focus for my approach was speed as I knew the time limit was going to be challenging, and as a result, I focused on getting things running over being DRY. I'm confident that there are a fair amount of repeated or unnecessary imports and declarations that I would definitely clean up had I had more time. Additionally, having more time would have allowed to resolve the pagination offset issue I moved on from, and setting up the routing number validation. Lastly, I planned to install "jest" to setup tests for all my routes, but regrettably, ran out of time.


4. I know I could have optimized queries by using existing calls for validations too, which ties into the not being very DRY note I made above. I realized I was making a GET customer call in the customerValidation function that repeated the same query for finding a customer, and finding a way to use the same code for those was my end goal.


5. See ROADMAP.md


Thank you again for your time and consideration. This exercise has excited me even more about joining Orum's team as the types of problems this challenge presented are exactly how I feel I can make significant impact and growth for the company I work for, my own career, and anyone in the world who uses money.

Please let me know if you have any questions about me or my submission and I look forward to hearing from you.

Ian Pollack