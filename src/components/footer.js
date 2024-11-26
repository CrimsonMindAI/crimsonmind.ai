import * as React from "react";
import { Link } from "gatsby"

const Footer = () => (
    <footer
        style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
        }}
    >
        © {new Date().getFullYear()} &middot;
        {` `}
        <Link to={"/"}>CrimsonMind.io</Link>
    </footer>
)

export default Footer