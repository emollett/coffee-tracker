# coffee-tracker

This is for tracking the coffee purchasing of my team. Coffee is input with info about who bought it, when it was opened, and if people particularly liked it. You can see how many packs the team has consumed each month by going to /graph .

http://coffee-tracker.eleanormollett.com/


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Deployment
I have deployed this using an EC2 instance. Once you have something similar set up, node and mongo installed, and the project cloned and dependencies updated, you can use firststart.sh to build the project and deploy it. For subsequent updates use run.sh to build the project and then deploy it which will restart the process manager.

## Notes

You need mongo installed to run this
https://docs.mongodb.com/manual/installation/

I used a couple of sources to help me create this, this post gave me the basic structure for the app, and helped me get it storing and retrieving the data. I ended up pulling it apart into different components, but it was a very handy starting point.<br>
https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274

![build badge](https://codebuild.eu-west-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiYVhYNVNyc295UnNMOFg5eW5VbTVOUExhVWtlQjVYaHZhTXB0cytnTjBGNWlrbzk0UUk4ZytuUCs4dmNmQXJxQ1pIbVl5RUR2L1hMTFpza2pDcVZIUFNBPSIsIml2UGFyYW1ldGVyU3BlYyI6IlN0NStzRmcrb0JxQlloV1kiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)
