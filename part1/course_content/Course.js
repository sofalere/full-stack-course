const Course = ({course}) => {
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
};

const Header = ({name}) => {
  return <h1>{name}</h1>
};


const Content = ({parts}) => {
  const count = parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return (
    <div>
      {parts.map((part, ind) => <Part key={ind} part={part}/>)}
      <p>total of {count} exercises</p>
    </div>
  )
};

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
};


export default Course;