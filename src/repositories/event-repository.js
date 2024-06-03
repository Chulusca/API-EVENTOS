import PostgreQuery from "../helpers/query-sql-helper.js";
const PQ = new PostgreQuery();

export default class EventRepository{
    async getAllAsync(page = 1){

        const sql = `WITH event_details AS (
            SELECT
                events.id,
                events.name,
                events.description,
                events.id_event_category, 
                events.id_event_location,
                events.start_date, 
                events.duration_in_minutes, 
                events.price, 
                events.enabled_for_enrollment, 
                events.max_assistance, 
                events.id_creator_user,
                json_build_object(
                    'id', event_locations.id,
                    'id_location', event_locations.id_location,
                    'name', event_locations.name,
                    'full_address', event_locations.full_address,
                    'max_capacity', event_locations.max_capacity,
                    'latitude', event_locations.latitude,
                    'longitude', event_locations.longitude,
                    'id_creator_user', event_locations.id_creator_user,
                    'location', json_build_object(
                        'id', locations.id,
                        'name', locations.name,
                        'id_province', locations.id_province,
                        'latitude', locations.latitude,
                        'longitude', locations.longitude,
                        'province', json_build_object(
                            'id', provinces.id,
                            'name', provinces.name,
                            'full_name', provinces.full_name,
                            'latitude', provinces.latitude,
                            'longitude', provinces.longitude,
                            'display_order', provinces.display_order
                        )
                    )
                ) AS event_location,
                json_build_object(
                    'id', users.id,
                    'first_name', users.first_name,
                    'last_name', users.last_name,
                    'username', users.username,
                    'password', users.password
                ) AS creator_user,
                (
                    SELECT json_agg(json_build_object(tags.id, tags.name))
                    FROM tags
                    JOIN event_tags ON tags.id = event_tags.id_tag
                    WHERE event_tags.id = events.id
                ) AS tags,
                json_build_object(
                    'id', event_categories.id,
                    'name', event_categories.name,
                    'display_order', event_categories.display_order
                ) AS event_category
            FROM events
            LEFT JOIN event_categories ON events.id = event_categories.id
            LEFT JOIN event_tags ON events.id = event_tags.id
            LEFT JOIN users ON events.id = users.id
            LEFT JOIN event_locations ON events.id_event_location = event_locations.id
            LEFT JOIN locations ON event_locations.id_location = locations.id
            LEFT JOIN provinces ON locations.id_province = provinces.id
        ),
        total_event_count AS (
            SELECT count(*) AS total_count
            FROM events
        )
        SELECT
            (SELECT json_agg(row_to_json(event_details)) FROM event_details) AS events,
            (SELECT row_to_json(total_event_count) FROM total_event_count) AS total_count;
        `

        let returnArray = await PQ.PostgreQuery(sql);
        return returnArray.rows;
    }
}