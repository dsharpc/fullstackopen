const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}


const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="John" age={23}/>
      <Hello name="George"/>
      <Hello name="Ringo"/>
    </div>
    )
    
}


export default App;
