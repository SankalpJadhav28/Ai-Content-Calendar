# 🤖 AI Content Calendar

> 🚧 **Project Status: In Active Development**

An AI-powered content planning workspace designed to help creators, freelancers, and businesses generate content ideas, write platform-specific content, organize their work, and plan their publishing calendar from one place.

🌐 **Live Demo:** https://ai-content-calendar-seven.vercel.app/

> **Note:** This project is actively being developed. Some features may still be incomplete, under refinement, or change as development continues.

---

## 📌 About the Project

Creating content consistently involves much more than simply coming up with ideas.

Creators often have to:

- Find fresh content ideas
- Write hooks, captions, and scripts
- Adapt content for different platforms
- Keep track of unfinished ideas
- Organize saved content
- Plan when and where to publish

**AI Content Calendar** brings these workflows together into one AI-assisted application.

Instead of switching between separate tools for brainstorming, writing, saving ideas, and planning content, the goal is to create a single workspace that supports the content creation process from idea to publishing plan.

The application currently focuses on content for platforms such as:

- Instagram
- YouTube
- LinkedIn

AI-generated output can be adapted based on the selected platform and content requirements.

---

## ✨ Features

### 💡 AI Content Idea Generator

Generate content ideas based on a topic and target platform.

The AI helps transform broad topics into usable content concepts and hooks, reducing the time spent brainstorming from scratch.

---

### ✍️ AI Script & Content Writer

Turn ideas into more complete pieces of content using AI.

The application can assist with generating:

- Social media content
- Video scripts
- Hooks
- Captions
- Platform-specific content

The goal is to help move quickly from an initial idea to usable content.

---

### 📅 Content Calendar

Plan and organize upcoming content through a visual calendar interface.

The calendar helps users keep track of planned content and maintain a more structured publishing workflow.

---

### 🔖 Saved Content

Save generated ideas and content for later use.

This allows users to build a reusable content library rather than losing useful generations after each AI interaction.

---

### 📊 Dashboard

A central dashboard provides an overview of the user's content planning workspace and quick access to the main areas of the application.

---

### 👤 Multi-User Authentication

Authentication and user accounts are integrated using **Supabase**.

The application is designed as a multi-user system where users can maintain their own account and associated application data.

---

### 🌐 Landing Page

A dedicated public landing page introduces the product, explains its purpose, and provides an entry point into the application.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** | Full-stack React framework |
| **TypeScript** | Type-safe application development |
| **Tailwind CSS** | Responsive UI styling |
| **Supabase** | Database, authentication, and user data |
| **Groq API** | LLM-powered content ideas, captions, and script generation |
| **Vercel** | Deployment and hosting |
| **Git & GitHub** | Version control and source management |

---

## 🧠 AI Integration

The application integrates the **Groq API** to power its AI-assisted content generation features.

At a high level, the current workflow follows:

```text
User Input
     ↓
Topic + Platform + Content Requirements
     ↓
Application AI Layer
     ↓
Groq API / LLM
     ↓
Generated Ideas / Scripts / Content
     ↓
Save & Organize
     ↓
Content Calendar
```

The current AI functionality focuses primarily on generation.

A long-term goal is to evolve this into a more context-aware content assistant capable of understanding user preferences, existing content, and planning context.

---

## 🗂️ Application Structure

The application is organized around the main stages of a creator's content workflow.

```text
AI Content Calendar
│
├── Landing Page
│
├── Authentication
│   ├── Sign Up
│   └── Login
│
├── Dashboard
│
├── AI Idea Generator
│
├── Script / Content Writer
│
├── Saved Content
│
└── Content Calendar
```

This structure is designed around a simple workflow:

```text
Generate → Write → Save → Organize → Plan
```

---

## 🔐 Authentication & User Data

The application uses **Supabase** for authentication and backend data management.

The multi-user architecture is designed so individual users can maintain their own:

- Account
- Generated content
- Saved ideas
- Scripts and written content
- Calendar-related data

This moves the project beyond a static AI demo toward a complete user-based application.

---

## 🚧 Development Status

AI Content Calendar is currently **under active development**.

The application already has its core structure and several major features implemented, while other areas continue to be developed, tested, and improved.

### Current Progress

- [x] Core application UI
- [x] Application navigation
- [x] Dashboard
- [x] AI content generation
- [x] Script / content writer
- [x] Content calendar interface
- [x] Saved content section
- [x] Supabase integration
- [x] User authentication
- [x] Multi-user authentication setup
- [x] Landing page
- [x] Groq AI integration
- [x] Vercel deployment
- [ ] Further AI workflow improvements
- [ ] UI/UX refinement
- [ ] Additional testing and edge-case handling
- [ ] Performance improvements
- [ ] Advanced personalization and AI context

> Features marked as implemented may still receive improvements as development continues.

