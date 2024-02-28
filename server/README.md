# Password Manager `server side`
<div align="center">
  
| What am I using?                                          | |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
|Programming language|![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)                                                                     
| Runtime system                                            | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)                |
| Framework       | ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) |
| DB | ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) |

</div>

## **Back End Code folder structure**
```
server
 ┣ controllers
 ┃ ┣ authController.js
 ┃ ┗ employeeController.js
 ┣ dtos
 ┃ ┣ administratorDto.js
 ┃ ┣ employeeDto.js
 ┃ ┗ getEmployeeParamsDto.js
 ┣ error
 ┃ ┗ apiError.js
 ┣ middleware
 ┃ ┣ authMiddleware.js
 ┃ ┗ errorMiddleware.js
 ┣ models
 ┃ ┗ models.js
 ┣ router
 ┃ ┣ authRouter.js
 ┃ ┣ employeeRouter.js
 ┃ ┗ index.js
 ┣ service
 ┃ ┣ employeeService.js
 ┃ ┣ passwordService.js
 ┃ ┗ tokenService.js
 ┣ db.js
 ┗ index.js
```

### 1) To run the Rest Server on local system:

1. For installing all the necessary npm packages

> \$ npm install

2. Start the server by using below code

> \$ npm run dev

3. It will launch the server on [http://localhost:8080](http://localhost:8080) this url.
