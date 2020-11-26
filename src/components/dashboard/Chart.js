import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
// import Title from './Title';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    title:{
        flexGrow:1,
        marginLeft: "auto",
        marginRight: "auto",
        color: theme.palette.secondary.main,
    },
  }));

// Generate Data
function createData(months, points) {
    return { months, points };
}



const Chart = () => {
    const classes = useStyles()
    const theme = useTheme();

    const data = [
        createData('10', "jan"),
        createData('20', "feb"),
        createData('23', "mar"),
        createData('41', "apr"),
        createData('30', "may"),
        createData('35', "jun"),
        createData('42', "jul"),
        createData('10', "aug"),
        createData('30', "sep"),
        createData('45', "oct"),
        createData('46', "nov"),
        createData('0', "dec"),
    ];

    return (
        <React.Fragment>
            <Typography
            style={{ fontFamily: 'Arizonia, cursive', "fontWeight": 600, marginRight: "1%" }}
            className={classes.title} 
            variant="h3"
            display="inline"
            >
                Progress
            </Typography>
            <ResponsiveContainer>
                <LineChart
                data={data}
                margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                }}
                >
                    <XAxis dataKey="points" stroke={theme.palette.secondary.main} />
                    <YAxis stroke={theme.palette.secondary.main}>
                        <Label
                        angle={270}
                        position="left"
                        style={{ textAnchor: 'middle', fill: theme.palette.primary.main }}
                        >
                            points
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="months" stroke={theme.palette.secondary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

export default Chart