---

## 🗺️ Future Roadmap

The long-term goal is to evolve AI Content Calendar beyond basic prompt-to-response AI generation.

### 🧠 Persistent AI Context & Memory

Allow the AI assistant to better understand recurring user preferences such as:

- Creator niche
- Preferred tone
- Target audience
- Preferred platforms
- Content style
- Previous content preferences

Instead of requiring users to repeatedly provide the same context, future versions could use stored preferences and relevant history to produce more personalized results.

> This feature is planned and is not yet fully implemented.

---

### 🤖 Smarter AI Workflows

Explore more advanced AI workflows where the assistant can reason across multiple parts of the application instead of treating every generation as an isolated request.

For example, the AI could eventually consider:

- Existing saved content
- Upcoming calendar entries
- Previous ideas
- Creator preferences
- Current content distribution

before generating new recommendations.

---

### 🔧 Tool-Based AI Actions

Explore tool-based and agentic AI architectures that allow the AI to interact with application functionality.

Potential tools could include:

```text
getSavedContent()
getCalendar()
findContentGaps()
generateIdeas()
generateScript()
getUserPreferences()
```

This could allow an AI assistant to perform more useful multi-step workflows instead of only generating text.

Technologies such as **LangGraph** and modern tool-calling patterns may be explored as the AI architecture evolves.

---

### 💡 Proactive Content Suggestions

A future version could proactively identify opportunities in a user's content plan.

For example:

> "You don't have any content planned for Thursday."

or:

> "Most of your planned posts this week are educational. Would you like some engagement-focused ideas?"

Instead of waiting for the user to manually request every action, the application could use existing context to provide useful suggestions at the right time.

---

### 🎯 Better Personalization

Future AI generation could become increasingly personalized based on the user's:

- Niche
- Audience
- Writing style
- Preferred content formats
- Platform strategy
- Previous generations

The goal is for the AI to gradually behave more like a personalized content assistant rather than a generic text generator.

---

### 📈 Content Insights

Expand the dashboard and analytics capabilities to provide better visibility into:

- Content distribution across platforms
- Posting consistency
- Planned vs completed content
- Content categories
- Calendar gaps
- Creator activity

---

## 🎯 Why I Built This

I wanted to build something beyond a basic AI chatbot or simple API demonstration.

AI Content Calendar explores how AI can become part of a broader product workflow:

```text
Idea
  ↓
Creation
  ↓
Organization
  ↓
Planning
```

The project combines several areas of full-stack development:

- Frontend development
- Backend and database integration
- Authentication
- Multi-user data handling
- AI / LLM integration
- Application architecture
- Deployment
- Product-focused UI development

As the project develops, I plan to explore more advanced AI concepts including persistent context, tool-based AI workflows, and agentic systems.

---

## 💻 Getting Started

### Prerequisites

Before running the project locally, make sure you have:

- Node.js installed
- npm installed
- A Supabase project
- A Groq API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/SankalpJadhav28/Ai-Content-Calendar.git
```

### 2. Navigate to the Project

```bash
cd Ai-Content-Calendar
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root.

Add the environment variables required by your Supabase and Groq configuration.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

> Check the source code for the exact environment variable names required by the current implementation.

Never commit your `.env.local` file or expose API keys publicly.

### 5. Start the Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🌐 Deployment

The application is deployed using **Vercel**.

### Live Application

https://ai-content-calendar-seven.vercel.app/

The deployed version may change frequently as new features and improvements are added.

---

## 📚 What I'm Learning Through This Project

Building AI Content Calendar has given me hands-on experience with:

- Building a full-stack application using Next.js
- Working with TypeScript
- Integrating the Groq API and LLMs into a real application
- Designing AI-assisted product workflows
- Implementing authentication
- Building multi-user application functionality
- Working with Supabase
- Managing user-specific application data
- Building content planning workflows
- Deploying and maintaining a live application with Vercel
- Managing development through Git and GitHub
- Iteratively improving a product from an initial idea

The project is also serving as a foundation for exploring more advanced topics such as AI memory, tool calling, context-aware AI systems, and agentic workflows.

---

## ⚠️ Current Limitations

Since the project is still under active development:

- Some functionality may still be refined or changed
- UI and UX improvements are ongoing
- AI memory is not yet fully implemented
- Advanced agentic workflows are currently part of the future roadmap
- Additional testing and optimization are still planned

These areas will continue to improve as development progresses.

---

## 🤝 Feedback & Contributions

Feedback and suggestions are welcome.

If you find a bug or have an idea that could improve the project, feel free to open an issue in the repository.

---

## 👨‍💻 Author

**Sankalp Jadhav**

GitHub: https://github.com/SankalpJadhav28

---

## ⭐ Support

If you find the project interesting, consider giving the repository a star.

It helps support the project as development continues.
