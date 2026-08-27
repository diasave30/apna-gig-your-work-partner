# Apna Gig: Your Work Partner

Master Prompt — Apna Gig Worker App (W01–W15)

Role and Objective

Act as a senior mobile product designer, UI/UX designer, and frontend application developer. Design and build the first complete module of a modern mobile application called Apna Gig.

Apna Gig is a worker and cooperative service platform that helps workers register, verify their identity and skills, join cooperatives, manage their work profile, and prepare to receive service jobs.

Create a professional, modern, trustworthy, mobile-first application UI. This must be designed as one connected application, not as 15 separate or disconnected screens.

🚨 MOST IMPORTANT REQUIREMENT — COMPLETE SCREEN REDIRECTION

All 15 screens must be connected with logical navigation.

Every important:

Button

Card

Continue action

Back button

Edit option

Navigation option

must redirect to the correct next screen.

Do not leave dead buttons or disconnected screens.

The user should be able to start from the Splash Screen and complete the entire worker onboarding and profile setup journey.

APP NAME

Apna Gig

Use the Apna Gig name consistently throughout the application.

Create a simple, professional logo treatment using a visual identity that represents:

Work opportunities

Trust

Workers and community

Growth

Digital services

The branding should feel modern, approachable and trustworthy.

1. DESIGN SYSTEM AND VISUAL STYLE

Create a consistent design system before designing the screens.

Overall Design Direction

The UI should be:

Mobile-first

Clean and modern

Professional

Friendly and approachable

Easy to understand for workers with different levels of digital literacy

Trustworthy and secure

Accessible

Not overly complex

Recommended Visual Style

Use:

Professional primary color such as deep blue, teal or blue-green

Clean white/light neutral backgrounds

Dark charcoal text

Green for verified/success states

Orange/amber for pending states

Red only for errors or important warnings

Consistent rounded corners

Subtle shadows and borders

Clear status badges

Large, easy-to-tap buttons

Avoid:

Excessive gradients

Neon/glowing effects

Too many colors

Overcrowded screens

Unnecessary animations

Inconsistent card styles

Typography

Use a clean, readable modern font.

Maintain a clear hierarchy:

Large screen headings

Medium section headings

Readable body text

Clear labels and helper text

2. GLOBAL NAVIGATION REQUIREMENTS

During the onboarding and registration flow, use:

Back button

Step/progress indicator

Save and Continue button

The worker setup flow should clearly show progress.

Example:

Step 1 of 7 → Step 2 of 7 → Step 3 of 7

After the worker completes the profile and verification process, redirect to the Home Dashboard.

3. COMPLETE SCREEN FLOW

The main onboarding journey should follow this logical flow:

New Worker Journey

W01 Splash Screen
↓
W02 Onboarding
↓
W03 Mobile Login / Registration
↓
W05 OTP Verification
↓
W06 Worker Profile Setup
↓
W04 Aadhaar Verification
↓
W07 KYC / Document Centre
↓
W08 Skill Selection
↓
W09 Skill Verification
↓
W10 Cooperative Selection / Membership
↓
W11 Virtual Worker ID Card
↓
W12 Worker QR Verification
↓
W13 Home Dashboard

From Home Dashboard, the user can access:

W14 Availability Calendar

and

W15 Service Area

For an existing verified user:

W01 → W03 → W05 → W13

Create this logical navigation structure in the application.

4. REQUIRED SCREENS

W01 — SPLASH SCREEN

Create a professional splash screen for Apna Gig.

Include:

Apna Gig logo

App name

Short tagline such as “Work. Grow. Together.”

Loading indicator

App version at the bottom

Navigation

After loading:

Splash Screen → Onboarding

W02 — ONBOARDING

Create a multi-slide onboarding experience.

Slide 1 — Work Opportunities

Explain how Apna Gig helps workers discover work opportunities and grow professionally.

Slide 2 — Earnings

Explain transparent earnings, regular work opportunities and cooperative support.

Slide 3 — Safety & Trust

Explain worker safety, verified jobs and support.

Slide 4 — Benefits & Growth

