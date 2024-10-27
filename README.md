# Next.js Auth Template

This is a template project for Next.js with authentication setup using auth.js. It includes Prisma for database management and several npm scripts for development and deployment.

## Features

- **Email Verification** powered by [resend.dev](https://resend.dev/)
- **Password Reset**
- **User Registration**
- **User Login**
- **Token Verification on Login**
- **OAuth Login with Google and GitHub**

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm
- A PostgreSQL database (or another database supported by Prisma)

### Installation

1. Clone the repository:
```sh
git clone https://github.com/NaufalXDs/Template-Nextjs-Auth.js.git
```
2. Navigate into the project directory:
```sh
cd Template-Nextjs-Auth.js
```
3. Install the dependencies:
```sh
npm install
```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```
DATABASE_URL=your_database_url
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Database Setup

1. Pull the database schema:
```sh
npm run db:pull
```
2. Push the database schema to ensure it is updated:
```sh
npm run db:push
```
3. Generate the Prisma client:
```sh
npm run dev:gen
```

### Running the Development Server

Start the development server:
```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the application for production:
```sh
npm run build
```

To start the production server:
```sh
npm run start
```

### Running Migrations

To create a new migration file and apply it to the database:
```sh
npm run db:migrate
```

### Scripts

- `dev`: Starts the development server using Turbopack.
- `dev:gen`: Generates the Prisma client.
- `db:pull`: Pulls the database schema.
- `db:push`: Pushes the current state of your Prisma schema to your database.
- `db:migrate`: Creates and applies a new migration.
- `build`: Builds the Next.js application for production.
- `start`: Starts the Next.js application in production mode.
- `lint`: Runs Next.js' linting.

### Features Overview

- **Email Verification:** Uses resend.dev for sending email verification links during the registration process.
- **Password Reset:** Allows users to reset their password if they forget it.
- **User Registration:** New users can create an account by providing necessary details.
- **User Login:** Users can log in using their registered email and password.
- **Token Verification on Login:** Verifies tokens to ensure secure authentication during login.
- **OAuth Login:** Users can log in using their Google or GitHub accounts.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [auth.js](https://authjs.dev/)
- [resend.dev](https://resend.dev/)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps)
