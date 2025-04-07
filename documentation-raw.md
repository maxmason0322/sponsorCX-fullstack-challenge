I left many comments in-line in my code as I completed this challenge. However, there are many things I didn't include in my comments, so I'm going to document them here!

# Frontend

I used a couple of libraries on the frontend portion of this challenge that allowed me to move more quickly or that simplified certain tasks. I used Axios to fetch data and interact with my API. I used Tanstack Query for asynchronous data handling, although with more time I would have taken advantage of other features of Tanstack Query, such as filtering. I used styled-components, a CSS-in-JS library, to style the new page. I decided to use these libraries because I was already familiar with them and use them in my current job. I thought that by using packages I am already familiar with, my development time would be shorter.

Overall, the frontend is fairly basic. I didn't quite have time to abstract out components from my page, such as the Account cards or the Deal cards. I also would have liked to have implemented backend filtering of the deals. Filtering on the backend usually improves performance, especially with large datasets. For this challenge, the dataset I created was so small that the performance trade-offs don't come into play.

The overall styling and design of the page is pretty minimal. With more time, I would have made the UI more delightful for users and would have included more interactions, hover states, etc. I chose to organize the accounts in a row with the deals underneath because it made sens to me logically. I felt that it maintained a good flow for a user to read through and was easily understandable. I opted not to stack accounts vertically because an account could potentially have many deals underneath it, which would increase the vertical spacing and require much more scrolling.

For full disclosure, I'm not sure why I included two different organizations. The instructions for the challenge implied that the accounts view was only needed for one organization. I could see a scenario in which a user was in charge of or owned two separate companies and therefore could view the deals of these two organizations. The design of that portion of the page was simply for me to use during development, and would most likely have been very different for a production site.

To run the frontend you only need to install dependencies and then run `npm run dev`, exactly the same as for the original challenge.

# Backend

I approached the backend from a layered architecture perspective. A test app like this didn't necessarily require a layered architecture, but for a real, production app with these features, it would have been useful to separate concerns and functionality as I did here. I separated the backend into routes, controllers, and services folders. The routes are responsible for directing the HTTP requests to the appropriate controllers. The controllers handle the HTTP request and response information and interact with the services. Finally, the services contain the business logic and query the database directly. With the backend as a whole, for large applications I would use an actual RDBMS instead of SQLite. However, for this challenge SQLite is perfectly suited.

I did not add any extra dependencies to the backend, and decided to continue using Express and better-sqlite3. With more time, I would have utilized many of Express' features, such as authorization and middleware. Unfortunately I didn't have the time to include these functionalities.

As I was completing my services, controllers, and routes for the deal and accounts, I realized that I could implement a solution in a simpler way. I ended up creating a new endpoint in my organizations service that fetches an organization's accounts, and then each account's deals, and returns all of it at once. This implementation makes it so I did not end up needing to use the services for my deals or accounts. I decided to leave all three sets of services, controllers, and routes in the codebase so that you could look at them if you want to.

To run the backend you need to install dependencies and then run `npm run dev:with-seed`. I added a seed file so that there is actually some data to look at.

## Feedback and Questions

Overall, I thought that this challenge was very good as a screening challenge. I like that you allowed the use of AI, as it is becoming a more important part of every engineer's workflow. I also like that you expect explanations of my decisions because I think that AI can be abused, leading to technical debt and unexpected bugs. I think it's very important to use AI as a peer programmer, and not as the actual programmer!

I did get a bit confused about what was meant by the total value of the deals. I wasn't certain if "total value" meant the total for each account or the total for the entire organization. I decided to include both, and in the end it was a fairly minor concern.

Thank you for considering me for this role and taking the time to read all of my thoughts and documentation!
