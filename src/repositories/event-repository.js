import PostgreQuery from "../helpers/query-sql-helper.js";
const PQ = new PostgreQuery();

export default class EventRepository{
    async getAsync(sql){
        sql = `SELECT * FROM events ${sql}`
        let returnArray = await PQ.PostgreQuery(sql);
        return returnArray.rows;        
    }

    async getAllAsync(page = 1){ // Paginar el endpoint

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

    async getById(id){
        const sql = `select events.id,
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
                'id_province', locations,
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
        ) as event_location,
         json_build_object(
            'id', users.id,
            'first_name', users.first_name,
            'last_name', users.last_name,
            'username', users.username,
            'password', users.password
        )as creator_user,
         (
            select json_agg(json_build_object(tags.id, tags.name))
            from tags
            join event_tags on tags.id = event_tags.id_tag
        
            where event_tags.id = events.id
        )as tags,
            json_build_object(
            'id', event_categories.id,
            'name', event_categories.name,
            'display_order', event_categories.display_order
        ) as event_category
        
        from events
        left join event_categories on events.id = event_categories.id
        left join event_tags on events.id = event_tags.id
        left join users on events.id = users.id
        left join event_locations on events.id = event_locations.id
        left join locations on event_locations.id = locations.id
        left join provinces on locations.id_province = provinces.id
        where events.id = $1`

        let values = [id];
        let returnArray = await PQ.PostgreQuery(sql, values);
        return returnArray.rows[0];
    }

    async createEvent(event){
        const sql = `INSERT INTO public.events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
        let values = [event.name, event.description, event.id_event_category, event.id_event_location, event.start_date, event.duration_in_minutes, event.price, event.enable_for_enrollment, event.max_assistance, event.id_creator_user];
        let returnArray = await PQ.PostgreQuery(sql, values);

        if(returnArray.rowCount != 0){
            return true;
        }
        else{
            return false;
        }
    }

    async UpdateEvent(event){
        const sql = `UPDATE public.events
                    SET name = $1, description = $2, id_event_category = $3, id_event_location = $4, start_date = $5, duration_in_minutes = $6, price = $7, enable_for_enrollment = $8, max_assistance = $9 
                    WHERE id = $10`;
        let values = [event.name, event.description, event.id_event_category, event.id_event_location, event.start_date, event.duration_in_minutes, event.price, event.enable_for_enrollment, event.max_assistance, event.id];
        let returnArray = await PQ.PostgreQuery(sql, values);
        return true;

        //ᡕᠵデ气亠
    }

    async DeleteEventById(id){
        const sql = `DELETE FROM events WHERE id = $1`;
        const values = [id];
        let returnArray = await PQ.PostgreQuery(sql, values);
        console.log(returnArray);
        if(returnArray.rowCount != 0){
            return true;
        }
        return false;
    }
}