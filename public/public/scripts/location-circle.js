function isValid(coordinate) {
    let lat = coordinate.latitude;
    let lon = coordinate.longitude;

    if (!(lat < -90 || lat > 90 || lon < -180 || lon > 180))
        return true;
    else
        return false;
}

function isValidType(location){
    if(location.type === "circle"){
        return true;
    }
    else{
        throw new Error(InvalidLocationType);
    }
}

function isValidLocation(location) {
    if (location.name.length > 0 && isValidType(location) && isValid(location.coordinates) && location.radiusMeters == 30.0)
        return true;
    else
        throw new Error(InvalidLocation);
}

function isValidDevice(device)
{
    if(isValid(device.coordinate))
        return true;
    else
        throw new Error(InvalidDevice)
}

export function isInsideCircle(device, location)
{
    if(isValidDevice(device)&&isValidLocation(location))
    {
        let dLat = device.coords.latitude;
        let dLon = device.coords.longitude;

        let lLat = location.coordinates[0].latitude;
        let lLon = location.coordinates[0].longitude;

        if(dLat<=lLat && dlon<=lLon)
        {
            return true;
        }
        else
            return false;
    }
    else
        return false;
}

