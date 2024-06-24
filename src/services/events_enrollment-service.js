import EventsEnrollmentRepository from '../repositories/event_enrollment-repository.js';

export default class EventsEnrollmentService{

    getUsersEnrolls = async(id, first_name, last_name, username, attended, rating) => {
        const repo = new EventsEnrollmentRepository();
        let query = `
            SELECT u.id, u.first_name, u.last_name, u.username
            FROM users u
            JOIN event_enrollments ee ON u.id = ee.id_user
            WHERE ee.id_event = $1
        `;
        const params = [id];

        if (first_name) {
            query += ` AND u.first_name ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(first_name);
        }
        if (last_name) {
            query += ` AND u.last_name ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(last_name);
        }
        if (username) {
            query += ` AND u.username ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(username);
        }
        if (attended !== undefined) {
            query += ` AND ee.attended = $${params.length + 1}`;
            params.push(attended);
        }
        if (rating !== undefined) {
            query += ` AND ee.rating > $${params.length + 1}`;
            params.push(rating);
        }
        const returnArray = repo.getUsersEnrolls(query, params);
    return returnArray;
    }
}