import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName?: string, username?: string) => {
    try {
      console.log('Starting signup process...', { email, firstName });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: firstName,
            last_name: lastName || '',
            username: username || '',
            full_name: lastName ? `${firstName} ${lastName}` : firstName,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error);
        if (error.message.includes('over_email_send_rate_limit')) {
          throw new Error('Too many signup attempts. Please wait a minute before trying again.');
        }
        throw error;
      }
      console.log('Signup successful:', data);
      
      // Show success message about email confirmation
      if (data.user && !data.session) {
        throw new Error('Account created successfully! Please check your email and click the confirmation link to complete your registration.');
      }
      
      return data;
    } catch (error: any) {
      console.error('Signup catch block:', error);
      if (error.message.includes('over_email_send_rate_limit')) {
        throw new Error('Too many signup attempts. Please wait a minute before trying again.');
      }
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Starting signin process...', { email });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        if (error.message.includes('over_email_send_rate_limit')) {
          throw new Error('Too many login attempts. Please wait a minute before trying again.');
        }
        throw error;
      }
      console.log('Signin successful:', data);
      return data;
    } catch (error: any) {
      console.error('Signin catch block:', error);
      if (error.message.includes('over_email_send_rate_limit')) {
        throw new Error('Too many login attempts. Please wait a minute before trying again.');
      }
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    console.log('Starting Google OAuth...');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Google OAuth error:', error);
      throw error;
    }
    console.log('Google OAuth initiated:', data);
    return data;
  };

  const signInWithFacebook = async () => {
    console.log('Starting Facebook OAuth...');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Facebook OAuth error:', error);
      throw error;
    }
    console.log('Facebook OAuth initiated:', data);
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const uploadProfileImage = async (file: File) => {
    if (!user) throw new Error('User must be authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/profile.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        upsert: true,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    // Update user metadata
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl }
    });

    if (updateError) throw updateError;

    return publicUrl;
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    uploadProfileImage,
  };
};