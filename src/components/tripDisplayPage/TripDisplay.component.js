import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../redux/store';
import { MapDrawer } from '../map';
import useWindowSize from '../WindowSize';

export * from './tripDisplay.style.css';

const TripDisplay = ({ match }) => {

	const [{ allTrips, gettingTrips }, dispatch] = useStateValue();

	const [trip , setTrip] = useState()

	const [tripsLoaded, setTripsLoaded] = useState(allTrips.length === 0? false : true)

	function getTrip(_trip) {
			return _trip.id+'' === match.params.id+''
	}
	  

	let size = useWindowSize();
	// console.log("trip matched: ", match.params.id, trips.find(getTrip))

	useEffect(()=>{
		async function fetchData() {
			const data = await axios.get('https://hr.hava.bz/trips/recent.json')
			setTrip(data.data.trips.find(getTrip));
			return data.data.trips
		} 

		if(!tripsLoaded){
			// console.log('trips not loaded')
			dispatch({type: 'GET_TRIPS'});
			setTripsLoaded(true);
        	fetchData()
			.then(trips => {
				// console.log(trips)
				dispatch({type: 'GET_TRIPS_SUCCESS', trips: trips}); 
				// console.log('dispatching success')
			})
		}
		
		setTrip(allTrips.find(getTrip));
		
		// console.log(match.params.id) 
	},[match])
	

	const date = trip && new Date(trip.request_date);
	const dropoff_date = trip && new Date(trip.dropoff_date);
	const pickup_date = trip && new Date(trip.pickup_date);
    const rate = trip && trip.driver_rating * 2;
    const complete = trip && trip.status === "COMPLETED"? true : false;

    const generateRates = () => {
        const rateStars={
            fullStars: [],
            halfStars: [],
            NoStars: []
        }
        
		let index = 0;

        if (rate === 10){
             for (let i = 0; i<5; i++){
                 rateStars.fullStars.push(
                    <i key={index++} className="fa fa-star" aria-hidden="true"></i>
                 )
             }
            return rateStars;
        }

        if (rate === 0 ){
            for (let i = 0; i<5; i++){
                rateStars.NoStars.push(
                    <i key={index++} className="fa fa-star-o" aria-hidden="true"></i>
                )
            }
            return rateStars;
        }

        const temp =  Math.trunc( rate / 2 );

        // console.log( "temp ", temp);

        const full_stars = temp;
        const empty_stars = Math.trunc( 5 - ( rate / 2 ) );
        const half_stars = 5 - ( empty_stars + full_stars );
        //get full starts
        for (let i = 0; i < full_stars; i ++ ){
            rateStars.fullStars.push(
                <i key={index++} className="fa fa-star" aria-hidden="true"></i>
             )
        }
        for (let i = 0; i < empty_stars; i ++ ){
            rateStars.NoStars.push(
                <i key={index++} className="fa fa-star-o" aria-hidden="true"></i>
             )
        }
        for (let i = 0; i < half_stars; i ++ ){
            rateStars.halfStars.push(
                <i key={index++} className="fa fa-star-half-o" aria-hidden="true"></i> 
            )
        }

        return rateStars;

    }

	
	return(
		<>{
			gettingTrips ?
			<div className = "main">
                <div className="headr"><Link to="/search"><i className="fa fa-angle-left" aria-hidden="true"></i>  &nbsp; &nbsp;Trip Details </Link></div>
				<div className="loda">
				<div class="lds-dual-ring"></div>
				</div>
			</div>
			: trip &&
            <div className = "main">
                <div className="headr"><Link to="/search"><i className="fa fa-angle-left" aria-hidden="true"></i>  &nbsp; &nbsp;Trip Details </Link></div>
                
					<div className="section-holder">
						<section className="inlne ">
							{date.getMonth()}/{date.getDay()}/{date.getFullYear()} {date.getHours()}:{(date.getMinutes()+"").length<2 ? "0": ""}{date.getMinutes()} {date.getHours()>= 12 ? 'PM' : 'AM'}
						</section>
						<section className="inlne right">
						<i className="fa fa-money-check-alt"></i> &nbsp;&nbsp;
							{trip.cost+" " +trip.cost_unit}
						</section>
					</div>
					<div className="section-holder">
						<section className="inlne ">
							<i style={{color: "green"}} className="fa fa-circle" aria-hidden="true"></i>
							&nbsp;&nbsp;{trip.pickup_location}
						</section>
						<section className="inlne right">
							&nbsp;&nbsp;{pickup_date.getHours()} : {(pickup_date.getMinutes()+"").length<2 ? "0": ""}{pickup_date.getMinutes()} {pickup_date.getHours()>= 12 ? 'PM' : 'AM'}
						</section>
					</div>
					<div className="section-holder">
						<section className="inlne ">
							<i style={{color: "red"}} className="fa fa-circle-thin" aria-hidden="true"></i>
							&nbsp;&nbsp;{trip.dropoff_location}
						</section>
						<section className="inlne right">
							&nbsp;&nbsp;{dropoff_date.getHours()} : {(dropoff_date.getMinutes()+"").length<2 ? "0": ""}{dropoff_date.getMinutes()} {dropoff_date.getHours()>= 12 ? 'PM' : 'AM'}
						</section>
						
					</div>
					<div className="section-holder details">
						<div className="details-child">
							<div>
							<img className="carpic" alt = "" src ={trip.car_pic}/>
							</div>
							<div className="name">
								{trip.car_make}&nbsp;{trip.car_model}
							</div>
						</div>
						<div className="details-child">
							<div className="tripcost-div">
								<div className="tripcosts">
									<section className="inlne-cst ">
										Distance
									</section>
									<section className="inlne-cst right">
										{trip.distance} {trip.distance_unit}
									</section>
								</div>
								<div className="tripcosts">
									<section className="inlne-cst ">
										Duration
									</section>
									<section className="inlne-cst right">
										{trip.duration} {trip.duration_unit}
									</section>
								</div>
								<div className="tripcosts">
									<section className="inlne-cst ">
										Sub total
									</section>
									<section className="inlne-cst right">
										{trip.cost} {trip.cost_unit}
									</section>
								</div>
							</div>
						</div>
						<div className="details-child">
							<div className="name">
								{trip.driver_name}
							</div>
							<div>
								<img className="driverpic" alt = "" src ={trip.driver_pic}/>
							</div>
							<div className="name rates">
							{generateRates().fullStars.map(group=>(
							group
							))}
							{generateRates().halfStars.map(group=>(
							group
							))}
							{generateRates().NoStars.map(group=>(
							group
							))}
						</div>
						</div>
						
					</div>
					<div className="section-holder map">
								<MapDrawer destination = {{lat: trip.dropoff_lat , lng: trip.dropoff_lng}}  pickup = {{lat: trip.pickup_lat, lng: trip.pickup_lng}}/>
					</div>
                
            </div>}
        </>
	)
}

export {TripDisplay}