import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <NpsWidgetComponent title="NPS" source={new DumyWidgetArraySourceInterface([1,2,3])}/>
        </div>
      </div>
    );
  }
}

export default App;


// interface WidgetInterface {
//   title: string;
//   data: any;
// }

// class NpsWidget implements WidgetInterface {
//   title: string;
//   data: number[];
//   constructor(title: string){}
  

// }

interface WidgetSourceInterface<T> {getData() : T;}

interface WidgetArraySourceInterface<T> extends WidgetSourceInterface<T[]> {}

class DumyWidgetArraySourceInterface<T> implements WidgetArraySourceInterface<T> {
  private _data: T[];
  constructor(data: T[]){
    this._data = data;
  }
  getData(){
    return this._data;
  }
}


interface WidgetProps { title: string; source: WidgetSourceInterface<any>; }

interface NpsWidgetProps extends WidgetProps {title: string; source: WidgetArraySourceInterface<number>;}


class NpsWidgetComponent extends React.Component<NpsWidgetProps, {}> {
  private _data: number[];

  constructor(props: NpsWidgetProps, context : any) {
    super(props, context);
    this.loadData = this.loadData.bind(this);
    this.refresh = this.refresh.bind(this);
    // calling here
    console.log("constructor");
  }

  public componentWillMount() {
        console.log("componentDidMount");
        this.loadData();
    }

  public loadData() : void {
    this._data = this.props.source.getData();
    console.log('loaded data %o', this._data);
  }

  public refresh(event: any) : void {
    this.loadData();
  }

  render() {
      return <div>
        <button onClick={this.refresh}>refresh</button>
        <div>{this.props.title}</div>
        <div>{this._data}</div>
      </div>;
  }
}