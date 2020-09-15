import Link from 'next/link';

const PageNotFound = () => {
    return (
        <div>
            PageNotFound
            <br/>
            <Link href='/'>
                <a>Home</a>
            </Link>
        </div>
    );
};

export default PageNotFound;