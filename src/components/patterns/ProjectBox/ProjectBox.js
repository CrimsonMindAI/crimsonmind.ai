import * as React from "react"
import { Link } from "gatsby"
import "./ProjectBox.css"

const ProjectBox = ({ link, title, description }) => (
    <Link to={link} className="ProjectBox col-span-1 bg-gray-800 p-4 w-full transition duration-300 ease-in-out">
        <h4 className="text-3xl mb-6">{title}</h4>
        <p className="text-xl">
            {description}
        </p>
    </Link>
)

export default ProjectBox;