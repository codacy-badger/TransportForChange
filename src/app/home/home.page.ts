import { Component, OnInit } from '@angular/core';
import { LatLongTuple, TripGoService } from '../service/trip-go.service';
import { Trip, TripType } from '../generated/tripGo';
import { Subject, ReplaySubject } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    $leftTrip: ReplaySubject<Trip> = new ReplaySubject<Trip>(1);
    $rightTrip: ReplaySubject<Trip> = new ReplaySubject<Trip>(1);

    $startAndEndPoints: Subject<LatLongTuple> = new Subject<LatLongTuple>();

    constructor(private tripGoService: TripGoService) {

    }

    ngOnInit(): void {
        this.$startAndEndPoints
            .subscribe(points => this.getPublicTransportTrip(points));
        this.$startAndEndPoints
            .subscribe(points => this.getPrivateVehicleTrip(points));
    }

    getPublicTransportTrip(points: LatLongTuple) {
        this.tripGoService.$getPublicTransportTripsFromPointToPoint(points)
            .subscribe(res => {
                const bestTrip = this.tripGoService.getBestTripFromGroup(res.groups);
                bestTrip.type = TripType.PT_PUB;
                this.$leftTrip
                    .next(bestTrip);
            });
    }

    getPrivateVehicleTrip(points: LatLongTuple) {
        this.tripGoService.$getPrivateVehicleTripsFromPointToPoint(points)
            .subscribe(res => {
                const bestTrip = this.tripGoService.getBestTripFromGroup(res.groups);
                bestTrip.type = TripType.ME_CAR;
                this.$rightTrip
                    .next(bestTrip);
            });
    }

}
