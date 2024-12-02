import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const token = localStorage.getItem('token'); // Check for the token
        if (!token) {
            router.push('/login'); // Redirect if the token is missing
        }
    }, [router]);

    if (!isClient) {
        return null; // Prevent rendering on the server side
    }

    const token = localStorage.getItem('token');
    if (!token) {
        return null; // Prevent rendering if the token is missing
    }

    return <>{children}</>; // Render the protected content if the token exists
}