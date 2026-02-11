import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Database User type (matching your Prisma schema)
interface DatabaseUser {
    id: string;
    email: string;
    name: string;
    role: string;
    permissions?: { id: string; permission: string }[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserStore {
    // Current user state
    currentUser: DatabaseUser | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;

    // Actions
    createUser: (userData: { id: string; primaryEmailAddress: { emailAddress: string }; firstName: string; lastName?: string }) => Promise<DatabaseUser | null>;
    fetchUser: (userId: string) => Promise<DatabaseUser | null>;
    setCurrentUser: (user: DatabaseUser | null) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    
    // Helper getters
    getUserRole: () => string | null;
    isAdmin: () => boolean;
    isUser: () => boolean;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            currentUser: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,

            createUser: async (userData) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await fetch('/api/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user: userData }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to create user');
                    }

                    const result = await response.json();
                    const user = result.user || result; // Handle both response formats
                    
                    set({
                        currentUser: user,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });

                    return user;
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Failed to create user";
                    set({
                        error: errorMessage,
                        isLoading: false
                    });
                    return null;
                }
            },

            fetchUser: async (userId: string) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await fetch(`/api/user/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        if (response.status === 404) {
                            throw new Error('User not found');
                        }
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to fetch user');
                    }

                    const user = await response.json();
                    
                    set({
                        currentUser: user,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });

                    return user;
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Failed to fetch user";
                    set({
                        error: errorMessage,
                        isLoading: false,
                        currentUser: null,
                        isAuthenticated: false
                    });
                    return null;
                }
            },

            setCurrentUser: (user: DatabaseUser | null) => {
                set({
                    currentUser: user,
                    isAuthenticated: !!user,
                    error: null
                });
            },
            setError: (error: string | null) => {
                set({ error });
            },

            clearError: () => {
                set({ error: null });
            },

            // Helper methods
            getUserRole: () => {
                const { currentUser } = get();
                return currentUser?.role || null;
            },

            isAdmin: () => {
                const { currentUser } = get();
                return currentUser?.role?.toLowerCase() === 'admin';
            },

            isUser: () => {
                const { currentUser } = get();
                return currentUser?.role?.toLowerCase() === 'user';
            }
        }),
        {
            name: 'user-store',
            partialize: (state) => ({
                currentUser: state.currentUser,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
)
