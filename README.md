# Quiz

Replace this readme with your own information about the project. You can include things like:

The assignment was to create a Typeform-like survey or quiz with at least 3 questions. When the user presses submit, they should see a summary of their answers.

I decided to make a Brand style quiz, which I can use for my own website, as a graphic and web designer it is a great way to learn more about the clients preferences. I first tested Typeform to see how I wanted the quiz to look like. I kept the design clean and simple. I made upp some questions taking inspiration from other quizes and created some color palettes and font examples in Illustrator. Then I started adding these questions to App.jsx using three different types: drop down, radio and image select. 

The next step was to create the quiz, here I looked for help online. I used useState to set the name, answers and to see if the quiz started or ended. I added a image grid to make the images visible and clickable. I added a resetQuiz button to start again. Then I added a progress bar and I button to go back one question. I used: const [step, setStep] = useState(0); to keeps track of which question the user is on and setTimeout(() => setStep(step + 1), 300); to make it look like the quiz moves from "page to page". 

If you had more time, what would be next? I would like to add more questions and images. I would like cleaner code but struggled with this. 


## View it live
https://brand-style-quiz.netlify.app/


## Getting Started with the Project

### Dependency Installation & Startup Development Server

Once cloned, navigate to the project's root directory and this project uses npm (Node Package Manager) to manage its dependencies.

The command below is a combination of installing dependencies, opening up the project on VS Code and it will run a development server on your terminal.

```bash
npm i && code . && npm run dev
```
