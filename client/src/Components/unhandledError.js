import { Link } from 'react-router-dom';

export default function Forbidden() {
    return (
        <main>
            <div className="wrap">
                <h2>Error</h2>
                <p>Sorry! We just encountered an unexpected error.</p>
                <Link className="button button-secondary" to="/">See all courses</Link>
            </div>
        </main>
    )
}

