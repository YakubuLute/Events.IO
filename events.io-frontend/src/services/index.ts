

// Shared Services
import FileUploadService from './shared/file-upload';
import OrganizationService from './shared/organization-service';

import OptionsService from './shared/shared.service';
import NotificationService from './shared/shared.service';



// Shared Service
export const sharedService = new OptionsService();
export const optionsService = new OptionsService();
export const organizationService = new OrganizationService();
export const notificationService = new NotificationService();
export const fileUploadService = new FileUploadService();
