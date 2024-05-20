class Location{
    id;
    name;
    id_province;
    latitude;
    longitude;
    
    constructor(id, name, id_province, latitude, longitude){
        this.id = id;
        this.name = name;
        this.id_province = id_province;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default Location;