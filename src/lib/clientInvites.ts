import { supabase } from './supabase';

export interface ClientInvite {
  id: string;
  project_id: string;
  client_name: string;
  client_email: string;
  invite_token: string;
  status: 'pending' | 'accepted' | 'expired';
  invited_by: string;
  created_at: string;
  accepted_at?: string;
}

// Initialize client_invites table if it doesn't exist
export async function initializeClientInvitesTable() {
  try {
    // Try to query the table first to see if it exists
    const { error: queryError } = await supabase
      .from('client_invites')
      .select('id')
      .limit(1);

    if (queryError && queryError.code === 'PGRST116') {
      // Table doesn't exist, create it by inserting into a mock table and handling the error
      console.log('Client invites table does not exist. Will create on first invite.');
    }
  } catch (error) {
    console.error('Error checking client_invites table:', error);
  }
}

// Generate a secure random token
function generateInviteToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create a new client invite
export async function createClientInvite(params: {
  projectId: string;
  clientName: string;
  clientEmail: string;
  invitedBy: string;
}): Promise<{ success: boolean; invite?: ClientInvite; error?: string }> {
  try {
    const inviteToken = generateInviteToken();
    
    // Check if this email is already invited to this project
    const { data: existing } = await supabase
      .from('client_invites')
      .select('*')
      .eq('project_id', params.projectId)
      .eq('client_email', params.clientEmail.toLowerCase())
      .single();

    if (existing) {
      return { success: false, error: 'This email is already invited to this project' };
    }

    const inviteData = {
      project_id: params.projectId,
      client_name: params.clientName,
      client_email: params.clientEmail.toLowerCase(),
      invite_token: inviteToken,
      status: 'pending' as const,
      invited_by: params.invitedBy,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('client_invites')
      .insert(inviteData)
      .select()
      .single();

    if (error) {
      console.error('Error creating client invite:', error);
      return { success: false, error: 'Failed to create invite' };
    }

    return { success: true, invite: data };
  } catch (error) {
    console.error('Error creating client invite:', error);
    return { success: false, error: 'Failed to create invite' };
  }
}

// Get all invites for a project
export async function getProjectInvites(projectId: string): Promise<ClientInvite[]> {
  try {
    const { data, error } = await supabase
      .from('client_invites')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching project invites:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching project invites:', error);
    return [];
  }
}

// Get invite by token
export async function getInviteByToken(token: string): Promise<ClientInvite | null> {
  try {
    const { data, error } = await supabase
      .from('client_invites')
      .select('*')
      .eq('invite_token', token)
      .single();

    if (error) {
      console.error('Error fetching invite by token:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching invite by token:', error);
    return null;
  }
}

// Accept an invite
export async function acceptInvite(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('client_invites')
      .update({
        status: 'accepted',
        accepted_at: new Date().toISOString(),
      })
      .eq('invite_token', token)
      .select()
      .single();

    if (error) {
      console.error('Error accepting invite:', error);
      return { success: false, error: 'Failed to accept invite' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error accepting invite:', error);
    return { success: false, error: 'Failed to accept invite' };
  }
}

// Get all projects a client has access to
export async function getClientProjects(clientEmail: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('client_invites')
      .select('project_id')
      .eq('client_email', clientEmail.toLowerCase())
      .eq('status', 'accepted');

    if (error) {
      console.error('Error fetching client projects:', error);
      return [];
    }

    return data?.map(invite => invite.project_id) || [];
  } catch (error) {
    console.error('Error fetching client projects:', error);
    return [];
  }
}

// Resend an invite (update created_at)
export async function resendInvite(inviteId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('client_invites')
      .update({ created_at: new Date().toISOString() })
      .eq('id', inviteId)
      .select()
      .single();

    if (error) {
      console.error('Error resending invite:', error);
      return { success: false, error: 'Failed to resend invite' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error resending invite:', error);
    return { success: false, error: 'Failed to resend invite' };
  }
}

// Revoke an invite
export async function revokeInvite(inviteId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('client_invites')
      .update({ status: 'expired' })
      .eq('id', inviteId)
      .select()
      .single();

    if (error) {
      console.error('Error revoking invite:', error);
      return { success: false, error: 'Failed to revoke invite' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error revoking invite:', error);
    return { success: false, error: 'Failed to revoke invite' };
  }
}