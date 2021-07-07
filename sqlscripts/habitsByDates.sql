SELECT
MAX("UserHabits"."id") AS "UserHabits_id", 
"UserHabits->Habit"."name" AS "UserHabits_Habit_name",
DATE_TRUNC('month', "UserHabits->Action"."createdAt") AS "UserAction_Created_Month",
SUM(COALESCE("UserHabits->Action"."quantity", 0)) AS "UserHabits_Action_quantity" 
FROM "Users" AS "Users" INNER JOIN "UserHabits" AS "UserHabits" 
ON "Users"."id" = "UserHabits"."userId" 
INNER JOIN "Habits" AS "UserHabits->Habit" 
ON "UserHabits"."habitId" = "UserHabits->Habit"."id" 
LEFT OUTER JOIN "Actions" AS "UserHabits->Action" 
ON "UserHabits"."id" = "UserHabits->Action"."habitId" 
AND ("UserHabits->Action"."createdAt"::TIMESTAMP::DATE <= :dateto
	 AND "UserHabits->Action"."createdAt"::TIMESTAMP::DATE >= :datefrom)
WHERE "Users"."discordId" = :discord_id
group by "UserAction_Created_Month", "UserHabits_Habit_name"