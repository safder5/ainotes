# AI-Notes

A simple AI-powered note-taking application that lets you ask questions about your notes and get intelligent answers based only on the content you've written.

## Features

- 📝 **Create & Edit Notes** - Write and manage your personal notes
- 🤖 **AI Q&A** - Ask questions about your notes and get answers based solely on your content
- 🔐 **Authentication** - Secure user authentication with Supabase Auth
- 💾 **Cloud Storage** - Your notes are safely stored in Supabase PostgreSQL
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS v4 and Radix UI components
- 🔍 **Search** - Find notes quickly with Fuse.js search functionality
- 🌙 **Dark Mode** - Toggle between light and dark themes

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI primitives
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Authentication:** Supabase Auth
- **AI:** OpenAI API
- **Search:** Fuse.js
- **Notifications:** Sonner

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Supabase account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/safder5/ainotes.git
   cd ainotes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=postgresql://your_supabase_database_url
   SUPABASE_URL=https://your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Set up Supabase**
   
   - Create a new project in [Supabase](https://supabase.com)
   - Go to Settings > API to get your URL and anon key
   - Go to Settings > Database to get your connection string
   - Enable Row Level Security (RLS) for your tables

5. **Set up the database**
   ```bash
   # Generate Prisma client and run migrations
   npm run migrate
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses a simple two-table schema:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  notes     Note[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt @default(now())
}

model Note {
  id        String   @id @default(uuid())
  text      String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt @default(now())
}
```

## Usage

1. **Sign Up/Login** - Create an account or log in using Supabase Auth
2. **Create Notes** - Click "New Note" to start writing
3. **Edit Notes** - Click on any existing note to edit it
4. **Ask AI Questions** - Use the AI chat feature to ask questions about your notes
5. **Search** - Use the search functionality to find specific notes quickly

## Project Structure

```
ainotes/
├── app/                    # Next.js 15 app directory
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # Main app pages
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── ui/               # UI components (Radix UI)
│   └── ...
├── src/
│   └── db/
│       └── schema.prisma  # Prisma database schema
├── lib/                   # Utility functions
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run migrate` - Generate Prisma client and run database migrations
- `npm run lint` - Run ESLint

## Key Dependencies

- **UI & Styling:** Tailwind CSS v4, Radix UI components
- **Database:** Prisma, Supabase
- **AI:** OpenAI API
- **Search:** Fuse.js for fuzzy search
- **Notifications:** Sonner for toast notifications
- **Theming:** next-themes for dark/light mode

## Contributing

This is an open-source project designed to help beginners learn modern full-stack development. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Learning Resources

This project demonstrates:
- Next.js 15 App Router with Turbopack
- Supabase integration (Database + Authentication)
- Prisma ORM with PostgreSQL
- OpenAI API integration
- Modern React patterns with TypeScript
- Tailwind CSS v4
- Radix UI component usage
- Search implementation with Fuse.js

Perfect for developers learning modern full-stack development with the latest technologies!

## Deployment

The app can be easily deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

Make sure to update `NEXT_PUBLIC_BASE_URL` to your production URL.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you found this project helpful for learning, please consider giving it a ⭐ on GitHub!

---

Built with ❤️ to help developers learn modern full-stack development
