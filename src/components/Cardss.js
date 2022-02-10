import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { logout } from "./firebase";

const Cardss = () => {
    return (
        <div>
            <button className="dashboard__btn" onClick={logout} style={{ marginLeft: '92%' }}>
                Logout
            </button>
            <div className='cards' style={{ marginTop: '40px', display: 'flex', marginLeft: '50px' }}>
                <Card >
                    <CardContent >
                        <Typography color="textSecondary" gutterBottom style={{ padding: '20px 0px 0px 0px' }}>
                            Online Hours
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ marginLeft: '5%' }}  >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom style={{ padding: '24px 18px 12px 11px' }}>
                            Available
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ marginLeft: '5%' }}  >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom style={{ padding: '24px 35px 12px 28px' }}>
                            Busy
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ marginLeft: '5%' }}  >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom style={{ padding: '24px 18px 12px 11px' }}>
                            Away
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            <div className='cardss' style={{ width: '65%', marginTop: '30px', marginLeft: '3%' }}>
                <Card  >
                    <CardContent style={{ display: 'flex' }}>
                        <Typography color="textSecondary" gutterBottom style={{ marginLeft: '5%' }}>
                            Time
                        </Typography>
                        <Typography color="textSecondary" gutterBottom style={{ marginLeft: '55%' }}>
                            Status
                        </Typography>
                        <Typography color="textSecondary" gutterBottom style={{ marginLeft: '10%' }}>
                            Duration
                        </Typography>
                    </CardContent>
                </Card>
                {/* <div className='val' style={{marginTop:'20px', marginLeft:'10%'}}>
                {onlinevalue}
                </div> */}
            </div>
        </div>
    )
}
export default Cardss;