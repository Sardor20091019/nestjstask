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

- Tashkilot kesmida statistika: (tashkilot nomi, loyihalar soni, umumiy vazifalar soni)
- Tashkilotning loyihalari kesmida: (tashkilot nomi, loyiha nomi, loyiha vazifalari soni)
- Umumiy statistika (umumiy tashkilotlar soni, umumiy loyihalar soni, umumiy vazifalar soni)




BUGS: ERROR HANDLING HALI YAXSHIMAS