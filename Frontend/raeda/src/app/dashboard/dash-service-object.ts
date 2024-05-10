import { CarStatus } from "../shared/car-status";

export interface DashObject {
    imageUrl: String;
    name: String;
}

export interface DashCarModel {
    model: string;
    carType: string;
    seats: number;
    gearBox: string;
    yearMade: number;
    doors: number;
    fuelType: string;
    engine: string;
    status: CarStatus;
    price: number;
    location: {
        locationName: string;
    },
    brand: string;
    carID: number;
    licensePlate: string;
}