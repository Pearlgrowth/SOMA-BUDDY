import express from "express";
import { greet } from "@repo/utils";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Sample learning content for Kenyan curriculum
const learningContent = [
  {
    id: 1,
    title: "Kiswahili Basics",
    content: "Hujambo! Let's learn basic Kiswahili greetings.",
    difficulty: "beginner",
    subject: "language"
  },
  {
    id: 2,
    title: "Simple Math",
    content: "Let's practice addition: 2 + 3 = ?",
    difficulty: "beginner",
    subject: "math"
  },
  {
    id: 3,
    title: "Kenya Geography",
    content: "Kenya has 47 counties. Can you name the capital city?",
    difficulty: "intermediate",
    subject: "geography"
  }
];

const quizzes = [
  {
    id: 1,
    question: "What is 5 + 3?",
    options: ["6", "7", "8", "9"],
    correct: 2,
    subject: "math"
  },
  {
    id: 2,
    question: "What is the capital of Kenya?",
    options: ["Mombasa", "Nairobi", "Kisumu", "Nakuru"],
    correct: 1,
    subject: "geography"
  },
  {
    id: 3,
    question: "How do you say 'hello' in Kiswahili?",
    options: ["Asante", "Hujambo", "Kwaheri", "Karibu"],
    correct: 1,
    subject: "language"
  }
];

// Routes
app.get("/", (req, res) => {
  res.send(greet("Welcome to SomaBuddy API - Your dyslexia-friendly learning partner"));
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", message: "SomaBuddy server is running" });
});

// Learning partner endpoints
app.get("/api/learning/content", (req, res) => {
  const { subject, difficulty } = req.query;
  
  let filteredContent = learningContent;
  
  if (subject) {
    filteredContent = filteredContent.filter(item => item.subject === subject);
  }
  
  if (difficulty) {
    filteredContent = filteredContent.filter(item => item.difficulty === difficulty);
  }
  
  res.json({
    success: true,
    content: filteredContent,
    total: filteredContent.length
  });
});

app.get("/api/learning/content/:id", (req, res) => {
  const contentId = parseInt(req.params.id);
  const content = learningContent.find(item => item.id === contentId);
  
  if (!content) {
    return res.status(404).json({ error: "Content not found" });
  }
  
  res.json({
    success: true,
    content: content
  });
});

// Quiz endpoints
app.get("/api/quiz", (req, res) => {
  const { subject } = req.query;
  
  let filteredQuizzes = quizzes;
  
  if (subject) {
    filteredQuizzes = filteredQuizzes.filter(quiz => quiz.subject === subject);
  }
  
  // Remove correct answers from response
  const quizzesForClient = filteredQuizzes.map(quiz => ({
    id: quiz.id,
    question: quiz.question,
    options: quiz.options,
    subject: quiz.subject
  }));
  
  res.json({
    success: true,
    quizzes: quizzesForClient,
    total: quizzesForClient.length
  });
});

app.post("/api/quiz/:id/answer", (req, res) => {
  const quizId = parseInt(req.params.id);
  const { answer } = req.body;
  
  const quiz = quizzes.find(q => q.id === quizId);
  
  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }
  
  if (answer === undefined || answer === null) {
    return res.status(400).json({ error: "Answer is required" });
  }
  
  const isCorrect = answer === quiz.correct;
  
  res.json({
    success: true,
    correct: isCorrect,
    correctAnswer: quiz.correct,
    explanation: isCorrect ? "Great job! 🎉" : `The correct answer is: ${quiz.options[quiz.correct]}`
  });
});

// Learning partner chat endpoint (simple responses for now)
app.post("/api/learning/chat", (req, res) => {
  const { message, subject } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  
  // Simple responses based on keywords
  let response = "I'm here to help you learn! What would you like to know?";
  
  if (message.toLowerCase().includes("math")) {
    response = "Math can be fun! Let's start with simple addition and subtraction. Would you like to try a quiz?";
  } else if (message.toLowerCase().includes("kiswahili") || message.toLowerCase().includes("swahili")) {
    response = "Kiswahili ni lugha nzuri! (Kiswahili is a beautiful language!) Let's practice some basic words.";
  } else if (message.toLowerCase().includes("geography") || message.toLowerCase().includes("kenya")) {
    response = "Kenya is a beautiful country with 47 counties! Let's explore Kenyan geography together.";
  } else if (message.toLowerCase().includes("help")) {
    response = "I'm your learning buddy! I can help with math, Kiswahili, geography, and more. Just ask me anything!";
  }
  
  res.json({
    success: true,
    response: response,
    supportive: true
  });
});

app.listen(port, () => {
  console.log(`🎯 SomaBuddy server running at http://localhost:${port}`);
  console.log(`📚 Learning content: GET /api/learning/content`);
  console.log(`🧠 Quizzes: GET /api/quiz`);
  console.log(`💬 Learning chat: POST /api/learning/chat`);
});