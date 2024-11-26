import * as React from "react"
import { Link } from "gatsby"
import "./NavigationLink.css";

const NavigationLink = ({ to, text }) => (
    <Link
        to={to}
        className="NavigationLink text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
        {text}
    </Link>
)

export default NavigationLink;