import {Outlet} from 'react-router-dom';

export const Base = () => {
    return (
        <>
            <div style={{backgroundColor: 'red'}}>asdasds</div>
            <Outlet></Outlet>
        </>
    );
};
