// import preact
import { h, render, Component } from 'preact';
import {route,Router} from 'preact-router';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

history.replaceState(0,0,'/');  // jsfiddle url defaults to `/_display`

function search(query) {
	route(`/Map?q=${encodeURIComponent(query)}`);
}


/** demo Header nav+search */
//stateless app, only has ref to buttons
const Header = () => (
	<div id="test"> 
		<nav>
			<a href="/">Home</a>
			<a href="/Map" onClick={hideapi}>Map</a>
		</nav>
	</div>
)
//Edit this above

export default class Iphone extends Component {

	setText = e => {
		this.setState({ text: e.target.value });
	};
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		//FETCH CITY + WEATHER CONDITION + TEMPERATURE + WINDSPEED
		var url = "http://api.openweathermap.org/data/2.5/weather?q="+"London"+"&units=metric&APPID=ef69e1c2eb75a934bf17ba81e4224df4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }

		})

		//FETCH PARTICLE MATTER
		var url = "http://api.openweathermap.org/data/2.5/air_pollution?lat=51.5072&lon=0.1276&appid=ef69e1c2eb75a934bf17ba81e4224df4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse_Particle,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		//FETCH HOURLY TEMPERATURE
		var url = "http://api.weatherapi.com/v1/forecast.json?key=814e082b092e4cae8fc150902220803&q=London&days=1&aqi=no&alerts=yes";
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseResponse_Hourly,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		//FETCH DAILY WEATHER TEMPERATURE
		var url = "http://api.weatherapi.com/v1/forecast.json?key=814e082b092e4cae8fc150902220803&q=London&days=3&aqi=no&alerts=yes";
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseResponse_Daily,
			error : function(req, err){ console.log('API call failed ' + err); }
			
		})

		//FETCH ANY ALERTS! CHECK IF WEATHER IS DANGEROUS - IF SO NOTIFY USER
		var url = "http://api.weatherapi.com/v1/forecast.json?key=814e082b092e4cae8fc150902220803&q=London&days=1&aqi=no&alerts=yes";
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseResponse_Alert,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		//when run changes opacity from 0 to 0.9
		showapi()
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render({ }) 
	{// uses router to allow page switching
		
		// check if temperature data is fetched, if so add the sign styling to the page
		//const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		// display all weather data
		return (
			
			<div class={ style.container }>
				
				<div id="test2">
				<Header />
					<Router>
						<Map path="/Map/:user?" />
					</Router>
				</div>	
				<div class = {style.All_data} id= "opacitychange">
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>

						<div class = {style.today_weather}>
							<img class = {style.icon_sun} src = {this.state.daily_today}></img>

							<span>{ this.state.temp }</span>
							<br></br>

							<span>{ this.state.wind }</span>
							<br></br>

							<span>{ this.state.particle }</span>
							<br></br>

							<br></br>
							<p id = "red">{ this.state.alert }</p>
						</div>
						


						<div class = {style.Hourly_Content}>
						<span>
						<span class = { style.hourly }>{ this.state.hourly_0 }</span>
						<img class = {style.icon} src = {this.state.hourly_0_icon}></img>
						</span>

						<span>
						<span class = { style.hourly }>{ this.state.hourly_4 }</span>
						<img class = {style.icon} src = {this.state.hourly_4_icon}></img>
						</span>

						<span>
						<span class = { style.hourly }>{ this.state.hourly_8 }</span>
						<img class = {style.icon} src = {this.state.hourly_8_icon}></img>
						</span>

						<span>
						<span class = { style.hourly }>{ this.state.hourly_12 }</span>
						<img class = {style.icon} src = {this.state.hourly_12_icon}></img>
						</span>

						<span>
						<span class = { style.hourly }>{ this.state.hourly_16 }</span>
						<img class = {style.icon} src = {this.state.hourly_16_icon}></img>
						</span>

						<span>
						<span class = { style.hourly }>{ this.state.hourly_20 }</span>
						<img class = {style.icon} src = {this.state.hourly_20_icon}></img>
						</span>
						</div>

						<br></br>

						<div class = {style.Daily}>
						<span class = { style.hourly }>{ this.state.daily_tomorrow }</span>
						<img class = {style.icon} src= {this.state.daily_tomorrow_icon}></img>
						<span class = { style.hourly }>{ this.state.daily_tomtom }</span>
						<img class = {style.icon} src= {this.state.daily_tomtom_icon}></img>
						</div>
						


						</div>
						
				</div>

				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button id="opacitychange" class={ style_iphone.button } clickFunction={ this.fetchWeatherData}/ > : null } 
				</div>
				<div class={ style.details }></div>
			</div>
		);
	}

	//PARSE THE RESULTS FOR CITY+TEMP+CONDITION+WINDSPEED
	parseResponse = (parsed_json) => {
		//get city name
		var location = parsed_json['name'];

		//get temperature
		var temp_c = parsed_json['main']['temp'];
		temp_c = "Temperature: " +String(Math.round(temp_c)+ "°");

		//get weather condition 
		
		var conditions = parsed_json['weather']['0']['description'];

		// get wind speed
		var wind_s = parsed_json['wind']['speed'];
		wind_s = "Windspeed: " + String(Math.round(wind_s)) + " m/s";
		
		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			wind : wind_s,
		});      
	}

	//PARSE THE RESULTS FOR PARTICLE
	parseResponse_Particle = (parsed_json) => {
		var particle_p = parsed_json['list']['0']['components']['pm10'];
		particle_p = "Particulate Matter: " + String(Math.round(particle_p)+ " kg/m3");
		// set states for fields so they could be rendered later on
		this.setState({
			particle : particle_p
		});      
	}

	//PARSE THE RESULTS FOR HOURLY
	parseResponse_Hourly = (parsed_json) => {
		//HOUR 0
		var temp_0 = parsed_json['forecast']['forecastday']['0']['hour']['0']['temp_c'];
		temp_0 = String(Math.round(temp_0)+ "°");
		var hourly_h_0 = "00:00 "+ " - "+temp_0 + " " ;
		var hourly_0_icon_i = parsed_json['forecast']['forecastday']['0']['hour']['0']['condition']['icon'];

		//HOUR 4
		var temp_4 = parsed_json['forecast']['forecastday']['0']['hour']['4']['temp_c'];
		temp_4 = String(Math.round(temp_4)+ "°");
		var hourly_h_4 = "04:00 "+ " - "+ temp_4 + " ";
		var hourly_4_icon_i = parsed_json['forecast']['forecastday']['0']['hour']['4']['condition']['icon'];

		//HOUR 8
		var temp_8 = parsed_json['forecast']['forecastday']['0']['hour']['8']['temp_c'];
		temp_8 = String(Math.round(temp_8)+ "°");
		var hourly_h_8 = "08:00 "+ " - "+ temp_8 + " ";
		var hourly_8_icon_i = parsed_json['forecast']['forecastday']['0']['hour']['8']['condition']['icon'];

		//HOUR 12
		var temp_12 = parsed_json['forecast']['forecastday']['0']['hour']['12']['temp_c'];
		temp_12 = String(Math.round(temp_12)+ "°");
		var hourly_h_12 = "12:00 "+ " - "+ temp_12 + " ";
		var hourly_12_icon_i = parsed_json['forecast']['forecastday']['0']['hour']['12']['condition']['icon'];

		//HOUR 16
		var temp_16 = parsed_json['forecast']['forecastday']['0']['hour']['16']['temp_c'];
		temp_16 = String(Math.round(temp_16)+ "°");
		var hourly_h_16 = "16:00 "+ " - "+ temp_16 + " ";
		var hourly_16_icon_i = parsed_json['forecast']['forecastday']['0']['hour']['16']['condition']['icon'];

		//HOUR 20
		var temp_20 = parsed_json['forecast']['forecastday']['0']['hour']['20']['temp_c'];
		temp_20 = String(Math.round(temp_20)+ "°");
		var hourly_h_20 = "20:00 "+ " - "+ temp_20 + " ";
		var hourly_20_icon_i = parsed_json['forecast']['forecastday']['0']['hour']['20']['condition']['icon'];

		// set states for fields so they could be rendered later on
		this.setState({
			hourly_0 : hourly_h_0,
			hourly_0_icon : hourly_0_icon_i,

			hourly_4 : hourly_h_4,
			hourly_4_icon : hourly_4_icon_i,

			hourly_8 : hourly_h_8,
			hourly_8_icon : hourly_8_icon_i,

			hourly_12 : hourly_h_12,
			hourly_12_icon : hourly_12_icon_i,

			hourly_16 : hourly_h_16,
			hourly_16_icon : hourly_16_icon_i,

			hourly_20 : hourly_h_20,
			hourly_20_icon : hourly_20_icon_i
		});      
	}

	//PARSE THE RESULTS FOR DAILY TEMP
	parseResponse_Daily = (parsed_json) => {
		//GET DATE FOR TOMORROW
		var date_tomorrow = parsed_json['forecast']['forecastday']['1']['date'];

		//GET DATE FOR DAY AFTER TOMORROW
		var date_tomtom = parsed_json['forecast']['forecastday']['2']['date'];
		console.log(parsed_json['forecast']['forecastday']['2']);


		//GET TEMP FORTOMORROW
		var daily_d_tomorrow = parsed_json['forecast']['forecastday']['1']['day']['avgtemp_c'];
		daily_d_tomorrow = date_tomorrow + " - " + String(Math.round(daily_d_tomorrow)+ "°");

		//GET ICON FOR TOMORROW
		var daily_d_tomorrow_icon = parsed_json['forecast']['forecastday']['1']['day']['condition']['icon'];

		//GET TEMP FOR DAY AFTER TOMORROW
		var daily_d_tomtom = parsed_json['forecast']['forecastday']['2']['day']['avgtemp_c'];
		daily_d_tomtom = date_tomtom + " - " + String(Math.round(daily_d_tomtom)+ "°");

		//GET ICON FOR DAY AFTER TOMORROW
		var daily_d_tomtom_icon = parsed_json['forecast']['forecastday']['2']['day']['condition']['icon'];

		//GET ICON FOR TODAY!
		var daily_d_today = parsed_json['forecast']['forecastday']['0']['day']['condition']['icon'];

		// set states for fields so they could be rendered later on
		this.setState({
			daily_tomorrow : daily_d_tomorrow,
			daily_tomtom: daily_d_tomtom,
			daily_tomorrow_icon : daily_d_tomorrow_icon,
			daily_tomtom_icon : daily_d_tomtom_icon,
			daily_today : daily_d_today
		});      
	}

	//PARSE THE RESULTS FOR ALERT
	parseResponse_Alert = (parsed_json) => {
		var alert_a = parsed_json['alerts']['alert'];
		
		if (alert_a.length != 0){
			alert_a = "WARNING! " + parsed_json['alerts']['alert'];
			warningcolour()
		}
		else{
			alert_a = "Emerergency Alerts : 0";
			normalwarning()
		}
		// set states for fields so they could be rendered later on
		this.setState({
			alert : alert_a
		});      
	}
}
//map with features including pins zooming and traffic info
const Map = ({ user, ...props }) => (
	<section class="Map">
		<br></br>
		<br></br>
		<h2>Route Planner</h2>
		<p><iframe src="https://embed.waze.com/iframe?zoom=12&lat=51.5241&lon=0.0404&pin=1"
   		width="350" height="500" 
    	style="border:0;" allowfullscreen="" 
    	loading="lazy"></iframe></p>
	</section>
);

//function used to hide and show api
function showapi(){
	var element = document.getElementById("opacitychange");
	element.style.opacity = "0.9";
}

function hideapi(){
	var element = document.getElementById("opacitychange");
	element.style.opacity = "0";
}

//functions used to changed colour of warning depending if theres a warning or not
function warningcolour(){
	var element = document.getElementById("red");
	element.style.color = "red";
}

function normalwarning(){
	var element = document.getElementById("red");
	element.style.color = "#4C9900";
}