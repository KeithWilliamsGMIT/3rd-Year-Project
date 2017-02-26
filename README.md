# 3rd-Year-Project
This is my 3rd year project for college. It incorporates material and topics from all the modules I studied in college. There was no specification provided as it was up to the student to choose the project.

#### Introduction
After giving some consideration to the goals and the time frame for this project I decided to develop a messaging app. The goals for this messaging app were to be cross-platform, fast, user friendly, reliable and developed using best practices.

These goals influenced the technologies used. For example, in order to make it cross-platform I opted to use web technologies like Angular 2 for the frontend with a RESTful api built with python Flask. Redis was used for speed because it is an in-memory database.

Building a feature rich application was not one of the initial goals.

This project is hosted on Amazon Web Services (AWS). The project is live at [http://35.163.94.108:5000/](http://35.163.94.108:5000/).

For more information you can see the [Wiki](https://github.com/KeithWilliamsGMIT/3rd-Year-Project/wiki) for this project.

#### Setup
This section of the documentation describes how to setup and run the application. First clone the repository.

```
git clone https://github.com/KeithWilliamsGMIT/3rd-Year-Project.git
cd 3rd-Year-Project
```

##### Setting up the databases
This application using two databases. They are Redis and MongoDB. You must download and install both databases. To start the databases, open two seperate terminals and use the following commands.

```
# Start Redis
redis-server
```

```
# Start MongoDB
mongo
```

##### Setting up the back end
Navigate to the backend directory.

```
cd backend
```

Create and activate a virtual environment to manage all python dependencies using virtualenv.

```
virtualenv -p python3 venv
source venv/bin/activate
```

Install all dependencies.

```
pip install -r requirements.txt
```

Start the flask backend.

```
cd app
python3 app.py
```

The application should now be available at [http://0.0.0.0:5000](http://0.0.0.0:5000).

##### Setting uo the front end

*** NOTE THAT THE FRONT END IS NOT CURRENTLY BEING USED ***

Navigate to the frontend directory.

```
cd frontend
```

You will need to install NodeJS in order to run the angular2 frontend. The easiest way to manage NodeJS installations is to use npm. Use the follwing commands to install the dependencies using npm.

```
# Install project dependencies
npm install
```

Now start the application.

```
npm start
```

The application should now be available at [http://127.0.0.1:8080](http://127.0.0.1:8080).