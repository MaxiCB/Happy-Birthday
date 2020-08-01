# Happy Birthday Service Bug Fix Proposal

This is a very crude POC created to show different proposed solutions

To being download the repo, **cd client**, **npm install**, **npm run start**, **cd ..**, **cd backend**, **npm install**, **npm run dev** and begin using the application.

The frontend is a React app using typescript, using axios for network calls, and ANTD for components.

The backend is a express application, using cors and body-parser, storing recieved information in memory.

### Bug Description

Throughout the user information collection wizard, if the client chooses to add another person's information to the service the existing information os overwritten and not sent to the service. Once the user reaches the submit prompt only the last's entered information is sent.

### Bug Causes

The bug seems to be caused by overwriting the existing information being stored before it can be sent to the service.

## Propsed Solutions (In order of recommendation)

### [Solution One](https://github.com/MaxiCB/Happy-Birthday/blob/master/client/src/App.tsx#L58)

The user will be taken through the wizard as currently implemented, and when the user reaches the prompt to enter another user's information all existing data will be sent regardless of their chose.

This solution has the benefit of ensuring all of the entered information is sent to the serve, while also requiring minimal changes to the application. There will be no need to change any existing logic for submission as it is already in place, it will just be a matter of calling the logic when the prompt is activated.

PROS -

- Requires minimal changes to existing code
- Easily implemented
- Ensure's the bug will be solved regardless of user input

CONS -

- This solution would make a seperate call for each entry

## [Solution Two](https://github.com/MaxiCB/Happy-Birthday/blob/master/client/src/App.tsx#L72)

The user will be taken through the wizard as currently implemented, and when the user reaches the prompt to enter another user's information all existing data will be added to an array storing user entered information.

This solution's benfits will also ensure that all data will be sent to the service. The cons to this soltuion are that is requires multiple changes to existing logic, while also requiring more varibales to accomplish. We can initialize a empty array to store user information, and when the user select's either yes or no to adding aditional information we can append the data to the array. When the user select's no we can iterate over the array and send each entry to the service making multiple iterative calls to the service.

PROS -

- Stores all unser entered information correctly

CONS -

- Multiple changes to existing front end code
- Multiple calls to service quickly

## Solution Three [FE Code](https://github.com/MaxiCB/Happy-Birthday/blob/master/client/src/App.tsx#L99) - [BE Code](https://github.com/MaxiCB/Happy-Birthday/blob/master/backend/index.js#L21)

The user will be taken through the wizard as currently implemented, and when the user reaches the prompt to enter another user's information all existing data will be added to an array storing user entered information similar to solution two, the main difference being moving the logic of iterative over the array to the service.

This solution's benfits will also ensure that all data will be sent to the service. The cons to this soltuion are the same as soltuion two, while also adding changes to the service. We will still have to make all the changes mentioned in solution two, while moving the iteration logic to the service to go through the array.

PROS -

- Reduces amount of calls to service

CONS -

- Requires extensive changes to logic of FE and BE both
