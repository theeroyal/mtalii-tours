export const ADMIN_EMAIL = 'mtaliitoursandadventures@gmail.com';

// Default password - can be changed later
const DEFAULT_PASSWORD = 'admin123';

export const initializeAuth = () => {
  if (!localStorage.getItem('mtalii_admin_password')) {
    localStorage.setItem('mtalii_admin_password', DEFAULT_PASSWORD);
  }
  if (!localStorage.getItem('mtalii_login_attempts')) {
    localStorage.setItem('mtalii_login_attempts', '0');
  }
  if (!localStorage.getItem('mtalii_lockout_time')) {
    localStorage.setItem('mtalii_lockout_time', '0');
  }
};

export const getRemainingAttempts = () => {
  const now = Date.now();
  const lockoutTime = parseInt(localStorage.getItem('mtalii_lockout_time') || '0');
  
  if (lockoutTime > now) {
    const remaining = Math.ceil((lockoutTime - now) / 1000);
    return { remaining: 0, lockout: true, seconds: remaining };
  }
  
  const attempts = parseInt(localStorage.getItem('mtalii_login_attempts') || '0');
  return { remaining: 3 - attempts, lockout: false, seconds: 0 };
};

export const login = (email, password) => {
  initializeAuth();
  
  const now = Date.now();
  const lockoutTime = parseInt(localStorage.getItem('mtalii_lockout_time') || '0');
  
  if (lockoutTime > now) {
    return { 
      success: false, 
      error: `Too many attempts! Try again in ${Math.ceil((lockoutTime - now) / 1000)} seconds.` 
    };
  }
  
  if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    incrementAttempts();
    return { 
      success: false, 
      error: 'Invalid email or password!' 
    };
  }
  
  const storedPassword = localStorage.getItem('mtalii_admin_password');
  if (password !== storedPassword) {
    incrementAttempts();
    return { 
      success: false, 
      error: 'Invalid email or password!' 
    };
  }
  
  // Successful login - reset attempts
  localStorage.setItem('mtalii_login_attempts', '0');
  localStorage.setItem('mtalii_admin_logged_in', 'true');
  return { success: true };
};

const incrementAttempts = () => {
  const attempts = parseInt(localStorage.getItem('mtalii_login_attempts') || '0');
  const newAttempts = attempts + 1;
  localStorage.setItem('mtalii_login_attempts', newAttempts.toString());
  
  if (newAttempts >= 3) {
    const lockoutTime = Date.now() + (15 * 60 * 1000); // Lock for 15 minutes
    localStorage.setItem('mtalii_lockout_time', lockoutTime.toString());
    localStorage.setItem('mtalii_login_attempts', '0');
  }
};

export const logout = () => {
  localStorage.removeItem('mtalii_admin_logged_in');
};

export const isLoggedIn = () => {
  return localStorage.getItem('mtalii_admin_logged_in') === 'true';
};

export const changePassword = (oldPassword, newPassword) => {
  initializeAuth();
  const storedPassword = localStorage.getItem('mtalii_admin_password');
  
  if (oldPassword !== storedPassword) {
    return { 
      success: false, 
      error: 'Current password is incorrect!' 
    };
  }
  
  if (newPassword.length < 6) {
    return { 
      success: false, 
      error: 'New password must be at least 6 characters!' 
    };
  }
  
  localStorage.setItem('mtalii_admin_password', newPassword);
  return { success: true };
};
