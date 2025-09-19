# AI-Notes

A simple AI-powered note-taking application that lets you ask questions about your notes and get intelligent answers based only on the content you've written.

## Features

- 📝 **Create & Edit Notes** - Write and manage your personal notes
- 🤖 **AI Q&A** - Ask questions about your notes and get answers based solely on your content
- 🔐 **Authentication** - Secure user authentication with Supabase Auth
- 💾 **Cloud Storage** - Your notes are safely stored in Supabase
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Authentication:** Supabase Auth
- **AI:** [Your AI service here]

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- [AI service] API key

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
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Database
   DATABASE_URL=your_supabase_database_url

   # AI Service
   OPENAI_API_KEY=your_ai_api_key

   # Next.js
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up Supabase**
   
   - Create a new project in [Supabase](https://supabase.com)
   - Enable Authentication in your Supabase project
   - Set up Row Level Security (RLS) policies for your tables

5. **Set up Prisma**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema to Supabase
   npx prisma db push
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Sign Up/Login** - Create an account or log in with your credentials
2. **Create Notes** - Start writing your notes on any topic
3. **Ask Questions** - Use the AI feature to ask questions about your notes
4. **Get Answers** - Receive intelligent responses based only on your written content

## Project Structure

```
ainotes/
├── app/                    # Next.js 13+ app directory
├── components/             # Reusable React components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions and configurations
├── prisma/                # Prisma schema and migrations
├── public/                # Static assets
└── styles/                # Global styles
```

## Contributing

This is an open-source project designed to help beginners learn full-stack development. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Learning Resources

This project demonstrates:
- Next.js 13+ App Router
- Supabase integration (Database + Auth)
- Prisma ORM usage
- AI API integration
- Modern React patterns
- TypeScript best practices
- Tailwind CSS + shadcn/ui

Perfect for developers learning modern full-stack development!

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

---

Built with ❤️ for the developer community
