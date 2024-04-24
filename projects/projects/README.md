# Calc

CLIENT
- uuid
- projects[]
- people[] (person)

PERSON
- uuid
- name

PROJECT
- uuid
- domain: string
- contract: int
- endpoints[]
- unique: float
- yearly: float

ENDPOINT
- uuid
- url: string
- hours: int
