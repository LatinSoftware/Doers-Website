-- obtiene habitos por meses
SELECT u.user_id as user_id, h.id,h.name as name, SUM(a.quantity) as total, DATE_TRUNC('month', a."updatedAt") as habit_month
FROM actions as a
INNER JOIN user_habits as uh
ON a.user_habit_id = uh.id
INNER JOIN users as u
ON u.user_id = uh.user_id
INNER JOIN habits as h
ON h.id = uh.habit_id
WHERE u.user_id = :user_id
and a."createdAt"::TIMESTAMP::DATE >= :firstdayyear --primera fecha del año
and a."createdAt"::TIMESTAMP::DATE <= :lastdayyear -- ultima fecha del año
GROUP BY u.user_id, h.id, h.name,habit_month
order by habit_month ASC