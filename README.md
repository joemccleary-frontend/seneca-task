## Seneca Toggle Switch Tech Task

This is the repo for my solution to the front end technical task for Seneca.

The component tests the user's knowledge of a topic, by having them move a series of toggles into the correct positions:

The project can be accessed here:
[url]

### Project requirements

- The solution for that question locks once all correct answers have been selected. The toggles animate between states and the background colour changes depending on how many correct answers there are.
- The component works well on phones and is responsive down to 320px wide.
- Built using NextJS, which is React, Typescript, and Tailwind for the styling. I thought tailwind would be advantageous for rapid prototyping of the layout.
- The content of the question can easily be changed in the api route. - Tried to make it as reuseable as I could.
- The order of the questions & answer are randomised
- The solution accommodates answers with both two and three toggle positions in the answers.
- Next question is rendered in when the previous one is complete, making it easy to switch between the active question

### Assumptions

- Moved the question data into an api call to simulate fetching it from a database
- One assumption I made is that there is always 1 correct answer from the default positions. If there was always 0 then the user would eventually realise and just swap them all. The ideal solution would probably be to randomize it so that 0-2 are correct. I've not had time to implement that, but it's definietly something I would look at next.

### Limitiations/Features I would add next (if I had more time)

- Randomize number of default correct answers
- 3 answer vertical options, ran out of time to properly implement this the core funcitonality is there but there were some bugs so I've just made the questions shorter for now.
- Once I'd finished I realised I probably could just have one component that works for 2 or 3 rather than making them seperate components as the logic is largely the same. But I don't think I'd rewrite it into the same component for ease of readability.

## Running the project

If you wish to run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
