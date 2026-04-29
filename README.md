TaskFlow (Task Management SPA)

TaskFlow is a Single Page Application (SPA) designed to help users manage their daily tasks and improve productivity. The application allows the users to create, edit, delete and track tasks efficiently through a clean and intuitive interface.The app uses localstorage to store data and supports JSON import and export for data management. 

 Features:
 
- Add, edit and delete tasks (Task management)  
- Mark tasks as completed or pending  
- Set priority levels (Low, Medium, High)  
- Filter tasks by status, date and priority  
- Search function  
- Multi-user support   
- Data is stored using localStorage  
- Export tasks to JSON file  
- Import tasks from JSON file


File sturture:
-Index.html
-style.css
-app.js

 Technologies Used:
 -HTML 
 -CSS  
 -Bootstrap  
 -JavaScrip
 -LocalStorage  
 -JSON
  
 How It Works
 
Users enter a username to access the application  
Tasks can be created with a name, date and priority  
Tasks are displayed dynamically on the screen  
Users can filter, search and update tasks  
All data is saved locally using localStorage  
Users can export and import their tasks using JSON file


REQUIREMENTS:
To use this application, the user will need:
Localstorage support
Modern webserver

Data Storage
TaskFlow uses the browser's localStorage to store user data. Each user has a separate task list saved using a unique key.

Example of the data:
[
{
    "id": 123456,
    "name": "TASK FOR READ ME",
    "date": "2026-04-20",
    "importance": "High",
    "completed": false
    
  }
]


AUTHOR:ELOY FRANCISCO(2026)
BSc Computer Science
