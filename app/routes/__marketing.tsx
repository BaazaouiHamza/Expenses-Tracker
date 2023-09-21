import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import homeStyles from '../styles/marketing.css'
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";

export default function MarketingLayout() {
    return (
        <>
            <MainHeader />
            <Outlet />
        </>
    )

}

export const loader: LoaderFunction = ({ request }) => {
    return getUserFromSession(request)
}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: homeStyles }]
}