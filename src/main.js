import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Header from 'components/Header'

class App extends Component {

    constructor (props){
        super(props)

        this.state = {
            msg : 'Hello'    
        }
    }

    handleClickDiv = () => {
        console.log(this.state.msg)
    }
    
    render (){
        return (
            <div onClick={this.handleClickDiv}>
                <Header />
                Hello, Webpack2
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
