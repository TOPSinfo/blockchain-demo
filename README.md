**Application Defination**

An Application which allows users to tranfer the ownership of real estate properties with other users. Keeping all the history of all propety ownership in the block chain.

## User Agnets

### 1. Admin
	1. Adming user will be a statically added user of the system. There would not be any sing up process for admin user.
	2  Being admin. user can log in to the system.
	3  Can view list of properties
	4  Can Create New Properties - Admin would be the owner of newly created properties.
	5  Can Transfer Ownership of the properties to other users of the system. Can trasfer the ownership where properties are owned by Admin only.
	6  Can See history of a property.
	7  Can View List of Users
	8  Can Create New users.

### 2. App User
	1 Can Log Into the system.
	2 Can see list of properties which are owned by that user.
	3 Can transfer the ownership of the property to any other user of the system.




## Set up Blockchian-Demo for Local System

NodeJs, MongoDB are prerequisite before starting the project to local system.

1.Clone the repository by typing following command.

	git clone https://github.com/TOPSinfo/blockchain-demo.git

2.Go the project directory.

	cd blockchain-demo

3.Go to the Project Server Folder, Install the Dependencies and start the server.

	cd server
	npm install
	npm run start

3.Go to the Client Folder, Install the Dependencies and start the client server.

	cd client
	npm install
	npm run start

4.Visit the following URL on your browser to see the application.

	https://localhost:3000
