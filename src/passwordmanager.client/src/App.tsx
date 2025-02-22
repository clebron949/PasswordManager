import NavMenu from './components/NavMenu';
import { Outlet } from 'react-router';

function App() {
    return (
        <div className="">
            <NavMenu/> 
            <div className="flex min-h-[730px]">
                <main className="w-full max-w-screen-lg mx-auto my-6 sm:my-12 overflow-auto bg-white shadow-lg sm:rounded-lg">
                    <div className="px-4 py-3 sm:p-6">
                        <Outlet />  
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;