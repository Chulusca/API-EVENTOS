class Events{
    id;
    name;
    description;
    id_event_category;
    id_event_location;
    start_date;
    duration_in_minutes;
    price;
    enable_for_enrollment;
    max_assistance;
    id_creator_user;

    constructor(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enable_for_enrollment, max_assistance, id_creator_user){
        this.id = id;
        this.name = name; 
        this.description = description;
        this.id_event_category = id_event_category;
        this.id_event_location = id_event_location;
        this.start_date = start_date;
        this.duration_in_minutes = duration_in_minutes;
        this.price = price;
        this.enable_for_enrollment = enable_for_enrollment;
        this.max_assistance = max_assistance;
        this.id_creator_user = id_creator_user;
    }
}
export default Events;