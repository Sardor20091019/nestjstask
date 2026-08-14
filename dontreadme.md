ENTITIES 
- Users (id, name, role, created_by)
- Organizations (id, name, created_by)
- OrganizationUser (id, org_id, user_id)
- Project (id, org_id, created_by)
- Task (id, created_by, created_at, project_id, due_date, worker_user_id, status, done_at) **(status = [CREATED, IN_PROCESS, DONE])**





   number 1 =   ADMIN = CRUD /organizations mostly but also CRUD whole project stuff  , can assign roles (manager or employee,since admin can only be assigned using SQL)
   number 3 =   LEADER = C /project and tie it to organization, and can C task (once task is created IT will have created_at) assign to workers, set a deadline, links it to project
   number 2 =   EMPLOYEE(under a role name user) = /tasks?worker_user_id=34 , can change STATUS to IN_PROCESS once they started working on it, and update STATUS to DONE once they're done and
   it'll add timestamp(NOW) to  DONE_AT



POST http://localhost:3000/organizations/create working✅
POST http://localhost:3000/organizations/1 get   working✅
POST http://localhost:3000/organizations/update/{id} working✅
POST http://localhost:3000/organizations/remove/{id} working✅
POST http://localhost:3000/organizations/assign-user/{id} working✅


POST http://localhost:3000/projects/create working✅
POST http://localhost:3000/projects/findall working✅
POST http://localhost:3000/projects/findByOrg  working✅
POST http://localhost:3000/projects/1 working✅ 
POST http://localhost:3000/projects/update/{id}  working✅
POST http://localhost:3000/projects/remove/{id}  working✅


POST http://localhost:3000/tasks working✅
POST http://localhost:3000/tasks/findall working✅
POST http://localhost:3000/tasks/{id}  working✅
POST http://localhost:3000/tasks/findByProject?project_id={id}
POST http://localhost:3000/tasks/updatestatus/{id}  working✅
POST http://localhost:3000/tasks/remove/{id}  working✅


POST http://localhost:3000/users/create working✅
POST http://localhost:3000/users/findall working✅
POST http://localhost:3000/users/{id} working✅
POST http://localhost:3000/users/{id}  update working✅
POST http://localhost:3000/users/remove/{id} working✅


POST http://localhost:3000/statistics/organizations  NOT working❌❌❌
POST http://localhost:3000/statistics/tasks  NOT working❌❌❌
POST http://localhost:3000/statistics/overallstatistics   working✅

- Tashkilot kesmida statistika: (tashkilot nomi, loyihalar soni, umumiy vazifalar soni)
- Tashkilotning loyihalari kesmida: (tashkilot nomi, loyiha nomi, loyiha vazifalari soni)
- Umumiy statistika (umumiy tashkilotlar soni, umumiy loyihalar soni, umumiy vazifalar soni)


BUGS:
hullas faqat create, find, remove ishlavatti boldi , i users/update ishlavatti lekin qogan hich qaysi ishlamayabti ❌🆘⛔️🚫💢⭕️

QUESTION:
logger qoshish keremi?
bir hil nomli organizations bosa boladimi yoki bomasli keremi
tin unique + name + uniqe
FUTURE UPDATES: BETTER ERROR HANDLING