Explain training, skill development and worker benefits.

Each slide should include:

Simple professional illustration or visual

Strong heading

Short description

Progress dots

Skip button

Next button

The final slide should include:

Get Started

Navigation

Skip → W03 Mobile Login / Registration

Next → Next onboarding slide

Get Started → W03 Mobile Login / Registration

W03 — MOBILE LOGIN / REGISTRATION

Create a simple authentication screen.

Include:

Apna Gig logo/name

Welcome heading

Country code

Mobile number input

Continue button

Terms and privacy consent text

Do not create unnecessary password fields.

Use OTP-based authentication.

Navigation

Continue with valid mobile number:

W03 → W05 OTP Verification

Existing verified users should be redirected to:

W13 Home Dashboard

New users continue through the registration flow.

W05 — OTP VERIFICATION

Create a secure and simple OTP verification screen.

Include:

Mobile number display

Option to edit mobile number

OTP input boxes

Countdown timer

Resend OTP button

Verify button

Include states for:

OTP loading

OTP verified successfully

Invalid OTP

Expired OTP

Navigation

Successful verification for a new user:

W05 → W06 Worker Profile Setup

Existing user:

W05 → W13 Home Dashboard

W06 — WORKER PROFILE SETUP

Create a structured worker profile setup screen.

Include:

Profile photo upload

Full name

Address

Preferred language

Work experience

Use:

Progress indicator

Save and Continue button

Back button

Navigation

Continue:

W06 → W04 Aadhaar Verification

W04 — AADHAAR VERIFICATION

Create a privacy-first identity verification screen.

The design should communicate trust and security.

Include:

Explanation of why identity verification is needed

User consent

Clear privacy information

Verification action

Verification status

Important:

Do not display or design unnecessary storage of sensitive Aadhaar information.

Use wording indicating that verification happens through an authorised mechanism and only required verification status should be retained.

Navigation

Verification successful:

W04 → W07 KYC / Document Centre

W07 — KYC / DOCUMENT CENTRE

Create a document management and verification screen.

Include document cards for:

Identity verification

Address verification

Work/skill certificates

Additional required documents

Each document should display a status:

Verified

Pending

Upload Required

Rejected

Allow users to:

Upload document

Replace document

View document status

Navigation

Continue after required documents:

W07 → W08 Skill Selection

Documents can later be accessed again from the worker profile/dashboard.

W08 — SKILL SELECTION

Create a searchable and easy-to-use skill selection screen.

Allow workers to select:

Service categories

Multiple skills

Skill levels

Example categories can include:

Cleaning

Plumbing

Electrical work

Appliance repair

Home services

Delivery

Other local services

Use:

Search bar

Skill category cards

Selected skill chips

Skill level selector

Navigation

Continue:

W08 → W09 Skill Verification

W09 — SKILL VERIFICATION

Create a skill verification screen.

For each selected skill, allow:

Certificate upload

Assessment information

Verification request

Show statuses:

Not Submitted

Pending

Verified

Requires Additional Information

Use a progress indicator.

Navigation

Continue:

W09 → W10 Cooperative Selection / Membership

W10 — COOPERATIVE SELECTION / MEMBERSHIP

Create a cooperative selection screen where workers can:

Browse approved cooperatives

View cooperative information

View location/service area

View membership status

Request to join or accept assignment

Use professional cooperative cards.

Each card should contain:

Cooperative name

Short description

Location

Membership status

Join/Select button

Navigation

After joining/selecting a cooperative:

W10 → W11 Virtual Worker ID Card

W11 — VIRTUAL WORKER ID CARD

Design a professional digital worker identity card.

Include:

Worker photo

Worker full name

Unique Worker ID

Cooperative name

Verification status

QR code

Make the ID card look secure and professional.

Add:

View/Show QR button

Download/Save option for future implementation

Navigation

Show/Verify QR:

W11 → W12 Worker QR Verification

Continue:

W11 → W13 Home Dashboard

W12 — WORKER QR VERIFICATION

Create a QR verification screen.

Allow users to:

