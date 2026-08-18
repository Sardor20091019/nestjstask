




USERS
 (hammasi POST)





http://localhost:3000/users/create 
HEADER: user_id = {id} bundan oldin SQL da 


```INSERT INTO users (name, role)
VALUES ('SARDORADMIN', 1);```

run qilish kere


{
    "name": "sardor",
    "role": 3
}


http://localhost:3000/users/findall


http://localhost:3000/users/findone

{
    "id":"1"
}

http://localhost:3000/users/update

{   
    "id":1,
  "name": "sarddor",
  "role": 1
}

http://localhost:3000/users/remove

{
    "id": 4
}



ORGANIZATIONS
(hammasi POST)


http://localhost:3000/organizations/create

HEADER user_id value = user id (1)

{
  "name": "somethinadgintefrestinghere",
  "created_by": 1
}

http://localhost:3000/organizations/findall

http://localhost:3000/organizations/update ❌🆘⛔️📛⛔️⛔️🆘🆘🆘🆘❌❌⭕️🛑

HEADER user_id = value (1)
{
    "id":1, 
  "name": "e"
}

http://localhost:3000/organizations/findone 🆘🆘❌⛔️🛑📛☢️☢️

{
    "id": 1
}

http://localhost:3000/organizations/assign-user

HEADER user_id = value(1)

{
    "id": 1,
  "userId": 2
}


http://localhost:3000/organizations/remove

HEADER user_id = value(1)
{
    "id":2
}


PROJECTS
 (hammasi POST)

http://localhost:3000/projects/create

HEADER user_id = 1
{
  "name": "very rgereat webstie",
  "org_id": 1,
  "created_by": 1
}

http://localhost:3000/projects/findall

http://localhost:3000/projects/findByOrg?org_id=1

http://localhost:3000/projects/update/1

HEADER user_id = 1
{
    "id": 1,
    "name": "ddasads"
}

http://localhost:3000/projects/remove

HEADER user_id = (1)
{
    "id": 2
}

TASKS
(hammasi POST)
HEADER key = user_id Value = {admin id si bolishi kere}

HEADER user_id =1 

http://localhost:3000/tasks/create
{
    "title": "very attractive title",
    "project_id": 1,
    "worker_user_id": 2,
    "due_date": "2026-08-20T12:00:00Z"
}

http://localhost:3000/tasks/findall

http://localhost:3000/tasks/findByWorker

{
    "worker_user_id":2
}

http://localhost:3000/tasks/employee-tasks

{
    "worker_user_id":2
}

http://localhost:3000/tasks/findByProject

{
    "project_id":1
}

http://localhost:3000/tasks/status

{
    "status":"DONE"
}

http://localhost:3000/tasks/update-status


user_id = qaysi userga task assign qilingan bosa osha user id = (2)
{
    "id": 1,
    "status": "DONE",
    "worker_user_id": "2"
}


http://localhost:3000/tasks/remove

HEADER user_id 1 
{   
    "id":"1"
}







