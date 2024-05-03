class Province{
    id;
    name;
    full_name;
    latitudeM
    longitude;
    display_order;

    constructor(id, name, full_name, latitudeM, longitude, display_order) {
        this.id = id;
        this.name = name;
        this.full_name = full_name;
        this.latitudeM = latitudeM;
        this.longitude = longitude;
        this.display_order = display_order;
    }
}

export default Province;