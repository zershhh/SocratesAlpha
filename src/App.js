import React, { Component } from 'react';
import './App.css';
import { Button, Card, Col, Icon, Layout, message, Rate, Row, Select, Input } from 'antd';
import "antd/dist/antd.css";
import "./index.css";
//import update from 'react-addons-update'; // ES6

const Option = Select.Option;
const Search = Input.Search;
const success = () => {
  message.success('Successfully Submitted');
};

class App extends Component {
  constructor(props) {
    super(props); 
    
    this.state = {

      students: [
        {name: "Bishka", count: 0, record: [], note: []},
        {name: "Brett", count: 0, record: [], note: []},
        {name: "Cecilia", count: 0, record: [], note: []},
        {name: "Daniel", count: 0, record: [], note: []},
        {name: "Ellen", count: 0, record: [], note: []},
        {name: "Findlay", count: 0, record: [], note: []},
        {name: "Kristine", count: 0, record: [], note: []},
        {name: "Louis", count: 0, record: [], note: []},
        {name: "Richard", count: 0, record: [], note: []},
        {name: "Robert", count: 0, record: [], note: []},
        {name: "Shirley", count: 0, record: [], note: []},
        {name: "Tiger", count: 0, record: [], note: []},
        {name: "Vera", count: 0, record: [], note: []},
        {name: "Vincent", count: 0, record: [], note: []},
        {name: "Zersh", count: 0, record: [], note: []}
      ],

      aStudentIsPicked: false,
      currentGrade: null,
      currentNote: "",
      displayedIndex: null,
      emptyInputBox: true,
      gradeChosen: false,
      pickedIndex: null,
      pickedName: null,
      pickedGrade: null
    }
  }

  handleChange = (value) => {
    this.setState(() => ({
      currentGrade: value,
      gradeChosen: true
    }))
  };

  handleChange2 = (value) => {
    this.setState(() => ({
      displayedIndex: value
    }))
  };

  handleChange3 = (value) => {
    this.setState(() => ({
      currentNote: value,
      emptyInputBox: false
    }))
   // console.log(typeof(JSON.stringify(this.state.currentNote)))
  };

 
  pickRandomStudent = () => {
    const students = this.state.students;
    const Seq = [Math.floor(Math.random() * this.state.students.length)];


    this.setState(() => ({
      aStudentIsPicked: true,
      pickedStudent: this.state.students[Seq],
      pickedIndex: Seq,
      students,
      
    }))
  }

  pickLeastPickedStudent = () => {
    let students = this.state.students;
    let lowest = students[0].count;
    let lowestStudent = 0;
    for (let i = 0; i < students.length; i ++) {
      if (lowest > students[i].count) {
        
        lowest = students[i].count;
        lowestStudent = i;
      }
    }

    this.setState(() => ({
      aStudentIsPicked: true,
      pickedStudent: this.state.students[lowestStudent],
      pickedIndex: lowestStudent,
      students,
    }))
  }

  submitGrade = () => {
    success()
    const students = this.state.students;
    students[this.state.pickedIndex].record.push(parseFloat(this.state.currentGrade));
    students[this.state.pickedIndex].count ++;
    
    this.setState(() => ({
      students,
    }))
  }

  submitNote = () => {
    success()
    const students = this.state.students;
    students[this.state.displayedIndex].note.push(this.state.currentNote);
    
    this.setState(() => ({
      students,
    }))
  }
  
  render() {
    return (
      
      <div className="App">
      
        <div id="background">
        <Row gutter={50}>
          <Col span={16}>
          <Card style={{ width: 300 }}>

            <Button onClick={this.pickRandomStudent} ghost type="primary">
              Pick a Student
            </Button>
            
            <br/>
            <br/>

            <Button onClick={this.pickLeastPickedStudent} ghost type="primary">
              Pick a Least Picked Student
            </Button>
          </Card>
          <br/>              
          <Card id="cards" title="Picked Student" bordered={true} style={{ width: 300 }}>
            Name: {this.state.pickedStudent && this.state.pickedStudent.name} <br/>
            Times Previously Called: {this.state.pickedStudent && this.state.pickedStudent.count}
            <br/>
            <br/>

            <Select defaultValue="Rating" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="4">A</Option>
              <Option value="3.7">A-</Option>
              <Option value="3.3">B+</Option>
              <Option value="3">B</Option>
              <Option value="2.7">B-</Option>
              <Option value="2.3">C+</Option>
              <Option value="2">C</Option>
              <Option value="1.7">C-</Option>
              <Option value="1">D</Option>
              <Option value="0">F</Option>
            </Select>

            <Button onClick={this.submitGrade} ghost type="primary" disabled={!(this.state.aStudentIsPicked && this.state.gradeChosen)}>
              Submit Rating
            </Button>
          </Card>

        </Col>
        <Col span={8}>
          <Card id="cards" title="Student Record" bordered={true} style={{ width: 300 }}>
            
            <Select defaultValue="Display Student Record" style={{ width: 250 }} onChange={this.handleChange2}>
              <Option value="0">Bishka</Option>
              <Option value="1">Brett</Option>
              <Option value="2">Cecilia</Option>
              <Option value="3">Daniel</Option>
              <Option value="4">Ellen</Option>
              <Option value="5">Findlay</Option>
              <Option value="6">Kristine</Option>
              <Option value="7">Louis</Option>
              <Option value="8">Richard</Option>
              <Option value="9">Robert</Option>
              <Option value="10">Shirley</Option>
              <Option value="11">Tiger</Option>
              <Option value="12">Vera</Option>
              <Option value="13">Vincent</Option>
              <Option value="14">Zersh</Option>
            </Select>
            <br/>
            <br/>
            Name: {this.state.students[this.state.displayedIndex] && this.state.students[this.state.displayedIndex].name} <br/>
            Times Called: {this.state.students[this.state.displayedIndex] && this.state.students[this.state.displayedIndex].count} <br/>
            History: {this.state.students[this.state.displayedIndex] && this.state.students[this.state.displayedIndex].record.toString()} <br/>
            Average: {this.state.students[this.state.displayedIndex] && Math.floor(this.state.students[this.state.displayedIndex].record.reduce((a, b) => a + b, 0) / this.state.students[this.state.displayedIndex].record.length * 100) / 100}/4 <br/>
            
            Note: {this.state.students[this.state.displayedIndex] && this.state.students[this.state.displayedIndex].note.toString()}
            <br/>
            <Input placeholder="Enter your note here" onChange={this.handleChange3} />
            <br/>
            <br/>
            <Button onClick={this.submitNote} ghost type="primary" disabled={this.state.emptyInputBox}>Submit</Button>
          </Card>
          </Col>
        </Row>

        </div>
      </div>
    ); 
  }
}

export default App;