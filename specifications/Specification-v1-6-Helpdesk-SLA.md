# Specification v1.6: Helpdesk & SLA

This document provides the specifications for the integrated Helpdesk and Service Level Agreement (SLA) module in the MagnetarAion system.

## 1. User Types

The Helpdesk module will distinguish between different types of users:
- **Reporters:** External users who can submit tickets. There is no cost associated with reporter accounts, and their number is unlimited.
- **Agents:** Licensed users who are responsible for responding to and resolving tickets. A limited number of agent licenses may be included in the base product.
- **Standard Users:** Internal users who are not agents but may have access to the Helpdesk system.

## 2. Helpdesk Features

- **Bidirectional Email:** The system will support bidirectional email communication, allowing tickets to be created and updated via email.
- **Response Templates:** Pre-defined response templates and macros will be available to agents to ensure consistent and efficient communication.

## 3. Service Level Agreements (SLA)

- **SLA Policies:** The system will allow for the configuration of SLA policies, defining targets for:
  - Time to first response.
  - Time to resolution.
- **SLA Pauses:** SLAs can be paused under certain conditions (e.g., waiting for a customer response).
- **Automatic Escalations:** The system will support automatic escalations when an SLA is breached.

## 4. Key Performance Indicators (KPIs) and Reporting

- **KPI Tracking:** The Helpdesk module will track key performance indicators, including:
  - Number of tickets by priority.
  - Number of reopened tickets.
  - Average time to first response.
  - Average time to resolution.
- **Dashboards:** Dedicated dashboards will be available to visualize support-related KPIs.

## 5. Example SLA Requirements

- **SLA-1:** Time to first response is less than 1 hour for "Critical" priority tickets and less than 4 hours for "High" priority tickets during business hours.
- **SLA-2:** Reopening a ticket restarts the time-to-resolution SLA. The SLA clock is paused when waiting for a response from the customer.
- **SLA-3:** A ticket is automatically escalated to Level 2 support if it has not been updated in 8 hours. A notification is sent to a designated Slack channel.
