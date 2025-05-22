const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => (
    <div>
        {parts.map(part =>
            <Part key={part.id} part={part}></Part>
        )}
    </div>
)

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Total = ({ parts }) => (
    <strong>Total of {parts.reduce(((total, part) => total + part.exercises), 0)} exercises</strong>
)

const Course = ({ course }) => (
    <>
        <Header name={course.name}></Header>
        <Content parts={course.parts}> </Content>
        <Total parts={course.parts}> </Total>
    </>
)

export default Course
