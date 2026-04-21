import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, UserProfile } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      resolveUser(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      resolveUser(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const resolveUser = async (session: Session | null) => {
    if (session?.user) {
      setUser(session.user);
      // Fetch profile
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (!error && data) {
          setProfile(data as UserProfile);
        } else {
          // Fallback or demo state if profile not found/supabase not setup
          console.error("Profile fetch error:", error?.message);
          setProfile({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.email!.split('@')[0],
            role: 'admin', // Defaulting for simple unconfigured setup
            created_at: new Date().toISOString()
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    } else {
      setUser(null);
      setProfile(null);
    }
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
