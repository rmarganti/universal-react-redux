import { getEntity, getEntitiesMeta } from 'giadc-redux-json-api';

/**
 * Authentication
 */
export const getAuthExpiresAt = state => state.auth.expiresAt;
export const getAuthIsExpired = state => (new Date().getTime() > new Date(state.auth.expiresAt).getTime());
export const getCurrentUserIsAuthenticated = state => state.auth.loggedIn;

/**
 * UI
 */
export const getLoadingStatus = state => state.ui.loading > 0;
export const getNotificationState = state => state.ui.notification;

/**
 * Users
 */
export const getCurrentUserId = state => getEntitiesMeta(state.entities, 'users', 'currentUser');
export const getCurrentUser = state => getEntity(state.entities, 'user', getCurrentUserId(state));
