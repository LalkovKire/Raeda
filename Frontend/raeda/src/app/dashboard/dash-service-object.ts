import { CarModel } from "../shared/car.model";

export interface DashObject {
    imageUrl: String;
    name: String;
    routeLink: String;
}

export interface CarLocation {
    locationId: number;
    locationName: string;
    locationAddress: string;
}

export interface CarLocationRequest {
    locationName: string;
    locationAddress: string;
}

export interface DashRental {
    rentalID: number,
    pickupTime: String,
    dropOffTime: String,
    car: CarModel,
    rentalDuration: number,
    totalPrice: number,
    location: CarLocation
}