Display their QR code

Scan a QR code for verification

View verification result

Include clear states:

Ready to scan

Scanning

Verified

Invalid/Unverified

Navigation

Back:

W12 → W11 Virtual Worker ID Card

Verified/Continue:

W12 → W13 Home Dashboard

W13 — HOME DASHBOARD

Create the main Apna Gig Worker Dashboard.

This should be visually clean and easy to understand.

Display:

Top Section

Greeting with worker name

Profile photo/avatar

Notification icon

Verification badge/status

Main Dashboard Cards

Today's Jobs

Today's Earnings

Availability Status

Worker Utilisation

Worker Rating

Important Alerts

Use summary cards with clear hierarchy.

Include a prominent Quick Actions section.

Quick actions:

Update Availability

Manage Service Area

View Worker ID

View Documents

Navigation

Availability card / Update Availability:

W13 → W14 Availability Calendar

Service Area:

W13 → W15 Service Area

Worker ID:

W13 → W11 Virtual Worker ID Card

Documents:

W13 → W07 KYC / Document Centre

Profile area should allow access to future Profile screens.

W14 — AVAILABILITY CALENDAR

Create an intuitive worker availability management screen.

Include:

Calendar

Working days

Available time slots

Unavailable dates

Leave/unavailability periods

Allow users to:

Select working days

Add time slots

Mark dates unavailable

Save availability

Use clear status indicators.

Navigation

Save:

W14 → W13 Home Dashboard

Back:

W14 → W13 Home Dashboard

W15 — SERVICE AREA

Create a service location and coverage management screen.

Include:

Preferred service locations

Service radius selector

Location cards

Add/remove service area

Map/location selection area

Allow users to manage where they want to receive job opportunities.

Navigation

Save:

W15 → W13 Home Dashboard

Back:

W15 → W13 Home Dashboard

5. NAVIGATION RULES

Ensure every important interactive element works.

Required Navigation

W01 → W02
W02 → W03
W03 → W05
W05 → W06
W06 → W04
W04 → W07
W07 → W08
W08 → W09
W09 → W10
W10 → W11
W11 → W12
W12 → W13

From Dashboard:

W13 → W14
W14 → W13

W13 → W15
W15 → W13

Also allow logical back navigation throughout the onboarding process.

6. PROTOTYPE DATA

Use realistic demo data for the UI.

Use:

Indian names

Indian cities and locations

Indian mobile number format

INR currency formatting (₹)

Realistic service skills and worker information

Do not overload the interface with unrealistic fake data.

Design all data-driven cards so real backend/API data can easily replace demo data later.

7. COMPONENT REUSABILITY

Create reusable components for:

Buttons

Input fields

OTP fields

Progress indicators

Status badges

Verification cards

Document cards

Skill cards

Cooperative cards

Dashboard cards

Calendar elements

Location cards

Maintain consistent components across all 15 screens.

8. FINAL DESIGN REQUIREMENTS

The final application must feel like a real mobile application, not a collection of website pages.

Prioritize:

Mobile screen proportions

Easy navigation

Clear visual hierarchy

Large touch targets

Accessibility

Simple worker-friendly language

Trust and safety

Privacy-focused identity verification

Consistent branding

Create loading, empty, success and error states where relevant.

Do not leave buttons without interactions.

FINAL INSTRUCTION

Build Apna Gig as one connected, professional mobile application containing all 15 screens.

Start from the Splash Screen and allow the user to move through the complete journey:

Splash → Onboarding → Login → OTP → Profile Setup → Identity Verification → KYC → Skills → Skill Verification → Cooperative Membership → Worker ID → QR Verification → Home Dashboard → Availability → Service Area.

All screens must use a single consistent design system and must be logically connected through working navigation.

The final result should look like a production-quality worker mobile application prototype ready for future integration with a Flutter frontend and real backend APIs.
the above images is the reference for creating all the screens like that in same colour theme and all it should be look proffesional  and the logo for the app is 
build the ui for app screen

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1d95ef46-94b8-4e4f-8907-a5d55da98020).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
