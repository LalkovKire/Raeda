create table carUser (
     userID BIGSERIAL primary key,
     firstName varchar(100) not null,
     lastName varchar(100) not null,
     email varchar(100) not null unique,
     phoneNumber varchar(100) not null,
     country varchar(100),
     userPassword varchar(255) not null,
     userRole SMALLINT not null
);

create table Car (
    carID BIGSERIAL PRIMARY KEY,
    image VARCHAR(255) not null,
    gearBox VARCHAR(50) not null,
    model VARCHAR(100) not null,
    licensePlate VARCHAR(20) UNIQUE,
    yearMade INT not null,
    seats INT not null,
    status SMALLINT not null,
    price INT not null,
    engine VARCHAR(50) not null,
    carType VARCHAR(50) not null
);

create table Location (
    locationID BIGSERIAL PRIMARY KEY,
    locationSite VARCHAR(100) not null,
    locationName VARCHAR(100) not null
);

create table Rental (
    rentalID BIGSERIAL PRIMARY KEY,
    pickupDate TIMESTAMP not null,
    dropOffDate TIMESTAMP not null,
    totalPrice INT not null,
    rentalDuration INT,
    userID BIGINT not null,
    carID BIGINT not null,
    locationID BIGINT not null,
    FOREIGN KEY (userID) REFERENCES carUser(userID),
    FOREIGN KEY (carID) REFERENCES Car(carID),
    FOREIGN KEY (locationID) REFERENCES Location(locationID)
);

create table RentalReview (
    reviewID BIGSERIAL PRIMARY KEY,
    description TEXT,
    reviewDate TIMESTAMP not null,
    rating BIGINT not null,
    userID BIGINT not null,
    rentalID BIGINT not null,
    FOREIGN KEY (userID) REFERENCES carUser(userID),
    FOREIGN KEY (rentalID) REFERENCES Rental(rentalID)
);

create table car_locations (
    car_id INT not null,
    location_id INT not null,
    PRIMARY KEY (carID, locationID),
    FOREIGN KEY (carID) REFERENCES Car(car_id),
    FOREIGN KEY (locationID) REFERENCES Location(location_id)
);
