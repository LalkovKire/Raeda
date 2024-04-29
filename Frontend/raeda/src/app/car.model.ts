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
    public status: number,
    public price: number,
    public location: {
      locationName: string;
    },
    public brand?: string,
    public carId?: number,
    public licensePlate?: string
  ) {}
}
