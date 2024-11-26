import React from "react";
import { Link } from "gatsby";
import "./Breadcrumb.css";

const Breadcrumb = ({ crumbs }) => {
    return (
        <div className="mb-4">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {crumbs.map((crumb, index) => (
                        <li key={index} className="breadcrumb-item">
                            {crumb.path ? (
                                <Link to={crumb.path}>{crumb.label}</Link>
                            ) : (
                                <span>{crumb.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;