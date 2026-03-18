START UP INSTRUCTIONS

prior to running please ensure that...
	1. you have WSL enabled in your operating system
	2. you have the latest version of WSL installed
	3. you have anaconda3 installed with  a python instance inside of your WSL
	4. ensure to pip install flask and gunicorn from inside of your WSL instance
	
versions:
	Flask==3.0.3
	gunicorn==22.0.0

startup instructions:

	1. open WSL in windows.
	2. use cd to navigate to the base directory of this project
		- note that with linux environment on windows you should add this to the start of your path 
			- /mnt/<your drive letter here>
	3. run the command
		- gunicorn app:app
	4. a link to the website will be provided


DOCKER STARTUP (OPTIONAL, DOES NOT CHANGE .BAT FLOW)

If you want to run this site in a container, you can do it separately from the existing
WSL + conda startup path. The file start-may-not-work.bat remains unchanged.

1. Build the image from the project root:
	docker build -t personal-website .

2. Run the container:
	docker run --rm -p 5000:5000 --name personal-website personal-website

3. Open in browser:
	http://localhost:5000

Notes:
- This container runs gunicorn with app:app, matching the project's existing deployment style.
- If you edit code, rebuild the image before running again.

Windows quick start for Docker:
- Double-click start-docker.bat from the project root.
- This will build and run the container on http://localhost:5000.

Important:
- start-may-not-work.bat uses WSL + conda and does not start Docker.