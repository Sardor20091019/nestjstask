## USERS
*(hammasi POST)*

### 1. Create User
* **URL:** `http://localhost:3000/users/create`
* **HEADER:** `user_id = {id}` *(Oldin SQL da buni run qilish kere)*
```sql
INSERT INTO users (name, role) VALUES ('SARDORADMIN', 1);

```

* **Body:**

```json
{
    "name": "sardor",
    "role": 3
}

```

### 2. Find All Users (with pagination & name filter)

* **URL:** `http://localhost:3000/users/findall`
* **Body:**

```json
{
    "name": "e",
    "limit": 1,
    "page": 1
}

```

*(Yoki bo'sh object `{}` yuborsa ham bo'ladi)*

### 3. Find By Its Name

* **URL:** `http://localhost:3000/users/findbyitsname`
* **Body:**

```json
{
    "name": "sardor"
}

```

### 4. Find One User

* **URL:** `http://localhost:3000/users/findone`
* **Body:**

```json
{
    "id": "1"
}

```

### 5. Update User

* **URL:** `http://localhost:3000/users/update`
* **Body:**

```json
{   
    "id": 1,
    "name": "sarddor",
    "role": 1
}

```

### 6. Remove User

* **URL:** `http://localhost:3000/users/remove`
* **Body:**

```json
{
    "id": 4
}

```

---

## ORGANIZATIONS

*(hammasi POST)*

### 1. Create Organization

* **URL:** `http://localhost:3000/organizations/create`
* **HEADER:** `user_id = 1`
* **Body:**

```json
{
  "name": "somethinadgintefrestinghere",
  "created_by": 1
}

```

### 2. Find All Organizations

* **URL:** `http://localhost:3000/organizations/findall`
* **Body:**

```json
{
    "name": "e",
    "limit": 1,
    "page": 1
}

```

### 3. Find By Its Name

* **URL:** `http://localhost:3000/organizations/findbyitsname`
* **Body:**

```json
{
    "name": "somethin"
}

```

### 4. Update Organization

* **URL:** `http://localhost:3000/organizations/update`
* **HEADER:** `user_id = 1`
* **Body:**

```json
{
    "id": 1,
    "name": "e"
}

```

### 5. Find One Organization

* **URL:** `http://localhost:3000/organizations/findone`
* **Body:**

```json
{
    "id": 1
}

```

### 6. Assign User to Organization

* **URL:** `http://localhost:3000/organizations/assign-user`
* **HEADER:** `user_id = 1`
* **Body:**

```json
{
    "id": 1,
    "userId": 2
}

```

### 7. Remove Organization

* **URL:** `http://localhost:3000/organizations/remove`
* **HEADER:** `user_id = 1`
* **Body:**

```json
{
    "id": 2
}

```

---

## PROJECTS

*(hammasi POST)*

### 1. Create Project

* **URL:** `http://localhost:3000/projects/create`
* **HEADER:** `user_id = 1`
* **Body:**

```json
{
  "name": "very rgereat webstie",
  "org_id": 1,
  "created_by": 1
}

```

### 2. Find All Projects

* **URL:** `http://localhost:3000/projects/findall`
* **Body:**

```json
{
    "name": "e",
    "limit": 1,
    "page": 1
}

```

### 3. Find By Its Name

* **URL:** `http://localhost:3000/projects/findbyitsname`
* **Body:**

```json
{
    "name": "very"
}

```

### 4. Find By Organization

* **URL:** `http://localhost:3000/projects/findByOrg`
* **Body:**

```json
{
    "org_id": 1
}

```

### 5. Update Project

* **URL:** `http://localhost:3000/projects/update/1`
* **HEADER:** `user_id = 1`
* **Body:**

```json
{
    "id": 1,
    "name": "ddasads"
}

```

### 6. Remove Project

* **URL:** `http://localhost:3000/projects/remove`
* **HEADER:** `user_id = 1`
* **Body:**

```json
{
    "id": 2
}

```

---

## TASKS

*(hammasi POST)*

* **HEADER key:** `user_id` | **Value:** `{admin id si bolishi kere (masalan: 1)}`

### 1. Create Task

* **URL:** `http://localhost:3000/tasks/create`
* **HEADER:** `user_id = 1`
* **Body:**

```json
{
    "title": "very attractive title",
    "project_id": 1,
    "worker_user_id": 2,
    "due_date": "2026-08-20T12:00:00Z"
}

```

### 2. Find All Tasks

* **URL:** `http://localhost:3000/tasks/findall`
* **Body:**

```json
{
    "title": "v",
    "page": 1,
    "limit": 1
}

```

### 3. Find By Its Title

* **URL:** `http://localhost:3000/tasks/findbyitstitle`
* **Body:**

```json
{
    "title": "ver"
}

```

### 4. Find By Worker

* **URL:** `http://localhost:3000/tasks/findByWorker`
* **Body:**

```json
{
    "worker_user_id": 2
}

```

### 5. Employee Tasks Summary

* **URL:** `http://localhost:3000/tasks/employee-tasks`
* **Body:**

```json
{
    "worker_user_id": 2
}

```

### 6. Find By Project

* **URL:** `http://localhost:3000/tasks/findByProject`
* **Body:**

```json
{
    "project_id": 1
}

```

### 7. Find By Status

* **URL:** `http://localhost:3000/tasks/status`
* **Body:**

```json
{
    "status": "DONE"
}

```

### 8. Update Status

* **URL:** `http://localhost:3000/tasks/update-status`
* **HEADER:** `user_id = 2` *(qaysi userga task assign qilingan bosa osha user id)*
* **Body:**

```json
{
    "id": 1,
    "status": "DONE",
    "worker_user_id": "2"
}

```

### 9. Remove Task

* **URL:** `http://localhost:3000/tasks/remove`
* **HEADER:** `user_id = 1`
* **Body:**

```json
{   
    "id": "1"
}

```

```

```