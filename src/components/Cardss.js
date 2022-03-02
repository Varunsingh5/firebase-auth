import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import DatePicker from 'react-multi-date-picker';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getStatusColor } from '../utils/helper';

const Cardss = (props) => {
    const [user, loading] = useAuthState(auth);
    const [time, setTime] = useState([])
    const today = new Date();
    const [values, setValues] = useState(today)
    const [totalHours, setTotalHours] = useState(null)
    const [availableHours, setAvailableHours] = useState(null)
    const [awayHours, setAwayHours] = useState(null)
    const [busyHours, setBusyHours] = useState(null)


    function convertHMS(e) {
        var h = Math.floor(e / 3600).toString().padStart(2, '0'),
            m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(e % 60).toString().padStart(2, '0');

        return h + ':' + m + ':' + s;
    }

    const addTimes = async (timesArray) => {
        let duration = 0;
        timesArray.forEach(time => {
            duration = duration + moment(time?.endTime?.seconds * 1000).diff(moment(time?.startTime?.seconds * 1000), 'seconds')
        });
        const convertTime = convertHMS(duration)
        return convertTime;
    }
    const getDocFromFirebase = async () => {
        const docRef = doc(db, "data", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const newdata = docSnap.data();

            const filterData = newdata?.timeLogs?.filter((i, x) => moment(i?.startTime?.seconds * 1000).format('YYYY/MM/DD') == moment(values).startOf('day').format('YYYY/MM/DD'))
            const totalTime = await addTimes(filterData)

            // for available time
            const availableFilterData = filterData?.filter((i, x) => i?.status == "Available")
            const availbleTime = await addTimes(availableFilterData)

            //for busy time
            const busyFilterData = filterData?.filter((i, x) => i?.status == "Busy")
            const busyTime = await addTimes(busyFilterData)

            //for away time 
            const awayFilterData = filterData?.filter((i, x) => i?.status == "Away")
            const awayTime = await addTimes(awayFilterData)


            //state state
            setTime(filterData)
            setTotalHours(totalTime)
            setAvailableHours(availbleTime)
            setBusyHours(busyTime)
            setAwayHours(awayTime)
        }
    }
    useEffect(() => {
        if (user?.uid)
            getDocFromFirebase()
    }, [user, values])


    const onchangedate = (selectedDate) => {
        const dateFormatted = moment(selectedDate?.unix * 1000);
        setValues(new Date(dateFormatted))
    }

    const renderStatusDot = (color) => {
        return (
            <div style={{ background: color, height: "10px", width: "10px", borderRadius: "5px", marginTop: '5px' }} />
        )
    }


    return (
        <div>

            < div className="card1" >
                <Link to="/Dashboard" >
                    <button style={{
                        marginLeft: '94%', fontSize: '20px', marginTop: '5px',
                        backgroundColor: 'black', color: 'white', borderColor: "black"
                    }} > Back</button>
                </Link>
                <div className="date" style={{ paddingTop: '50px', marginLeft: "35%" }}>
                    <DatePicker
                        multiple={false}
                        value={values}
                        maxDate={new Date()}
                        onChange={onchangedate}
                    //   onChange={(e)=>console.log("nkjjhvjhc",e)}
                    />
                </div>
            </div>


            <div className='cards' style={{ marginTop: '4%', display: 'flex', marginLeft: '20%', }}>
                <Card style={{ backgroundColor: "blanchedalmond" }}>
                    <CardContent  >
                        <Typography color="textSecondary" gutterBottom style={{ padding: '20px 16px 0px 4px', color: 'black' }}>
                            Online Hours
                        </Typography>
                        <Typography color="textSecondary" gutterBottom style={{ padding: '16px 15px 0px 15px', color: 'black' }}>
                            {totalHours}
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ marginLeft: '5%', backgroundColor: 'blanchedalmond' }}  >
                    <CardContent  >

                        <Typography color="textSecondary" gutterBottom style={{ padding: '24px 18px 12px 11px', display: "flex", color: 'black' }}>
                            {renderStatusDot("green")} <span style={{ marginLeft: "4px" }}> Available </span>
                        </Typography>

                        <Typography color="textSecondary" gutterBottom style={{ padding: '1px 13px 10px 18px', color: 'black' }}>
                            {availableHours}
                        </Typography>

                    </CardContent>
                </Card>
                <Card style={{ marginLeft: '5%', backgroundColor: 'blanchedalmond' }}  >
                    <CardContent   >
                        <Typography color="textSecondary" gutterBottom style={{ padding: '24px 35px 12px 28px', display: "flex", color: 'black' }}>
                            {renderStatusDot("pink")}  <span style={{ marginLeft: "4px" }}> Busy </span>
                        </Typography>
                        <Typography color="textSecondary" gutterBottom style={{ padding: '0px 30px 15px 28px', color: 'black' }}>
                            {busyHours}
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ marginLeft: '5%', backgroundColor: 'blanchedalmond' }}  >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom style={{ padding: '24px 35px 12px 28px', color: 'black', display: "flex" }}>
                            {renderStatusDot("Yellow")}   <span style={{ marginLeft: "4px" }}> Away </span>
                        </Typography>
                        <Typography color="textSecondary" gutterBottom style={{ padding: '0px 0px 0px 30px', color: 'black' }}>
                            {awayHours}
                        </Typography>
                    </CardContent>
                </Card>
            </div>



            <div className='cardss' style={{ width: '70%', marginTop: '30px', marginLeft: '12%' }}>
                <Card >
                    <CardContent style={{ display: 'flex', backgroundColor: "darkkhaki" }}>
                        <Typography color="textSecondary" gutterBottom style={{ marginLeft: '10%', color: 'black' }}>
                            Time
                        </Typography>
                        <Typography color="textSecondary" gutterBottom style={{ marginLeft: '58%', color: 'black' }}>
                            Status
                        </Typography>
                        <Typography color="textSecondary" gutterBottom style={{ marginLeft: '10%', color: 'black' }}>
                            Duration
                        </Typography>
                    </CardContent>
                    {time?.length > 0 &&
                        time?.map((i, x) => {
                            return (
                                <CardContent style={{ display: 'flex', backgroundColor: "beige" }}>
                                    <Typography color="textSecondary" gutterBottom style={{ marginLeft: '5%', color: 'black', }}>
                                        {moment(i?.startTime?.seconds * 1000).local().format("hh:mm A") + " - " + moment(i?.endTime?.seconds * 1000).format("hh:mm A")}
                                        {/* {new Date(i?.startTime?.seconds * 1000).toLocaleString()}-{new Date(i?.endTime?.seconds * 1000).toUTCString()} */}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom style={{ marginLeft: '50%', display: "flex", color: 'black' }}>
                                        {renderStatusDot(getStatusColor(i?.status))}  &nbsp; {i?.status}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom style={{ marginLeft: '10%', color: 'black' }}>
                                        {convertHMS(moment(i?.endTime?.seconds * 1000).diff(moment(i?.startTime?.seconds * 1000), 'seconds'))}
                                    </Typography>
                                </CardContent>
                            )
                        })
                    }
                    <CardContent style={{ backgroundColor: "beige", display: "flex" }}>
                        <Typography color="textSecondary" gutterBottom style={{ marginLeft: '70%', color: "black" }}>
                            Total Hours:

                            <span style={{ marginLeft: "92px" }}>  {totalHours} </span>

                        </Typography>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
export default Cardss;