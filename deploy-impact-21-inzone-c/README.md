
# Examify - InZone C

InZone helps refugees to get better education.

Examify is an education app that simplifies taking exams.

Let's deep dive to the app.

## Run On Your PC

Clone the project to current directory.

```bash
  git clone https://github.com/WomenPlusPlus/deploy-impact-21-inzone-c.git .
```

Change directory
```bash
  cd src/front-end/
```

Install dependencies.

```bash
  npm install
```

RUN!

```bash
  npm start
```


## API Reference
* https://inzone-c-parse.tools.deployimpact.ch/parse is the base url.

* All requests include a header that is "X-Parse-Application-Id: inzonec"

* Some requests include a header that is "X-Parse-Session-Token: tokenWhenUserLoggedInorSignedUp"

* Example student info: username=zakia&password=zakia123

* Example coordinator info: username=karim&password=karim123

* If you need more API Reference, read the documentation and visit https://docs.parseplatform.org/rest/guide/

#### User Login

```http
  POST /users?username=karim&password=karim123
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Username of user. |
| `password` | `string` | **Required**. Password of user. |

#### Get All Exams Related to User (Student) (With RefugeeCamp Option)

```http
  GET /classes/Exam?where={"$or":[{"examLocation":{"__type":"Pointer","className":"RefugeeCamp","objectId":"REFUGEECAMPOBJECTIDWILLBEHERE"}},{"examLocation":null}]}&include=examLocation&include=createdBy
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `objectId` | `string` | **Required**. RefugeeCampId of user. |

#### Get MCQ Questions of an Exam

```http
  GET /classes/MultipleChoiceQuestion?where={"examId":{"__type":"Pointer","className":"Exam","objectId":"EXAMOBJECTIDWILLBEHERE"}}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `objectId` | `string` | **Required**. ObjectId of an exam. |

#### Add MCQ

```http
  POST /classes/MultipleChoiceQuestion
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `question` | `string` | **Required**. English question. |
| `examId` | `Pointer` | **Required**. Id of exam. |
| `frenchQuestion` | `string` | **Required**. French question. |
| `arabicQuestion` | `string` | **Required**. Arabic question. |
| `answerA` | `string` | **Required**. English answer A. |
| `frenchAnswerA` | `string` | **Required**. French answer A. |
| `arabicAnswerA` | `string` | **Required**. Arabic answer A. |
| `answerB` | `string` | **Required**. English answer B. |
| `frenchAnswerB` | `string` | **Required**. French answer B. |
| `arabicAnswerB` | `string` | **Required**. Arabic answer B. |
| `answerC` | `string` | **Required**. English answer C. |
| `frenchAnswerC` | `string` | **Required**. French answer C. |
| `arabicAnswerC` | `string` | **Required**. Arabic answer C. |
| `answerD` | `string` | **Required**. English answer D. |
| `frenchAnswerD` | `string` | **Required**. French answer D. |
| `arabicAnswerD` | `string` | **Required**. Arabic answer D. |
| `trueAnswer` | `string` | **Required**. The number of the answer. Possible values: 1-2-3-4 |

#### Get Groups

```http
  GET /classes/Group
```

## Authors and contacts of who wants to continue

- [@giadafallo](https://github.com/GiadaFallo) -> Giada Fallo -> Project Management and Front-End Developer
- [@MartaDeployImpact](https://github.com/MartaDeployImpact) -> Marta Bonilla -> UX/UI Designer
- [@paradyo](https://github.com/paradyo) -> Emrecan Özkan -> Full Stack Developer
- [@namgng](https://github.com/namgng) -> Namrata Gurung -> PM Deputy and Data Science
  
