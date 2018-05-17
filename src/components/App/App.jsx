import React from 'react'

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
    todo[key] = null

    this.setState({inputTodo: todo})
  }

  render () {
    const list = Object.keys(this.state.inputTodo).map((key) =>
      <li className="list-group-item" key={key}>
        <div className="input-group-text row">
          <div className="col-1">
          <input type="checkbox" onChange={(e) => { this.removeItem(key) }} />
          </div>
          <div className="col-11">
            <span>{this.state.inputTodo[key]}</span>
          </div>
          
        </div>
      </li>
    )

    return (
      <form ref={(input) => this.formApp = input}
        onSubmit={(e) => { this.addTodoItem(e, this.enterTodo.value) }}>
        <div className="form-group">
          <ul className="list-group">
            { list }
          </ul>
          <input type="text" ref={(input) => { this.enterTodo = input }} />
        </div>
        <button className="btn btn-primary" type="submit">Ajouter</button>
      </form>
    )
  }
}
