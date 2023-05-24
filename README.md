# Instructions

Application can be viewed at http://159.89.99.6:3000/member_id/validate
Try it out with the ID: 7c8c1cdf-d96e-473c-aa98-ad4a67edb51e_3a6048a15b8c6f166f10bef7357883c07f24ad6a

Install application locally with `npm install` and run with `npm run`

Tests can be run locally using the command `npm run test`

Run application using docker with `docker-compose up --build` (not recommended for development)

# Notes

Thanks in advance for evaluating my submission. To start, I put this together in Node rather than Python for expediency: I've worked in production Node environments, and although I do have a few years aggregate experience in Django applications, I'm less confident in my ability to demonstrate basic code hygiene in that ecosystem. To that end, I included a few things that I think are table-stakes for a Node application that might live in production:

- End-to-end tests against an API
- Types via Typescript, including types for API-level object definitions
- A bit of basic code organization

For the validatable id, I chose something that is pretty transparent, and provided error messages that were very clear about the validation method. It wasn't clear whether this was intended to be an external-facing feature, or an internal tool that CS or operational folks might use. It would be great to workshop requirements like this with the team.

Here is a list of things I might do with more time:

- Choose a more opaque id, where it would be less obvious how the validation was embedded into the id. If that's not important, I might at least choose a methodology that generates shorter IDs, such as a shorter checksum (collisions in the checksum aren't really a concern here).
- Build out unit tests. Test coverage reflects the level of testing I used to get this project off the ground. I prefer end-to-end tests as a coding tool, as they better reflect the ultimate behavior in the application, which is why the e2e tests are used everywhere except to test internal logic. For a application built by more developers, we'd probably want more robust unit tests as well.
- Spend more time on the Docker setup. This was the fastest possible Dockerfile generation, not utilizing any special permissions or build optimizations. This setup would also be aggressively useless in development without hot reloading set up.
- Leverage better service management in production. To start with, we need to implement TLS (probably via certbot), an nginx layer, and something like gunicorn (or if we're going hard on the Docker deployment strategy, a more robust docker compose file).
- Redis cacheing
