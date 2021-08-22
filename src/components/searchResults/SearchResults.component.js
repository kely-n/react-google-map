import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStateValue } from "../../redux/store";
import { TripCard } from "../tripCard";
import useWindowSize from "../WindowSize";
import './searchResults.style.css'
const SearchResults = () => {

    const [{allTrips, searchedTrips, loadingTrips}, dispatch] = useStateValue();
    const [tripsLoaded, setTripsLoaded] = useState(allTrips.length === 0? false : true)
    const search = useLocation().search;

    const keyword = new URLSearchParams(search).get('keyword');
    const type = new URLSearchParams(search).get('type');
    const distance = new URLSearchParams(search).get('distance');
    const time = new URLSearchParams(search).get('time');

    let size = useWindowSize();

    useEffect(()=>{

        async function fetchData() {
			const data = await axios.get('https://hr.hava.bz/trips/recent.json')
            dispatch({type: 'GET_TRIPS_SUCCESS', trips: data.data.trips});

			let _trips = data.data.trips.filter((data)=>{ //check if completed
                if(type === "all"){
                    return true
                }
                else{
                    return data.status === 'COMPLETED'
                }
            }).filter((data)=>{ //check word
                if(keyword && keyword!==''){
                    let keywords = keyword.split(' ');
                    const regex = new RegExp(keywords[0])

                    return (
                        regex.test(data.pickup_location)
                        || regex.test(data.dropoff_location)
                        || regex.test(data.driver_name)
                        || regex.test(data.car_make)
                        || regex.test(data.car_model)
                        || regex.test(data.car_number)
                        || regex.test(data.type)
                    )
                }
                else{
                    return true
                }
            }).filter((data)=>{ //check for time
                let a = data.duration
                switch(time){
                    case ('u5') : 
                        return (a <= 5);
                    case ('5-10') :
                        return (a > 5 && a <= 10);
                    case ('10-20') : 
                        return (a > 10 && a <= 20) ;
                    case ('m20'): 
                        return (a > 20);
                    case ('any'): 
                        return true;
                    default: 
                        return true;
                }
                
            }).filter((data)=>{ //check for distance
                let a = data.distance
                switch(distance){
                    case ('u3') : 
                        return (a <= 3);
                           case ('3-8') : 
                        return (a > 3 && a < 8);
                           case ('8-15') : 
                        return (a > 8 && a <= 15) ;
                           case ('m15'): 
                        return (a > 15);
                           case ('any'): 
                        return true;
                          default: 
                        return true;
                       }
                
            })

            return _trips;
		} 

		if(!tripsLoaded){
			console.log('trips not loaded')
			dispatch({type: 'GET_TRIPS'});
			setTripsLoaded(true);
        	fetchData()
			.then(trips => {
				console.log(trips)
                dispatch({type: 'SEARCH_TRIP_SUCCESS', trips: trips});
				console.log('dispatching success')
			})
		}
        else if(tripsLoaded){
            dispatch({type: 'SEARCH_TRIP'});
            let _trips = allTrips.filter((data)=>{
                if(type === "all"){
                    return true
                }
                else{
                    return data.status === 'COMPLETED'
                }
            })
            .filter((data)=>{
                if(keyword && keyword!==''){
                    let keywords = keyword.split(' ');
                    const regex = new RegExp(keywords[0])

                    return (
                        regex.test(data.pickup_location)
                        || regex.test(data.dropoff_location)
                        || regex.test(data.driver_name)
                        || regex.test(data.car_make)
                        || regex.test(data.car_model)
                        || regex.test(data.car_number)
                        || regex.test(data.type)
                    )
                }
                else{
                    return true
                }
            }).filter((data)=>{ //check for time
                let a = data.duration
                switch(time){
                    case ('u5') : 
                        return (a <= 5);
                    case ('5-10') :
                        return (a > 5 && a <= 10);
                    case ('10-20') : 
                        return (a > 10 && a <= 20) ;
                    case ('m20'): 
                        return (a > 20);
                    case ('any'): 
                        return true;
                    default: 
                        return true;
                }
                
            }).filter((data)=>{ //check for distance
                let a = data.distance
                switch(distance){
                    case ('u3') : 
                        return (a <= 3);
                           case ('3-8') : 
                        return (a > 3 && a < 8);
                           case ('8-15') : 
                        return (a > 8 && a <= 15) ;
                           case ('m15'): 
                        return (a > 15);
                           case ('any'): 
                        return true;
                          default: 
                        return true;
                       }
                
            });
           
            dispatch({type: 'SEARCH_TRIP_SUCCESS', trips: _trips});
           
            
        }
    },[])

    return (
        <> 
            <div className ={size.width > 500 ?"main" : "main mob-main"}>
                <div><Link to="/home"><i className="fa fa-angle-left" aria-hidden="true"></i>  Trips({searchedTrips.length!==0 && searchedTrips.length}) {keyword}</Link></div>
                {
                    loadingTrips? 
                    <div className="loda">
                        <div class="lds-dual-ring"></div>
                    </div>
                    :
                    <div className={size.width > 500 ?"container" : "container mob-container"}>
                    {
                        searchedTrips.map((item)=>(
                             <Link key = {item.id} to={`/trip/${item.id}`} style={{textDecoration: "none", color: "#000"}}>
                                <TripCard
                                    
                                    item = {item}
                                />
                              </Link>
                        ))
                    }
                </div>}
            </div>
        </>
    )
}

export { SearchResults }