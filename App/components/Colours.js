export default {
  primary: "purple",
  secondary: "grey",
  text: "black",
};

/*
//Origional
render() {
  return(
    <div>
      <button onClick={this.props.data}>Click me</button><span>{this.state.counter2}</span>
    </div>
  );
}
}

  update(){
    this.setState({
      counter: this.props.state.counter2
    });
  }

  render(){
    return(
      <div>
        <span>{this.state.counter}</span>
        <Child data={this.update.bind(this)}/>
      </div>
    );
  }
}

//fixed
render() {
  return(
    <div>
      <button onClick={this.props.data(this.state.counter2)}>Click me</button><span>{this.state.counter2}</span>
    </div>
  );
}
}

  update(value){
    return () => {
       this.setState({
         counter: value
       });
    }
  }

  render(){
    return(
      <div>
        <span>{this.state.counter}</span>
        <Child data={this.update.bind(this)}/>
      </div>
    );
  }
}
*/