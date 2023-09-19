import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import sharedStyles from './styles/shared.css'
import ErrorComponent from './components/util/Error'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: sharedStyles }]
};

const Document = ({ title, children }) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}


export default function App() {
  return (
    <Document title=''>
      <Outlet />
    </Document>
  );
}

export const ErrorBoundary = () => {
  const caughtResponse = useRouteError()
  if (isRouteErrorResponse(caughtResponse)) {
    return <Document title={caughtResponse.statusText}>
      <main>
        <ErrorComponent title={caughtResponse.statusText}>
          <p>{caughtResponse.data?.message || 'Something went wrong. Please try again later.'}</p>
          <p>Back to <Link to='/'>safety</Link></p>
        </ErrorComponent>
      </main>
    </Document>
  }
  else if (caughtResponse instanceof Error) {
    return (
      <Document title={"An error occured"}>
        <main>
          <ErrorComponent title={"An error occured"}>
            <p>{caughtResponse.message || 'Something went wrong. Please try again later.'}</p>
            <p>Back to <Link to='/'>safety</Link></p>
          </ErrorComponent>
        </main>
      </Document>
    )
  }

}
