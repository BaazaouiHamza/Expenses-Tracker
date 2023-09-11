import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import homeStyles from '../styles/marketing.css'
import MainHeader from "~/components/navigation/MainHeader";

export default function MarketingLayout() {
    return (
        <>
            <MainHeader />
            <Outlet />
        </>
    )

}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: homeStyles }]
}