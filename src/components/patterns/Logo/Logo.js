import * as React from "react"
import { Link } from "gatsby"
import "./Logo.css"

const Logo = () => (
    <Link to="/" className="pl-1 pr-1 logo text-2xl font-extrabold">
        CrimsonMind.io
    </Link>
)

export default Logo;