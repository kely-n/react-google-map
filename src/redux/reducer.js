import { trips } from "../backend/trips";

export const initialState = {
	trips: trips.trips,
	searchedTrips: [],
	allTrips: [],
	loadingTrips: false,
	gettingTrips: false,
}

const tripReducer =(state = initialState, action) => {
	switch(action.type){
		case "SEARCH_TRIP": {
			return{...state, loadingTrips: true}
		}
		case "SEARCH_TRIP_SUCCESS": {
			return {...state, searchedTrips: action.trips, loadingTrips: false}
		}
		case "GET_TRIPS" : {
			return{...state, gettingTrips: true}
		}
		case "GET_TRIPS_SUCCESS": {
			return{
				...state, gettingTrips: false, allTrips: action.trips
			}
		}
		default: 
			return state;
	}
}

export default tripReducer;