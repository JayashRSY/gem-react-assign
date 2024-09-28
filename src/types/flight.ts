export interface IFlight {
    id: number;
    name: string;
    departureTime: string;
    arrivalTime: string;
    flightHours: number;
    price: number;
    emiPrice: number;
    start: string;
    startCode: string;
    end: string;
    endCode: string;
    totalTime: string;
    refundPolicy: string;
    noCostEMI: boolean;
    logo: string;
}
