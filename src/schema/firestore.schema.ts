import { 
    Collection,
    CustomRepository,
    SubCollection,
    ISubCollection,
} from 'fireorm';
import ImprovedRepository from './ImprovedRepository';

export class Schedule{
    id: string;
    date: Date;
    note: string;
}

@Collection('itineraries')
export class Itinerary{
    id: string;
    name:string;
    startDateUTC: Date;
    endDateUTC: Date;
    totalDays: number;

    @SubCollection(Schedule, 'schedules')
    schedules?:ISubCollection<Schedule>;
}

@Collection('userItineraries')
export class UserItinerary {
    id: string;
    totalItineraries: number;

    @SubCollection(Itinerary, 'itineraries')
    itineraries?:ISubCollection<Itinerary>;
}

@Collection('users')
export class User{
    id: string;
    displayName: string;
    email: string;
}


@CustomRepository(User)
export class UserRepo extends ImprovedRepository<User>{}

@CustomRepository(UserItinerary)
export class UserItineraryRepo extends ImprovedRepository<UserItinerary>{}

@CustomRepository(Itinerary)
export class ItineraryRepo extends ImprovedRepository<Itinerary>{}

@CustomRepository(Schedule)
export class ScheduleRepository extends ImprovedRepository<Schedule>{}

