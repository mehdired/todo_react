import React from 'react'

import css from './app.scss'

export default class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      inputTodo: {}
    }

    this.addTodoItem = this.addTodoItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  addTodoItem (event, item) {
    event.preventDefault()

    if (item) {
      const todo = this.state.inputTodo
      const timestamp = Date.now()

      todo[`todo-${timestamp}`] = item
      this.setState({inputTodo: todo})
      this.formApp.reset()
    }
  }

  removeItem (key) {
    const todo = this.state.inputTodo
    delete todo[key]

    this.setState({inputTodo: todo})
  }

  render () {
    const list = Object.keys(this.state.inputTodo).map((key) =>
      <li key={key}>
        <span>{this.state.inputTodo[key]}</span>
        <input type="checkbox" onChange={(e) => { this.removeItem(key) }} />
      </li>
    )

    return (
      <form ref={(input) => this.formApp = input}
        onSubmit={(e) => { this.addTodoItem(e, this.enterTodo.value) }}>
        <ul>
          { list }
        </ul>
        <input type="text" ref={(input) => { this.enterTodo = input }} />
        <button type="submit">Ajouter</button>
      </form>
    )
  }
}
