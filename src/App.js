import './App.css';
import {Component} from "react";
import axios from "axios";
import {FiDollarSign} from "react-icons/fi"
import {FaBitcoin,FaReact,FaGithub} from "react-icons/fa"
import TextField from '@material-ui/core/TextField';
import 'react-day-picker/lib/style.css';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import moment from "moment";

const API_URL = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=1&toTs=";
const API_CURR_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";


const inprops = {
  size:15
}
var today = ""
export default class App extends Component {
  
  state = {
    today:0,
    date: moment(new Date(),"yyyy-MM-DD"),
    indate:0,
    amount:0,
    isCalculated:false,
  }

  onChangeDate = async (newdate) => {
    await this.setState({
      date : moment(newdate).format("yyyy-MM-DD")
    })
    this.calculate();
  }

  onChangeAmount = (event) => {
    this.setState({
      amount:event.target.value
    })
  }

  calculate = () => {
    axios.get(API_URL+moment(this.state.date).unix())
    .then(
      res => {
        this.setState({
          indate: res.data.Data.Data[1].close,
          isCalculated:true
        });
        console.log(res.data);
      }
    )
    .catch(
      err => {
        console.log(err)
      }
    )
  }

  componentDidMount() {
    today = this.state.date
    axios.get(API_CURR_URL)
    .then(
      res => {
        this.setState({
          today : res.data.bpi.USD.rate_float,
        })
      }
    )
    .catch(
      err => {
        console.log(err)
      }
    )
  }

  render() {
  return (
    <div className="App">
      <div class="box">
         <span style={{fontWeight:"900"}}>What if you have bought Bitcoin in?</span>
         <span style={{fontSize:"20px"}}>Are you ready to face your biggest regret?</span>
         <br/>
         <div>Currently 1 <FaBitcoin color="yellow" style={{marginBottom:"5px"}} size="27px"/> is {this.state.today.toFixed(2)}<FiDollarSign class="dollar" style={{marginBottom:"7px"}}/></div>
        <br/>
        Choose a day and an amount
        <br/>
        <br/>
        <div style={{marginTop:"10px"}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center"  spacing={2}> 
        <Grid item>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          format="yyyy-MM-dd"
          label = "Date"
          margin="normal"
          minDate="2010-07-18"
          maxDate={today}
          inputProps = {inprops}
          value = {this.state.date}
          onChange = {this.onChangeDate}
          id="date-picker-inline"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{fontColor:"black"}}
        />
        </Grid>
        <Grid item>
        <TextField
          id="standard-adornment-amount"
          label="Amount"
          margin="normal"
          variant="outlined"
          value= {this.state.amount}
          onChange = {this.onChangeAmount}
          InputProps={{startAdornment:(<InputAdornment position="start"><FiDollarSign/></InputAdornment>)}}
        />
        </Grid>
        </Grid>
         </MuiPickersUtilsProvider>
         </div>
         <br/>
         <br/>
         {
           this.state.isCalculated==true && this.state.amount!=0 ? (
             <div class="maintext" style={{fontSize:"25px"}}>In {moment(this.state.date).format("Do MMMM YYYY")}, 1<FaBitcoin color="yellow" style={{marginBottom:"4px"}} size="25px"/> was {this.state.indate}<FiDollarSign class="dollar" style={{marginBottom:"5px"}}/>
             <br/>
             <br/>
             With {this.state.amount}<FiDollarSign class="dollar" style={{marginBottom:"5px"}}/>, you could buy {(this.state.amount/this.state.indate).toFixed(6)}<FaBitcoin color="yellow" style={{marginBottom:"4px"}} size="25px"/> in that date
             <br/>
             <br/>
             And that would worth {(this.state.amount/this.state.indate*this.state.today).toFixed(2)}<FiDollarSign class="dollar" style={{marginBottom:"5px"}}/> today
             <br/>
             </div>
           ) : (<div>Please select a date and an amount</div>)
         }
      <br/>
      </div>
      <div class="footer" style={{color:"white"}}>
        <div class="footertext" style={{textAlign:"initial",justifyContent:"space-between",display:"flex"}} ><a href="https://github.com/ozanarmagan" class="bottom" style={{textDecoration:"none",color:"white",paddingLeft:"10px"}}><FaGithub size="25px" style={{marginBottom:"10px"}}/><span class="footertext" style={{fontSize:"24px"}}> OzanArmagan</span></a> <a href="#" class="footertext" style={{textDecoration:"none",color:"white",paddingRight:"10px"}}><span class="footertext" style={{fontSize:"22px"}}><span style={{marginBottom:"10px"}}>Created with</span> <span style={{color:"#4dd2d6"}}><FaReact class="footertext" size="25px" style={{marginBottom:"10px"}}/><span class="footertext" style={{fontSize:"22px"}}>React</span></span></span></a></div>
      </div>
    </div>
  );
}


}

