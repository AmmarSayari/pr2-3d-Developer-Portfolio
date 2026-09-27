# Ballot project

- Added Ballot to Projects as two separate cards: live phone demos and local Python match controller, each with its own technology stack.
- Saved two screenshots of the locally running card editors in `src/assets/projects/ballot/phone-demos/`. Added a clearly labeled workflow illustration for the controller because its old Python environment cannot currently launch.
- Reused the existing project-card design and added optional short part summaries. No Ballot source files were changed.
- Checked the live demo and local build: the live page loads but reports its hosted ONNX model missing; the local demo reports the model ready. Python San/Hokm scoring ran in a read-only smoke test, but camera inference and the Streamlit interface were not verified.
