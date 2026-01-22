/**
 * SSO Callback - Handles OAuth redirects from Clerk (Google, etc.)
 */

import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';

const SSOCallback = () => {
    return <AuthenticateWithRedirectCallback />;
};

export default SSOCallback;
