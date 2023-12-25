import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date ,source} = this.props;
        return (
    
            <div className='my-3'>
                <div className="card" key={newsUrl}>
                    <img src={imageUrl ? imageUrl : "https://images.moneycontrol.com/static-mcnews/2023/09/financial_services2-770x433.jpg"} className="card-img-top" alt="..." />

                    <div className="card-body">
                        <h5 className="card-title">{title}...<span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left :'85%',zIndex: '1' }}><small>{source}</small></span></h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>

        )
    }
}
