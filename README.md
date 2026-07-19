# ClarifAI – AI-Powered Question Simplifier

![Status](https://img.shields.io/badge/Status-Completed-success)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-blue)
![Built With](https://img.shields.io/badge/Built%20With-Google%20AI%20Studio-orange)
![Design](https://img.shields.io/badge/Designed%20With-Google%20Stitch-purple)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

An AI-powered educational web application that helps students understand difficult academic questions before attempting to solve them.

---

# 📚 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Target Users](#-target-users)
- [Features](#-features)
- [Application Workflow](#-application-workflow)
- [System Architecture](#-system-architecture)
- [AI Feature](#-ai-feature)
- [AI System Prompt](#-ai-system-prompt)
- [Tech Stack](#-tech-stack)
- [Application Screens](#-application-screens)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Future Improvements](#-future-improvements)
- [Learning Outcomes](#-learning-outcomes)
- [Developer](#-developer)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

# 📖 Overview

ClarifAI is an AI-powered educational web application designed to help students better understand difficult study questions before attempting to solve them.

Many students struggle not because they lack knowledge, but because they have difficulty understanding what a question is actually asking.

ClarifAI addresses this problem by using **Google Gemini** to simplify complex academic questions into clear, easy-to-understand language while providing:

- ✅ A simplified version of the question
- ✅ A concise explanation
- ✅ Key concepts involved
- ✅ A helpful learning hint

Instead of immediately providing the complete solution, the application encourages conceptual understanding and independent learning.

---

# 🚀 Live Demo

### 🌐 Application

👉 **https://clarifai.ai.studio**

### 💻 GitHub Repository

👉 **YOUR_GITHUB_REPOSITORY_URL**

---

# ❓ Problem Statement

Students frequently encounter questions in assignments, quizzes, textbooks, and examinations that contain difficult wording, technical terminology, or complex sentence structures.

This often leads to confusion before they even begin solving the problem.

Rather than immediately searching for complete solutions online, students first need help understanding what the question actually means.

ClarifAI solves this problem by transforming difficult questions into simple language while preserving their original meaning.

---

# 💡 Solution

ClarifAI uses **Google Gemini AI** to analyze a student's question and generate four educational outputs:

- Simplified Question
- Explanation
- Key Concepts
- Helpful Hint

This approach promotes learning and comprehension instead of answer memorization.

---

# 🎯 Target Users

ClarifAI is designed for:

- School students
- College students
- University students
- Self-learners
- Anyone who wants to better understand academic questions before solving them

---

# ✨ Features

- 🤖 AI-powered question simplification
- 📖 Converts difficult questions into simple language
- 📝 Provides a concise explanation
- 🎯 Identifies key concepts involved
- 💡 Generates one helpful learning hint
- 📱 Clean and responsive mobile-first interface
- 🧭 Bottom navigation for simple navigation
- 📋 Copy response functionality
- 🔄 Simplify another question with one click
- ⚡ Fast AI response generation
- 📱 Responsive design for multiple screen sizes

---

# 🔄 Application Workflow

```text
User
   │
   ▼
Enter Study Question
   │
   ▼
Click "Simplify Question"
   │
   ▼
Google Gemini AI
   │
   ▼
Process Prompt
   │
   ▼
Generate Response
   │
   ▼
Display:
• Simplified Question
• Explanation
• Key Concepts
• Helpful Hint
```

---

# 🏗️ System Architecture

```text
                 ┌────────────────────┐
                 │      Student       │
                 └─────────┬──────────┘
                           │
                           ▼
              Enter Academic Question
                           │
                           ▼
            ┌──────────────────────────┐
            │     ClarifAI Frontend    │
            │  (Google AI Studio App)  │
            └──────────┬───────────────┘
                       │
                       ▼
          Prompt Construction & Validation
                       │
                       ▼
              Google Gemini AI Model
                       │
                       ▼
         AI Generates Structured Response
                       │
      ┌────────────────┼────────────────┐
      ▼                ▼                ▼
 Simplified      Explanation      Key Concepts
  Question                              │
                                        ▼
                                Helpful Hint
                       │
                       ▼
           Display Results to the User
```

---

# 🤖 AI Feature

The core functionality of ClarifAI is powered by **Google Gemini AI**.

Instead of generating complete answers, the model is instructed to act as an educational assistant whose purpose is to improve understanding.

For every submitted question, the AI generates four structured outputs:

1. Simplified Question
2. Explanation
3. Key Concepts
4. Helpful Hint

This ensures responses remain concise, educational, and focused on comprehension.

---

# 🧠 AI System Prompt

```text
You are an educational assistant.

Your task is NOT to solve the student's question directly.

Given a study question, return ONLY the following four sections:

1. Simplified Question
Rewrite the question in simple, easy-to-understand language.
Keep it under 25 words.

2. Explanation
Briefly explain what the question is asking.
Maximum 50 words.

3. Key Concepts
List exactly 3–4 short bullet points.

4. Helpful Hint
Provide one short hint that helps the student think about the solution.
Do not reveal the final answer.

Rules:
• Be concise.
• Do not answer the question directly.
• Keep the entire response under approximately 150 words.
• Return only the required output format.
```

---

# 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **UI Design** | Google Stitch |
| **Development** | Google AI Studio |
| **AI Model** | Google Gemini |
| **Programming** | AI-Assisted (Vibe Coding) |
| **Version Control** | Git & GitHub |
| **Deployment** | Vercel |

---

# 📱 Application Screens

The application consists of four primary screens.

## 🏠 Home

Introduces the application and explains its purpose.

**Screenshot**

```
screenshots/home.png
```

---

## ✍️ Simplify Question

Allows users to enter an academic question and submit it for AI processing.

**Screenshot**

```
screenshots/simplify.png
```

---

## 📄 Results

Displays:

- Simplified Question
- Explanation
- Key Concepts
- Helpful Hint

Also provides:

- Copy Response
- Simplify Another Question

**Screenshot**

```
screenshots/results.png
```

---

## ℹ️ About

Provides information about:

- Application
- Developer
- Project Details

**Screenshot**

```
screenshots/about.png
```

---

# 📁 Project Structure

```text
ClarifAI
│
├── src/
├── components/
├── pages/
├── assets/
├── public/
├── README.md
└── package.json
```

> **Note:** The project structure may vary slightly depending on the exported Google AI Studio project.

---

# ⚙️ Installation

## Prerequisites

- Node.js
- npm

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate into the Project

```bash
cd ClarifAI
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file and add your Gemini API key:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

### 5. Start the Development Server

```bash
npm run dev
```

---

# 🚀 Future Improvements

Potential future enhancements include:

- 🌍 Multi-language support
- 🎤 Voice input
- 📚 Save previous questions
- 🌙 Dark mode
- 📝 Study history
- 📄 PDF question extraction
- 📷 OCR/Image-to-text question recognition
- 🎯 Personalized learning suggestions

---

# 🎓 Learning Outcomes

This project demonstrates:

- AI-powered application development
- Prompt engineering
- User-centered design
- Mobile-first interface design
- AI-assisted software development
- GitHub version control
- Web application deployment

---

# 👨‍💻 Developer

**Muhammad Ali Waris Khan**

Final Project for the **AI Application Development Course**

---

# 📄 License

This project was developed for educational purposes as part of an AI Application Development course.

---

# 🙏 Acknowledgements

Special thanks to:

- **Google Stitch** for interface design
- **Google AI Studio** for AI-assisted application development
- **Google Gemini** for powering the intelligent question simplification feature
- **GitHub** for version control and source code hosting
- **Vercel** for application deployment

---

## ⭐ If you found this project useful, consider giving it a star on GitHub!