import { hot } from 'react-hot-loader/root'
import * as React from 'react'


class Counter extends React.Component<{}, { count: number }> {
    interval: number

    constructor(props: any) {
        super(props)
        this.state = { count: 0 }
    }

    componentDidMount() {
        this.interval = window.setInterval(
            () => this.setState(prevState => ({ count: prevState.count - 1 })),
            200,
        )
    }

    generateString1() {
        return "3"
    }

    generateString2 = () => {
        return "5"
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return <span>

            HELLO WORLD test 1233<br />

        d{this.state.count} - {this.generateString1()} - {this.generateString2()}

        </span>
    }
}

const App = () => (
    <div>
        <h1>Hello, world.</ h1>
        <Counter />
    </div>
)

export default hot(App)
