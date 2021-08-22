import { useState } from 'react';
import useWindowSize from '../WindowSize';
import './home.style.css';



function Home({ history }) {

    const [keyword, setKeyword] = useState('') 

    const [includeCanceledTrips, shuffleIncludeCanceledTrips ] = useState(false)

    const [distance, setDistance] = useState('any')

    const [time, setTime] = useState('any')

    let size = useWindowSize();

    const handleSearch = () =>{
        history.push({
            pathname: '/search',
            search:  "?" 
            +new URLSearchParams({keyword: keyword}).toString()
            + '&' +new URLSearchParams({type: includeCanceledTrips? "all" : "completed"}).toString()
            + '&' +new URLSearchParams({distance: distance}).toString()
            + '&' +new URLSearchParams({time: time}).toString()
        })
    }

  return (
    <div className={size.width > 500 ?"main" : "main mob-main"}>
        <div className={size.width > 500 ?"container" : "container mob-container"}>
            <div className="head" >
                <h1 style={{textAlign: 'center'}}>Mosquitoes Trip Search</h1>
            </div>
            <div>
                <form className="formarea">
                    <div>
                        <label className="keyname">Keyword</label><br />
                        <input className="inputarea" onChange={(e)=>{setKeyword(e.target.value)}} type="text"   value={keyword} placeholder="Search here..."/>

                    </div>
                    <div>
                        <input  id="chk" type="checkbox" checked={includeCanceledTrips} onChange={()=>shuffleIncludeCanceledTrips(includeCanceledTrips? false : true)} value={includeCanceledTrips}/> 
                        <label for="chk" >Include canceled trips</label>
                    </div>

                    <div className="radios-div">
                        <div className="radio-cont">
                            <fieldset className="field" data-role="controlgroup_a">
                                <legend>Distance</legend>
                                <section>
                                    <input type="radio" name="distance" id="radio-choice-1t" onChange={()=>setDistance("any")} checked = {"any"===distance} value={distance} />
                                    <label for="radio-choice-1t">Any</label>
                                </section>
                                <section>
                                    <input type="radio" name="distance" id="radio-choice-2t" onChange={()=>setDistance("u3")} checked = {"u3"===distance} value={distance} />
                                    <label for="radio-choice-2t">Under 3 km</label>
                                </section>
                                <section>
                                    <input type="radio" name="distance" id="radio-choice-3t" onChange={()=>setDistance("3-8")} checked = {"3-8"===distance} value={distance} />
                                    <label for="radio-choice-3t">3 to 8 km</label>
                                </section>
                                <section>
                                    <input type="radio" name="distance" id="radio-choice-4t" onChange={()=>setDistance("8-15")} checked = {"8-15"===distance} value={distance} />
                                    <label for="radio-choice-4t">8 to 15 km</label>
                                </section>
                                <section>
                                    <input type="radio" name="distance" id="radio-choice-5t" onChange={()=>setDistance("m15")} checked = {"m15"===distance} value={distance} />
                                    <label for="radio-choice-5t">More than 15 km</label>
                                </section>
                                
                            </fieldset>
                        </div>
                        <div className="radio-cont">
                                <fieldset className="field" data-role="controlgroup_b">
                                    <legend>Time</legend>
                                    <section>
                                        <input type="radio" name="time" id="radio-choice-1b" onChange={()=>setTime("any")} checked = {"any"===time} value={time}/>
                                        <label for="radio-choice-1b">Any</label>
                                    </section>
                                    <section>
                                        <input type="radio" name="time" id="radio-choice-2b" onChange={()=>setTime("u5")} checked = {"u5"===time} value={time}/>
                                        <label for="radio-choice-2b">Under 5 min</label>
                                    </section>
                                    <section>
                                        <input type="radio" name="time" id="radio-choice-3b" onChange={()=>setTime("5-10")} checked = {"5-10"===time} value={time}/>
                                        <label for="radio-choice-3b">5 to 10 min</label>
                                    </section>
                                    <section>
                                        <input type="radio" name="time" id="radio-choice-4b" onChange={()=>setTime("10-20")} checked = {"10-20"===time} value={time}/>
                                        <label for="radio-choice-4b">10 to 20 min</label>
                                    </section>
                                    <section>
                                        <input type="radio" name="time" id="radio-choice-5b" onChange={()=>setTime("m20")} checked = {"m20"===time} value={time}/>
                                        <label for="radio-choice-5b">More than 20 min</label>
                                    </section>
                                    
                                </fieldset>

                        </div>
                        <div className="btn-div">
                            <button className="btn" onClick={()=>handleSearch()}>Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export { Home } ;
