# In Zone C - EXAMIFY 

## Folder Structure

docs/
├─ technical_documentation.md
src/
├─ data-science/
|  ├─ inzonec_datascience.ipynb
|  ├─ inzonec_datascience.py
├─ front-end/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ Coordinator/
│  │  │  │  ├─ AssignGroupModal.js
│  │  │  │  ├─ CoordinatorHomePage.js
│  │  │  │  ├─ CreateExamModal.js
│  │  │  │  ├─ CreateGroupModal.js
│  │  │  │  ├─ ExamsPage.js
│  │  │  │  ├─ StudentsPage.js
│  │  │  │  ├─ UserAnalyticsModal.js
│  │  │  ├─ Messenger/
│  │  │  │  ├─ Message.js
│  │  │  │  ├─ TextInput.js
│  │  │  ├─ Student/
│  │  │  │  ├─ Exams/
│  │  │  │  │  ├─ ExamComponent.js
│  │  │  │  │  ├─ ExamStepHandlingComponent.js
│  │  │  │  │  ├─ OptionalFeedbackModal.js
│  │  │  │  │  ├─ SecondStep.js
│  │  │  │  │  ├─ ThirdStep.js
│  │  │  │  ├─ ExamDiv.js
│  │  │  │  ├─ ExamsPage.js
│  │  │  │  ├─ ResultFeedbackModal.js
│  │  │  │  ├─ StudentHomePage.js
│  │  │  ├─ ChatPage.js
│  │  │  ├─ CoordinatorRoutes.js
│  │  │  ├─ Routes.js
│  │  │  ├─ ExamAlert.js
│  │  │  ├─ LoginPage.js
│  │  │  ├─ ModalUpload.js
│  │  │  ├─ Navbar.js
│  │  │  ├─ NotificationPage.js
│  │  │  ├─ SettingsPage.js
│  │  │  ├─ SignUpPage.js
│  │  │  ├─ StudentRoutes.js
│  │  │  ├─ ThemeSwitch.js
│  │  ├─ locales/
│  │  │  ├─ en/
│  │  │  │  ├─ translation.json
│  │  ├─ themes/
│  │  │  ├─ dark.js
│  │  │  ├─ light.js
│  │  │  ├─ Provider.js
│  │  ├─ App.js
│  │  ├─ reportWebVitals.js
│  │  ├─ i18n.js
│  │  ├─ index.css
│  │  ├─ index.js
│  ├─ node_modules/
│  ├─ public/
│  │  ├─ MCQTemplate.csv
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ robots.txt
│  ├─ .gitignore
│  ├─ package.json
LICENCE
README


## Architecture

### Backend

We used the Parse Server infrastructure, which allows us to do server work without writing code on the backend.

### Frontend

On the frontend, we created a dynamic frontend using React infrastructure.

### Database

We used MongoDB infrastructure provided by Parse Server as database.

#### Database Tables and Columns
* _User
    * objectId
    * refugeeCampId
    * name
    * gender
    * phone
    * address
    * role
    * username
    * surName
    * email
    * password
    * description
    * age
* Exam
    * objectId
    * groupId
    * createdBy
    * name
    * description
    * examState
    * examLocation
    * mcqTotalTime
    * firstSectionLink
    * secondSectionStartDate
* Group
    * objectId
    * name
* MultipleChoiceQuestion
    * objectId
    * examId
    * question
    * answerA
    * answerB
    * answerC
    * answerD
    * frenchAnswerA
    * frenchAnswerB
    * frenchAnswerC
    * frenchAnswerD
    * arabicAnswerA
    * arabicAnswerB
    * arabicAnswerC
    * arabicAnswerD
    * trueAnswer
* RefugeeCamp
    * objectId
    * name
* UserExam
    * objectId
    * userId
    * examId
    * firstSection
    * secondSection
    * thirdSection
    * totalTimeToFinishSecondSection
    * capstoneProjectTextFeedback
    * optionalFeedback
* UserMCQAnswer
    * objectId
    * userId
    * questionId
    * answer
    * howManySecondsPassed

## Technologies

We used some technologies to support the software we made with React.
* We used **MaterialUI** framework.
* We have lready integrated i18next to allow translations of the app in future developments.
* We used the `react-router-dom` library to control the routing.
* We used the `Xlsx` Javascript library to upload csv fils.

## Informations About Algorithms

### How does Examify save user answers and continue the exam even when offline?

As soon as the user comes to the multiple choice questions start screen, Examify pulls all the data from the database and saves it to local storage. As soon as the student start the MCQ exam, progresses are saved in local storage, and, if the connectivity is active, data are also saved to the cloud, each time the student goes to the next question.

When the exam is completed we can have two different scenarios:
- the connectivitu is still active: exam resalts are stored in the cloud and the coordinator will be notify.
- the connectivity is not active:in this case, the exam result cannot be stored in the cloud: a warning is issued to the user. However, this does not prevent the exam from being interrupted; progresses are still saved in the local storage. The student will need to retry to send the exam results when connectivity is again active.

### How does Examify check if the user has changed the tab during the exam?

Using the `react-page-visibility` library we detected whenever the student changes the focus from the exam tab.

### How does Examify direct users to their own panels?

Each user as an assigned role that allows Examify to redirect each user to his own page. Data are stored bpth in the cloud and also in the user local-storage. If the person has already logged in, profile's data are already in the device. There will be a sync with the cloud (if there is connectivity) for any notifications pending.

### How does Examify to know when users are cheating?

If two users gave the same answers to the same questions at the end of the exam and the exam completion timing are very similar, Examify detects a possible cheat and notify the coordinator.

### How does Examify process the data in a csv exam template and send it to the database?

When uploading a csv file, all rows and columns in the loaded csv file can be seen from the user.
Each question has three different answers and three different translations. Also the correct answers are stored.