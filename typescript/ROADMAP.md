Ian's roadmap to making things in this API better:

In the event a user needs to make repeated calls where various items need to be validated, I would have loved to add a token generator that runs once on the first call and is valid for a pre-determined amount of time, allowing for repeated calls with only one validation, rather than adding additional validation calls to every call the user makes.

I realize some items, like an account routing number, would likely need to be validated each time, but an action like creating an account is likely not going to be repeated often, whereas other calls might.

Additionally, the introduction of an ORM would be good for database queries as they make things easier to read and execute.
