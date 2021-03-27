SELECT u.user_id, h.name as name,a.quantity as quantity, 
a."createdAt"::TIMESTAMP::DATE as createdAt, a."updatedAt"::TIMESTAMP::DATE as updatedAt,
uh.strike as strike 
FROM actions as a
INNER JOIN user_habits as uh
ON a.user_habit_id = uh.id
INNER JOIN users as u
ON u.user_id = uh.user_id
INNER JOIN habits as h
ON h.id = uh.habit_id
WHERE u.user_id = :user_id
and a."createdAt"::TIMESTAMP::DATE <= :createdAt
and a."createdAt"::TIMESTAMP::DATE >= :createdAt
ORDER BY u.user_id, a."createdAt"::TIMESTAMP::DATE DESC