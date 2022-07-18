import {Route, Routes} from 'react-router-dom';
import {Form} from './components/Form';
import {Base} from './pages/Base';
import {Base2} from './pages/Base2';
import {Sample} from './pages/Sample';

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Base></Base>}>
                <Route index element={<Sample></Sample>}></Route>
                <Route path="create" element={<Form></Form>}></Route>
                <Route path="base2" element={<Base2></Base2>}></Route>
            </Route>
        </Routes>
    );
};

export default App;
