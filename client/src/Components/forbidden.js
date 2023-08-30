import { Link } from 'react-router-dom';

export default function Forbidden() {
    return (
        <main>
            <div className="wrap">
                <h2>Forbidden</h2>
                <p>Oh oh! You can't access this page.</p>
                <Link className="button button-secondary" to="/">See all courses</Link>
            </div>
        </main>
    )
}

