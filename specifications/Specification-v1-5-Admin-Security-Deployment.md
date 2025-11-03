# Specification v1.5: Administration, Security, and Deployment

This document details the specifications for administration, security, and deployment of the MagnetarAion system.

## 1. Access and Permissions

### 1.1. Permission Model
- **Role-Based Access Control (RBAC):** The system will use a an RBAC model where roles are collections of permissions.
- **Assignment:** Roles can be assigned to users or groups at both a global and a per-project level.
- **Inherent Permissions:** Certain permissions will be inherent, such as an issue creator having read access to the issue they created.

### 1.2. Base Roles
- The system will include a set of predefined base roles:
  - `System Admin`
  - `Project Admin`
  - `Contributor`
  - `Issue Creator`
  - `Observer`
- The system will also support the creation of custom roles.

### 1.3. Simplified Permission Matrix
| Role | Create/Edit Issues | Configure Project | View KB | Edit KB | Administer Users |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **System Admin** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Project Admin**| ✓ | ✓ (scoped) | ✓ | ✓ | — |
| **Contributor** | ✓ | — | ✓ (if granted)| — | — |
| **Issue Creator**| Create + comment own | — | ✓ (if granted)| — | — |
| **Observer** | View | — | View | — | — |

## 2. Authentication and Security

### 2.1. Authentication Mechanisms
- **Single Sign-On (SSO):** The system will support SSO via SAML 2.0 and OIDC.
- **OAuth 2.0:** Users will be able to authenticate using OAuth 2.0 with providers like Google, GitHub, and Azure AD.
- **Two-Factor Authentication (2FA):** 2FA can be made mandatory for specific user groups.

### 2.2. Security Measures
- **Cloud:**
  - Encryption at rest (e.g., using AWS KMS).
  - Managed HTTPS.
- **Server:**
  - The customer will be responsible for implementing security measures such as TLS, disk encryption, and firewalls.

## 3. Notifications

### 3.1. Notification Channels
- **Email:** Email notifications will be sent using customizable Freemarker templates.
- **In-App:** An in-app notification center will be available.
- **Chat:** Notifications can be sent to Slack and Telegram.

### 3.2. Subscriptions
- Users can subscribe to notifications for saved searches, tags, or specific events.
- Workflows can be used to send custom notifications.

## 4. Deployment Models (Cloud vs. Server)

### 4.1. Cloud (SaaS)
- A managed SaaS offering with automatic updates, backups, and scaling.
- May have limitations for integrating with closed on-premise services.

### 4.2. Server (Self-Hosted)
- Provides total control over data and allows for integration within a local area network (LAN).
- The customer is responsible for all operational aspects, including updates, backups, and maintenance.

### 4.3. Migration
- The system will provide tools for migrating between the Cloud and Server versions, as well as from third-party systems.

## 5. Operations (Server)

### 5.1. System Requirements
- Hardware and software requirements will be clearly documented.

### 5.2. Installation and Configuration
- The system will be distributed as a JAR, ZIP, or Docker image.
- Configuration of HTTPS, SMTP, and attachment storage will be required.

### 5.3. Environment Management
- Best practices for managing DEV, UAT, and PROD environments, including configuration promotion and maintenance windows, will be recommended.
