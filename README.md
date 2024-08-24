# Event Planning Assistant

## Overview

The Event Planning Assistant is a web application designed to assist users in organizing events by providing AI-generated suggestions and answering queries related to event planning. The application uses a combination of advanced technologies and AI to offer a comprehensive event planning solution.

## Features

- **Passwordless Authentication**: Users can log in using a passcode sent to their email via Supabase.
- **AI-Powered Event Assistance**: Get venue suggestions, logistical advice, and answers to event planning queries.
- **Real-Time Chat System**: Chat with the AI assistant
- **Responsive UI**: Designed to be responsive and scalable across various devices.

## Tech Stack

- **Frontend**: Next.js (v14+), Tailwind CSS
- **Backend**: Supabase, Drizzle
- **AI**: GeminiAPI
- **Database**: Supabase
- **Authentication**: Supabase Passwordless Authentication

## Getting Started

### Prerequisites

- Node.js (v18+)
- Yarn or npm
- Supabase account
- OpenAI API Key

### Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/event-planning-assistant.git
    cd event-planning-assistant
    ```

2. **Install dependencies**

    ```bash
    yarn install
    # or
    npm install
    ```

3. **Setup environment variables**

    Create a `.env.local` file in the root directory and add the following environment variables:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
    OPENAI_API_KEY=your-openai-api-key
    ```

4. **Configure Supabase**

    Follow the Supabase documentation to set up authentication and database schemas. Create tables for storing user data and chat history.

5. **Run Prisma Migrations**

    Set up Prisma and run the migrations to configure your database schema.

    ```bash
    yarn prisma migrate dev
    # or
    npm run prisma migrate dev
    ```

6. **Run the development server**

    ```bash
    yarn dev
    # or
    npm run dev
    ```

    Open `http://localhost:3000` in your browser to view the application.

## Features Implementation

### Authentication

- Uses Supabase's passwordless authentication to allow users to sign in via email.

### AI-Powered Assistant

- Implemented using LangChain and OpenAI to provide relevant answers and suggestions based on user queries.
- Real-time chat with streaming responses for an interactive user experience.
- Chat history is saved and retrieved from Supabase.

### Visualization

- Word cloud chart generated using amCharts to visualize the most frequently used words in user prompts.

## Testing

Run the following commands to execute tests:

```bash
yarn test
# or
npm test
