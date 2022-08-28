import { Outlet } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import RequireAuth from '../../routes/RequireAuth'

import Modal from './Modal/Modal'
import Navbar from './Navbar/Navbar'

import styles from './MainLayout.module.css'

function MainLayout() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.wrapper}>
                <RequireAuth>
                    <Navbar />
                    <div className={styles.outlet}>
                        <Outlet />
                    </div>
                    <Modal />
                </RequireAuth>
            </div>
        </DndProvider>
    )
}

export default MainLayout