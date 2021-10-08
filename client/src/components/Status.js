import React from 'react'

const Status = (props) => {
    console.log(props);
    if (props.status === "failed") {
        return (
            <div className="status">
                <h1>Payment failed</h1>
                <section><a href="/cart">Try again</a></section>
            </div>
        )
    } else if (props.status === "success") {
        return (
            <div className="status">
                <h1>Payment success</h1>
                <section><a href="/">Explore more</a></section>
            </div>
        )
    }
}

export default Status
