import './App.css'
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './component/Home'
import CourseItem from './component/CourseItem'
import NotFound from './component/NotFound'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/courses/:id" component={CourseItem} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
