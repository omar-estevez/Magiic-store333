import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/layout/Sidebar/Sidebar"
import style from './DashboardLayout.module.css'
import { DashNavbar } from "../components/layout/DashNavbar/DashNavbar"

export const DashboardLayout = () => {
    return (
        <div className={style.dashboard__layout}>
            <Sidebar />
            <div className={style.dashboard__content}>
                <DashNavbar />
                <main className={style.dashboard__main}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
