import './TripCard.style.css';

function TripCard( { item }) {


    const date = new Date(item.request_date);
    const price = item.cost +" " +item.cost_unit;
    const location = item.pickup_location;
    const rate = item.driver_rating * 2;
    const miniLocation = item.dropoff_location;
    const complete = item.status === "COMPLETED"? true : false;


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
                    <i key = {index++} class="fa fa-star" aria-hidden="true"></i>
                 )
             }
            return rateStars;
        }

        if (rate === 0 ){
            for (let i = 0; i<5; i++){
                rateStars.NoStars.push(
                    <i key = {index++} class="fa fa-star-o" aria-hidden="true"></i>
                )
            }
            return rateStars;
        }

        const temp =  Math.trunc( rate / 2 );

        console.log( "temp ", temp);

        const full_stars = temp;
        const empty_stars = Math.trunc( 5 - ( rate / 2 ) );
        const half_stars = 5 - ( empty_stars + full_stars );
        //get full starts
        for (let i = 0; i < full_stars; i ++ ){
            rateStars.fullStars.push(
                <i key = {index++} class="fa fa-star" aria-hidden="true"></i>
             )
        }
        for (let i = 0; i < empty_stars; i ++ ){
            rateStars.NoStars.push(
                <i key = {index++} class="fa fa-star-o" aria-hidden="true"></i>
             )
        }
        for (let i = 0; i < half_stars; i ++ ){
            rateStars.halfStars.push(
                <i key = {index++} class="fa fa-star-half-o" aria-hidden="true"></i> 
            )
        }

        return rateStars;

    }
  return (
    <div className="tripcard">
        <div>
            <section className="inlne ">
                {date.getMonth()}/{date.getDay()}/{date.getFullYear()} {date.getHours()} : {(date.getMinutes()+"").length<2 ? "0": ""}{date.getMinutes()} {date.getHours()>= 12 ? 'PM' : 'AM'}
            </section>
            <section className="inlne right">
                {price}
            </section>
        </div>
        <div>
            <i style={{color: "green"}} class="fa fa-circle" aria-hidden="true"></i>
            &nbsp;&nbsp;{location}
        </div>
        <div>
            <section className="inlne ">
                <i style={{color: "red"}} class="fa fa-circle-thin" aria-hidden="true"></i>
                &nbsp;&nbsp;{miniLocation}
            </section>
            <section className="inlne right">
                {generateRates().fullStars.map(group=>(
                   group
                ))}
                {generateRates().halfStars.map(group=>(
                   group
                ))}
                {generateRates().NoStars.map(group=>(
                   group
                ))}
            </section>
        </div>
        <div>
            <section className="inlne right" style={{display: 'block', width: "100%"}}>
                
            {complete? <section>Completed &nbsp;<i style={{color: "green", fontSize: "24px"}} class="fa fa-check" aria-hidden="true"></i></section> :
             <section>Canceled &nbsp;<i style={{color: "red" , fontSize: "24px"}} class="fa fa-ban"></i></section>}
            </section>
        </div>
    </div> 
  );
}

export  {TripCard};
