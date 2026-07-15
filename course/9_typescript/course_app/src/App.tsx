interface HeaderProps {
    name: string;
}

const Header = ({ name }: HeaderProps) => {
    return (
        <h1>{name}</h1>
    )
}


interface TotalProps {
    numExercises: number;
}

const Total = ({ numExercises }: TotalProps) => {
    return (
        <p>Number of exercises {numExercises}</p>
    )
}


interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartDesc extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartDesc {
    kind: "basic"
}

interface CoursePartBackground extends CoursePartDesc {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial extends CoursePartDesc {
    requirements: string[];
    kind: "special"
}



type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface PartProps {
    part: CoursePart;
}

interface ContentProps {
    parts: CoursePart[];
}


const Content = ({ parts }: ContentProps) => (
    <>
        {parts.map((part, index) =>
            <Part key={index} part={part}></Part>
        )}
    </>
)


const Part = ({ part }: PartProps) => {
    switch (part.kind) {
        case "basic":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br />
                    <i>{part.description}</i>
                </p >
            );
        case "group":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br />
                    project exercises {part.groupProjectCount}
                </p>
            );
        case "background":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br />
                    <i>{part.description}</i><br />
                    submit to: {part.backgroundMaterial}
                </p>
            );
        case "special":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br />
                    <i>{part.description}</i><br />
                    required skills: {part.requirements.join(", ")}
                </p>
            );
        default:
            return assertNever(part);
    }
}


/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};


const App = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part",
            kind: "basic"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: "group"
        },
        {
            name: "Basics of type Narrowing",
            exerciseCount: 7,
            description: "How to go from unknown to string",
            kind: "basic"
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
            kind: "background"
        },
        {
            name: "TypeScript in frontend",
            exerciseCount: 10,
            description: "a hard part",
            kind: "basic",
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            kind: "special"
        }
    ];

    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);


    return (
        <div>
            <Header name={courseName}></Header>
            <Content parts={courseParts}></Content>
            <Total numExercises={totalExercises}></Total>
        </div>
    );
};

export default App;
