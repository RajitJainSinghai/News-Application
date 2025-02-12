# News_app
Here’s how to open and run the Dockerized application:  

1. **Install Docker Desktop**:  
   Ensure Docker Desktop is installed on your system. If not, download it from the [official Docker website](https://www.docker.com/products/docker-desktop/) and install it.  

2. **Start Docker Desktop**:  
   Open the Docker Desktop application on your system. Wait until it is fully initialized and running.  

3. **Download the Application Files**:  
   Obtain the project folder containing the `docker-compose.yml` file from the provided link or location. Extract the files if they are in a compressed format.  

4. **Run Docker Compose Command**:  
   - Open a terminal or command prompt.  
   - Navigate to the folder where the `docker-compose.yml` file is located using the `cd` command (e.g., `cd path/to/project`).  
   - Run the command:  
     ```bash
     docker-compose up --build
     ```  
   This will build and start all services defined in the `docker-compose.yml` file.  

5. **Access the Application**:  
   Once the command completes, open your browser and go to the specified URL (e.g., `http://localhost:5173`) to access the application. The exact port and URL will be mentioned in the instructions or logs.  
