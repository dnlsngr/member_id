Thanks in advance for evaluating my submission. To start, I put this together in Node rather than Python for expediency: I've worked in production Node environments, and although I do have a few years aggregate experience in Django applications, I'm less confident in my ability to demonstrate basic code hygiene in that ecosystem.

To that end, I tried to demonstrate some good practices that are a bit overengineered for the complexity of this problem.

For the validatable id, I chose something that is pretty transparent, and provided error messages that were very clear about the validation method. It wasn't clear whether this was intended to be an external-facing feature, or an internal tool that CS or operational folks might use.

Here is a list of things I might do with more time:

- Choose a more opaque id, where it would be less obvious how the validation was embedded into the id. If that's not important, I might at least choose a methodology that generates shorter IDs, such as a shorter checksum (collisions in the checksum aren't really a concern here).
- Build out unit tests. Test coverage reflects the level of testing I used to get this project off the ground. I prefer end-to-end tests as a coding tool, as they better reflect the ultimate behavior in the application, which is why the e2e tests are used everywhere except to test internal logic. For a application built by more developers, we'd probably want more robust unit tests as well.
