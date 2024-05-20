class Event_locations{
    id;
    id_location;
    name;
    full_address;
    max_capacity;
    latitude;
    longitude;
    id_creator_user;

    constructor(id, id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user){
        this.id = id;
        this.id_location = id_location;
        this.name = name;
        this.full_address = full_address;
        this.max_capacity = max_capacity;
        this.latitude = latitude;
        this.longitude = longitude;
        this.id_creator_user = id_creator_user;
    }
}
export default Event_locations;