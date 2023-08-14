# Transcode Master


The service allows the user to convert their uploaded video to different resolutions so they can upload it to social media or do whatever they want. Social media platforms can use this service to show videos to their users in different resolutions.


***Workflow of the application is explained in this picture***

![IMG_20230814_171200](https://github.com/AryanS-2004/Transcode-Master/assets/102866440/a1bd759e-aefe-4c5e-9d35-da56be4bb69f)


Any suggestions may be sent to the following email address: aryan.coding01@gmail.com


# Setup Instructions

To set up the project locally, please follow the steps below:

# Prerequisites
Make sure you have the following software installed on your system:

```bash
Node.js   
```
```bash
FFMPEG
```

# Clone the Repository
1. Open your terminal or command prompt.
   
   
2. Change the current working directory to the location where you want to clone the repository.


3. Run the following command to clone the repository:  
```bash
git clone https://github.com/AryanS-2004/Transcode-Master.git
```

# Frontend Setup
1. Change the current working directory to the cloned repository:  
```bash
cd Transcode-Master
```

2. Navigate to the client directory:  
```bash
cd client
```

3. Install the required dependencies by running the following command: 
```bash 
npm install
```


# Backend Setup
1. Change the current working directory to the cloned repository:  
```bash
cd Transcode-Master
```

2. Navigate to the server directory:  
```bash
cd server
```

3. Install the required dependencies by running the following command:
```bash  
npm install
```

4. Make your own .env file by running the following command:
```bash  
cp .env.example .env
```

***Install FFMPEG on your system and Paste the ffmpeg binary file in the server folder***

# Start the application

1. Start the frontend development server by running this command in the client directory: 
```bash   
npm run dev
```
This command will start the frontend application and open it in your default browser.

2. Start the backend development server  by running this command in the server directory:
```bash  
npm run start
```
This command will start the backend server and make it accessible for frontend requests.

Congratulations! You have successfully set up the your own Video Transcoder locally. You can now access the application by opening your browser and navigating to the provided URL.
