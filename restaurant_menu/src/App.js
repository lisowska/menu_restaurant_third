import React, { Component } from 'react';
import axios from 'axios';
//import MenuList from './MenuList'
import './App.css';
import dishesList from './data.json';

class App extends Component {
constructor(props) {
    super(props);
    this.state= {
      dishesList: dishesList,
      order :{
        items:[],
        totalPrice:0
      }
    };
}
  onHandleAddToBasket = (item) => {
    console.log(item);
    var that=this.state;
     this.setState({order:{
       items:[],
       totalPrice:that.order.totalPrice + parseFloat(item.price)
     }})
console.log(that.order.totalPrice)
    //axios.post('http://localhost:3001/dishes/addItem', {data: {item:item, order:this.state.order} })
    // .then(res => this.setState({order:res}))
  }

componentDidMount() {
  axios.get('http://localhost:3001/dishes')
    .then(response => this.setState({dishesList: response.data}))
}

  render() {


    console.log(this.state.dishesList);

    const starters = dishesList.map(item => item.Starters)[0]
    const mainCourse = dishesList.map(item => item.MainCourse)[0]
    const desserts = dishesList.map(item => item.Desserts)[0]

    return (
      <div className="App">

        <ul>

          {
            starters.map(item => (
                <li>
                  {item.name} - {item.price} - {this.props.orderPrice}
                  <button onClick={() => this.onHandleAddToBasket(item)}>Add</button>
                </li>
            ))
          }
          {
            mainCourse.map(item => (
                <li>
                  {item.name} - {item.price} - {this.props.orderPrice}
                  <button onClick={() => this.onHandleAddToBasket(item)}>Add</button>
                </li>
            ))
          }
          {
            desserts.map(item => (
                <li>
                  {item.name} - {item.price} - {this.props.orderPrice}
                  <button onClick={() => this.onHandleAddToBasket(item)}>Add</button>
                </li>
            ))
          }
        </ul>
        <div className="totalPrice">
          {this.state.order.totalPrice}
        </div>
      </div>
    );
  }
}

export default App;
