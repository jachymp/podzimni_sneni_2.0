import {BrowserRouter as Router, Link} from "react-router-dom";

const routes = [
    {
        path: "content-container",
        navTitle: "Domů"
    },
    {
        path: "#lineup-container",
        navTitle: "Lineup"
    }
]

export default function Navigation() {
    return (
        <Router>
            {routes.map((route, index) => (
                // <Link key={index} to={route.path}>{route.navTitle}</Link>
                <a href={route.path}>{route.navTitle}</a>
            ))}
        </Router>
    )
}






