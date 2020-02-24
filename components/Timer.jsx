import React from 'react';

class Timer extends React.Component {
    state = {
        hours: 0,
        minutes: 0,
        seconds: 0,
    }
    static getDerivedStateFromProps(props,state) {
        let currentTime = new Date();
        if (props.endTime.getSeconds()=== 0) {
            if(props.endTime.getMinutes()=== 0) {
                return {
                    hours: props.endTime.getHours()-currentTime.getHours()-1,
                    minutes: 59 - props.endTime.getMinutes()-currentTime.getMinutes(),
                    seconds: 59 -props.endTime.getSeconds()-currentTime.getSeconds()
                }
            } else {
                return {
                    hours: props.endTime.getHours()-currentTime.getHours()-1,
                    minutes: Math.abs(59 -props.endTime.getMinutes()-currentTime.getMinutes()),
                    seconds: 59 - props.endTime.getSeconds()-currentTime.getSeconds()
                }
            }
        }
    }
    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { hours ,minutes, seconds } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    if(hours === 0) {
                        clearInterval(this.myInterval);
                    }
                    else {
                        this.setState(({hours})=>({
                            hours: hours-1,
                            minutes: 59,
                            seconds: 59
                        }))
                    }
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const {hours,minutes,seconds} = this.state;
        if (hours === 0 && minutes === 0 && seconds === 0) {
            return <p>Time is up!!!</p>
        } else {
            return <p>
                {hours}:
                {minutes<10?`0${minutes}`:minutes}:
                {seconds<10?`0${seconds}`:seconds}
            </p>
        }
    }
}

export default Timer;