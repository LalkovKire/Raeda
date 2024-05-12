import { Location } from '../dashboard/dash-service-object';
import { CarStatus } from './car-status';

export class CarModel {
  constructor(
    public image: string,
    public model: string,
    public carType: string,
    public seats: number,
    public gearBox: string,
    public yearMade: number,
    public doors: number,
    public fuelType: string,
    public engine: string,
    public status: CarStatus,
    public price: number,
    public location: Location,
    public brand: string,
    public carID: number,
    public licensePlate: string
  ) {}
}
