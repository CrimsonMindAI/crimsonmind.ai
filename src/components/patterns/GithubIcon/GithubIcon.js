import React from 'react';

const GithubIcon = props => {
    const { url, text } = props;
    return (<a className="IconLink p-1" href={url} target="_blank" rel="noopener noreferrer">
        <i className="fab fa-github" style={{fontSize: '2rem'}}></i>{text ? `\u00A0${text}` : null}
    </a>)
};

export default GithubIcon;