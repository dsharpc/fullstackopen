

const Header = ({name}) => {
    return (
      <h3>{name}</h3>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>{part.name} - {part.exercises}</p>
    )
  }
  
  const Total = ({total}) => {
    return (
      <p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>
    )
  }
  
  const Content = ({parts}) => {
    
    const total = parts.reduce((acum, currentElement) => {
      return (
        acum + currentElement.exercises
      )
    }, 0)
  
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part}></Part>)}
        <Total total={total}></Total>
      </div>
    
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}></Header>
        <Content parts={course.parts}></Content>
      </div>
    )
  }
  
export default Course  