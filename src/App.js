import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';

const customers = [
  {
  'id' : 1,
  'image' : 'https://placehold.co/200x200',
  'name' : '동빈나',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '대학생'
},
{
  'id' : 2,
  'image' : 'https://placehold.co/200x200',
  'name' : '이순신',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '디자이너'
},
{
  'id' : 3,
  'image' : 'https://placehold.co/200x200',
  'name' : '홍길동',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '대학생'
}

]

class App extends Component{
  render(){
    return (
      <div>
        {
          customers.map( c => {
            return(
              <Customer
                key= {c.id}
                id = {c.id}
                image={c.image}
                name={c.name}
                birthday={c.name}
                gender={c.gender}
                job={c.job}
              />
            )

          })
        }

      </div>
   )
  }
}

export default App;
