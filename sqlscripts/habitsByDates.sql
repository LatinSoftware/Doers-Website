SELECT "Users"."id", "Users"."name", "Users"."discordId", 
"UserHabits"."id" AS "UserHabits.id", 
"UserHabits"."isActive" AS "UserHabits.isActive", 
"UserHabits->Habit"."id" AS "UserHabits.Habit.id", 
"UserHabits->Habit"."code" AS "UserHabits.Habit.code", 
"UserHabits->Habit"."name" AS "UserHabits.Habit.name", 
"UserHabits->Habit"."frecuency" 
AS "UserHabits.Habit.frecuency", 
"UserHabits->Habit"."min" AS "UserHabits.Habit.min", 
COALESCE("UserHabits->Action"."id", 0) AS "UserHabits.Action.id", 
COALESCE("UserHabits->Action"."quantity", 0) AS "UserHabits.Action.quantity" 
FROM "Users" AS "Users" INNER JOIN "UserHabits" AS "UserHabits" 
ON "Users"."id" = "UserHabits"."userId" 
INNER JOIN "Habits" AS "UserHabits->Habit" 
ON "UserHabits"."habitId" = "UserHabits->Habit"."id" 
LEFT OUTER JOIN "Actions" AS "UserHabits->Action" 
ON "UserHabits"."id" = "UserHabits->Action"."habitId" 
AND ("UserHabits->Action"."createdAt"::TIMESTAMP::DATE <= :datefrom 
	 AND "UserHabits->Action"."createdAt"::TIMESTAMP::DATE >= :dateto)
WHERE "Users"."discordId" = :discord_id;