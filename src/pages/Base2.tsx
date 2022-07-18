import {useEffect, useState} from 'react';
import {Test} from '../interfaces/Test.interface';
import {
    createOneTestRestHandler,
    findAllTestsHandler,
    updateOneTestByIdRestHandler,
} from '../services/webApis/restHandlers/test.restHandler';

export const Base2 = () => {
    const [inp, setInp] = useState('');
    const [tests, setTests] = useState<Test[]>([]);
    const [selectedTest, setSelectedTest] = useState<Test>();

    useEffect(() => {
        handleFindAllTests();
    }, []);

    const handleFindAllTests = () => {
        findAllTestsHandler()('/tests').then((tests2) => {
            setTests(tests2);
        });
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInp(e.target.value);
    };

    async function handleOnSubmit() {
        const test = await createOneTestRestHandler({name: inp})('/tests');
        setTests((state) => [test, ...state]);
    }

    return (
        <>
            <h1>CRUD</h1>
            <h2>CREATE</h2>
            <input onChange={handleOnChange}></input>
            <h3>{inp.toString()}</h3>
            <button onClick={handleOnSubmit}>Enviar</button>
            <h2>READ</h2>
            <ul>
                {tests.map((test, index) => {
                    return (
                        <>
                            <li key={index}>{test.name}</li>
                            <button
                                onClick={() => {
                                    setSelectedTest(test);
                                }}
                            >
                                Seleccionar
                            </button>
                        </>
                    );
                })}
            </ul>
            <h2>UPDATE</h2>
            {selectedTest === undefined ? (
                <h3>Seleccione un test para actualizar</h3>
            ) : (
                <>
                    <input
                        onChange={(e) => {
                            setSelectedTest((state) => {
                                return {
                                    id: state?.id ?? 0,
                                    name: e.target.value,
                                };
                            });
                        }}
                        value={selectedTest.name}
                    ></input>
                    <button
                        onClick={async () => {
                            const test = await updateOneTestByIdRestHandler({
                                testId: selectedTest.id,
                                name: selectedTest.name,
                            })('/tests');
                            setTests((state) =>
                                state.map((item) =>
                                    item.id === test.id ? test : item
                                )
                            );
                        }}
                    >
                        Actualizar
                    </button>
                </>
            )}
        </>
    );
};
