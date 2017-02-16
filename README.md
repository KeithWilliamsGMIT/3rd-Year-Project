# 3rd-Year-Project
This is my 3rd year project for college. It incorporates material and topics from all the modules I studied in college. There was no specification provided as it was up to the student to choose the project.

#### Setup
This section of the documentation describes how to setup and run the application.

##### Setting up the databases
This application using two databases. They are Redis and MongoDB. You must download both databases. To start the servers, open two seperate terminals and use the following commands.

```
# Start Redis
redis-server
```

```
# Start MongoDB
mongo
```

##### Setting up the project
Clone the repository.

```
git clone https://github.com/KeithWilliamsGMIT/3rd-Year-Project.git
cd 3rd-Year-Project
```

Create and activate a virtual environment to manage all python dependencies using virtualenv.

```
virtualenv -p python3 venv
source venv/bin/activate
```

Install all dependencies.

```
pip install -r /path/to/requirements.txt
```

Start the application.

```
cd app
python3 app.py
```

The application should be now running on [here](http://127.0.0.1:5000/).