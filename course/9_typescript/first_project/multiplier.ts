// interface type allows returning pair of numbers from parseArguments
interface MultiplyValues {
    value1: number;
    value2: number;
}

// ensures parameters are of the right type
const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    // command-line arguments start from argv[2]
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};

const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText, a * b);
};


try {
    // parse command-line arguments and deconstruct them into pair of numbers
    const { value1, value2 } = parseArguments(process.argv);
    // run multiplicator on the parsed command-line arguments
    multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
}
catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
