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