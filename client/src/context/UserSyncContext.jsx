/**
 * UserSync Context - Automatically syncs Clerk users to MongoDB
 * Wrap your app with this provider to ensure users appear in admin portal
 */

import React, { createContext, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const UserSyncContext = createContext(null);

export const UserSyncProvider = ({ children }) => {
    const { isSignedIn, user, isLoaded } = useUser();
    const hasSynced = useRef(false);
    const lastSyncedId = useRef(null);

    useEffect(() => {
        // Only sync when user is loaded, signed in, and hasn't been synced yet
        if (!isLoaded || !isSignedIn || !user) {
            hasSynced.current = false;
            lastSyncedId.current = null;
            return;
        }

        // Avoid duplicate syncs for the same user
        if (lastSyncedId.current === user.id) return;

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
                            email_addresses: user.emailAddresses?.map(e => ({
                                email_address: e.emailAddress
                            })),
                            first_name: user.firstName,
                            last_name: user.lastName,
                            image_url: user.imageUrl,
                            phone_numbers: user.phoneNumbers?.map(p => ({
                                phone_number: p.phoneNumber
                            }))
                        }
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ User synced to database:', data.data?.email);
                    hasSynced.current = true;
                    lastSyncedId.current = user.id;
                }
            } catch (error) {
                console.error('Failed to sync user to database:', error);
            }
        };

        syncUserToDatabase();
    }, [isSignedIn, user, isLoaded]);

    return (
        <UserSyncContext.Provider value={{ isSignedIn, user, isLoaded }}>
            {children}
        </UserSyncContext.Provider>
    );
};

export default UserSyncProvider;
