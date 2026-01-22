/**
 * useUserSync Hook - Syncs Clerk users to MongoDB
 * Ensures users appear in admin portal when they log in
 */

import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useUserSync = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const hasSynced = useRef(false);

    useEffect(() => {
        // Only sync once per session when user is loaded and signed in
        if (!isLoaded || !isSignedIn || !user || hasSynced.current) return;

        const syncUserToDatabase = async () => {
            try {
                const response = await fetch(`${API_URL}/users/sync`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: {
                            id: user.id,
                            email_addresses: user.emailAddresses?.map(e => ({ email_address: e.emailAddress })),
                            first_name: user.firstName,
                            last_name: user.lastName,
                            image_url: user.imageUrl,
                            phone_numbers: user.phoneNumbers?.map(p => ({ phone_number: p.phoneNumber }))
                        }
                    })
                });

                if (response.ok) {
                    console.log('User synced to database');
                    hasSynced.current = true;
                }
            } catch (error) {
                console.error('Failed to sync user:', error);
            }
        };

        syncUserToDatabase();
    }, [isSignedIn, user, isLoaded]);

    return { isSignedIn, user, isLoaded };
};

export default useUserSync;
